
UsersHelper.createUserWidgetSettingResponse = async (userData) => {
  const resultData = {};
  let modules = await Helpers.cacheHelper.get('MODULES');
  if (Util.commonUtils.isEmpty(modules)) {
    await Models.rdbms.Module.loadModules();
    modules = await Helpers.cacheHelper.get('MODULES');
  }
  modules = JSON.parse(modules);

  resultData.widget_sequence = userData.UserSetting.widget_sequence;
  if (Util.commonUtils.isEmpty(resultData.widget_sequence)) {
    resultData.widget_sequence = await Models.rdbms.UserSetting.getDefaultWidgetSequenceSetting();
  }

  resultData.user_widget_preference = userData.UserSetting.user_widget_preference;
  if (Util.commonUtils.isEmpty(resultData.user_widget_preference)) {
    resultData.user_widget_preference = await Models.rdbms.UserSetting.getDefaultUserWidgetPreferenceSetting();
  }
  const widgets = await UsersRepository.getWidgets();
  const [leftPanelActive, leftPanelInactive, rightPanelActive, rightPanelInactive ] =  UsersHelper.isPanelActiveOrNot(widgets);
  resultData.widget_sequence.right_panel = resultData.widget_sequence.right_panel.split(',');

  //Removing all the inactive right Panel widget data from final response
  rightPanelInactive.forEach(widgetName => {
    delete resultData.user_widget_preference[widgetName];
    const indexOf = resultData.widget_sequence.right_panel.indexOf(widgetName);
    if (indexOf >= 0) {
      resultData.widget_sequence.right_panel.splice(indexOf, 1);
    }
  });
  resultData.widget_sequence.right_panel = resultData.widget_sequence.right_panel.toString();

  //Removing all the inactive left Panel widget data from final response
  resultData.widget_sequence.left_panel = resultData.widget_sequence.left_panel.split(',');
  leftPanelInactive.forEach(widgetName => {
    const indexOf = resultData.widget_sequence.left_panel.indexOf(widgetName);
    if (indexOf >= 0) {
      resultData.widget_sequence.left_panel.splice(indexOf, 1);
    }
  });
  resultData.widget_sequence.left_panel =  resultData.widget_sequence.left_panel.toString();

  rightPanelActive.forEach(widgetName => {
    /* If any widget is newly added widget, by default show that
    widget to every user until they update the settings for that widget */
    if (!(widgetName in resultData.user_widget_preference)) {
      /* For every new widget added in future, will need to add setting here
      for existing users */

      if(['left_panel', 'search', 'fbc_correlation_list', 'rxmer_correlation_list'].includes(widgetName)){
        resultData.user_widget_preference[widgetName] = { is_visible: true };
        if (['fbc_correlation_list', 'rxmer_correlation_list'].includes(widgetName)) {
          resultData.widget_sequence.right_panel = resultData.widget_sequence.right_panel + ',' + widgetName;
        }
      } else {
        resultData.user_widget_preference[widgetName] = { is_visible: false };
      }
    } else {
      if(
        resultData.user_widget_preference[widgetName].is_visible
        &&
        !(resultData.widget_sequence.right_panel.includes(widgetName))
      ) {
        if(!['left_panel', 'search'].includes(widgetName)){
          resultData.user_widget_preference[widgetName].is_visible = false;
        }
      }
    }

  });

  leftPanelActive.forEach(widgetName => {
    if (!(resultData.widget_sequence.left_panel.includes(widgetName))) {
      resultData.widget_sequence.left_panel = resultData.widget_sequence.left_panel + ',' + widgetName;
    }
  });
  resultData.widget_sequence.right_panel = resultData.widget_sequence.right_panel.split(',');
  const mapModuleWid = UsersHelper.mapModuleWidget();
  for (const widgetName in resultData.user_widget_preference) {
    if (Object.hasOwnProperty.call(resultData.user_widget_preference, widgetName)) {
      if (!mapModuleWid.filter(widgetNameFilter => widgetNameFilter.widget === widgetName).map(hasWidgetNameModule => hasWidgetNameModule.module).every(widgetNameMatch => modules.find(mod => mod.name === widgetNameMatch))) {
        delete resultData.user_widget_preference[widgetName];
        const indexOf = resultData.widget_sequence.right_panel.indexOf(widgetName);
        resultData.widget_sequence.right_panel.splice(indexOf, 1);
      }
    }
  }
  resultData.widget_sequence.right_panel = resultData.widget_sequence.right_panel.toString();
  return resultData;
};

UsersHelper.isPanelActiveOrNot = (widgets) => {
  const leftPanelActive = [];
  const leftPanelInactive = [];
  const rightPanelActive = [];
  const rightPanelInactive = [];
  widgets.forEach(widget => {
    if(widget.is_active) {
      if (widget.is_card) {
        leftPanelActive.push(widget.name);
      } else {
        rightPanelActive.push(widget.name);
      }
    } else {
      if (widget.is_card) {
        leftPanelInactive.push(widget.name);
      } else {
        rightPanelInactive.push(widget.name);
      }
    }
  });
return [leftPanelActive, leftPanelInactive, rightPanelActive, rightPanelInactive];
};