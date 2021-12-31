UsersHelper.rightPanelActiveResult = (rightPanelActive, resultData) => {
  let resultDataP = resultData;
  
  rightPanelActive.forEach(widgetName => {
    /* If any widget is newly added widget, by default show that
    widget to every user until they update the settings for that widget */
    if (!(widgetName in resultDataP.user_widget_preference)) {
      /* For every new widget added in future, will need to add setting here
      for existing users */

      if(['left_panel', 'search', 'fbc_correlation_list', 'rxmer_correlation_list'].includes(widgetName)){
        resultDataP.user_widget_preference[widgetName] = { is_visible: true };
        if (['fbc_correlation_list', 'rxmer_correlation_list'].includes(widgetName)) {
          resultDataP.widget_sequence.right_panel = resultDataP.widget_sequence.right_panel + ',' + widgetName;
        }
      } else {
        resultDataP.user_widget_preference[widgetName] = { is_visible: false };
      }
    } else {
      if(
        resultDataP.user_widget_preference[widgetName].is_visible
        &&
        !(resultDataP.widget_sequence.right_panel.includes(widgetName))
      ) {
        if(!['left_panel', 'search'].includes(widgetName)){
          resultDataP.user_widget_preference[widgetName].is_visible = false;
        }
      }
    }

  });
};