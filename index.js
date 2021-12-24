const sanitizeGeneralSettingConfigs = (params, siteConstantsConfig) => {
  const previousFields = [];
  const changedFields = [];
  const generalSettingConfigs = [];

  const offlineModemDelCycleParamsCheck = (paramsSetting, settingName) => {
    const offLineModemCycleDays = [3, 7, 10, 14];
    paramsSetting = Number(paramsSetting);
    if (!offLineModemCycleDays.includes(paramsSetting)) {
      throw new Error(`ERR_INVALID_${settingName}`);
    }
  };

  const historyDeleteCycleParamsCheck = (paramsSetting, settingName) => {
    const historicalDeleteCycleDays = [
      7, 14, 21, 28, 35, 42, 49, 56, 63, 70, 77, 84, 91, 98, 105,
    ];
    paramsSetting = Number(paramsSetting);
    if (!historicalDeleteCycleDays.includes(paramsSetting)) {
      throw new Error(`ERR_INVALID_${settingName}`);
    }
  };

  const loginAttamptParamsCheck = (paramsSetting, settingName) => {
    paramsSetting = Number(paramsSetting);
    if (isNaN(paramsSetting)) throw new Error(`ERR_INVALID_${settingName}`);
  };

  const disableNotificationValParamsCheck = (paramsSetting, settingName) => {
    paramsSetting = Number(paramsSetting);
    if (isNaN(paramsSetting) || !(paramsSetting === 1 || paramsSetting === 0))
      throw new Error(`ERR_INVALID_${settingName}`);
  };

  const maxBirthCertificateParamsCheck = (paramsSetting, settingName) => {
    paramsSetting = Number(paramsSetting);
    if (isNaN(paramsSetting) || !(paramsSetting >= 1 && paramsSetting <= 50))
      throw new Error(`ERR_INVALID_${settingName}`);
  };

  const vTDRSensitivityParamsCheck = (paramsSetting, settingName) => {
    paramsSetting = Number(paramsSetting);
    if (isNaN(paramsSetting) || !(paramsSetting >= -40 && paramsSetting <= -15))
      throw new Error(`ERR_INVALID_${settingName}`);
  };

  const maxUsrxpwrParamsCheck = (paramsSetting, settingName) => {
    paramsSetting = Number(paramsSetting);
    if (
      isNaN(paramsSetting) ||
      !(paramsSetting >= -1000 && paramsSetting <= 1000)
    )
      throw new Error(`ERR_INVALID_${settingName}`);
  };

  const lengthUnitParamsCheck = (paramsSetting, settingName) => {
    paramsSetting = Number(paramsSetting);

    if (
      isNaN(paramsSetting) ||
      !(paramsSetting === 1 || paramsSetting === 3.28)
    ) {
      throw new Error(`ERR_INVALID_${settingName}`);
    }
  };

  const modemFixesRadiusCheck = (paramsSetting, settingName) => {
    const validModemFixRadius = [10, 50, 100, 500, 1000];
    paramsSetting = Number(paramsSetting);
    if (isNaN(paramsSetting) || !validModemFixRadius.includes(paramsSetting))
      throw new Error(`ERR_INVALID_${settingName}`);
  };

  const correlationFixesRadiusCheck = (paramsSetting, settingName) => {
    const validCorrFixRadius = [50, 100, 500, 1000, 2000, 5000];
    paramsSetting = Number(paramsSetting);
    if (isNaN(paramsSetting) || !validCorrFixRadius.includes(paramsSetting))
      throw new Error(`ERR_INVALID_${settingName}`);
  };

  const pnmMaxCmtsCpuUtilizationCheck = (paramsSetting, settingName) => {
    paramsSetting = Number(paramsSetting);
    if (isNaN(paramsSetting) || !(paramsSetting < 100 && paramsSetting > 1))
      throw new Error(`ERR_INVALID_${settingName}`);
  };

  const pnmRepollWaitTimeCheck = (paramsSetting, settingName) => {
    paramsSetting = Number(paramsSetting);
    if (isNaN(paramsSetting) || !(paramsSetting < 1320 && paramsSetting > 1))
      throw new Error(`ERR_INVALID_${settingName}`);
  };

  [
    "OFFLINE_MODEM_DELETE_CYCLE",
    "HISTORY_DELETE_CYCLE",
    "MAX_THRESHOLD",
    "MIN_THRESHOLD",
    "LOGIN_ATTEMPT",
    "GOOD_PORT_HEALTH_SCORE",
    "DISABLE_NOTIFICATION_VAL",
    "SHOW_HIDE_REGISTER_VAL",
    "LENGTH_UNIT",
    "CORR_RADIUS",
    "TOLLERENCE",
    "MAX_BIRTH_CERTIFICATE",
    "MAX_usrxpwr",
    "MIN_usrxpwr",
    "vTDR_SENSITIVITY",
    "MODEM_FIXES_RADIUS",
    "CORRELATION_FIXES_RADIUS",
    "CMTR_CORR",
    "NMTR_CORR",
    "ENABLE_AUTO_GEOCODE",
    "PNM_MAX_CMTS_CPU_UTILIZATION",
    "PNM_REPOLL_WAIT_TIME",
  ].forEach((settingName) => {
    if (
      params[settingName] !== null &&
      typeof params[settingName] !== "undefined"
    ) {
      switch (settingName) {
        case "OFFLINE_MODEM_DELETE_CYCLE": {
          offlineModemDelCycleParamsCheck(params[settingName], settingName);
          break;
        }

        case "HISTORY_DELETE_CYCLE": {
          historyDeleteCycleParamsCheck(params[settingName], settingName);
          break;
        }

        case "MAX_THRESHOLD":
        case "MIN_THRESHOLD":
        case "LOGIN_ATTEMPT":
        case "GOOD_PORT_HEALTH_SCORE":
        case "CORR_RADIUS":
        case "TOLLERENCE":
        case "CMTR_CORR":
        case "NMTR_CORR": {
          loginAttamptParamsCheck(params[settingName], settingName);
          break;
        }
        case "DISABLE_NOTIFICATION_VAL":
        case "SHOW_HIDE_REGISTER_VAL":
        case "ENABLE_AUTO_GEOCODE": {
          disableNotificationValParamsCheck(params[settingName], settingName);
          break;
        }

        case "MAX_BIRTH_CERTIFICATE": {
          maxBirthCertificateParamsCheck(params[settingName], settingName);
          break;
        }

        case "vTDR_SENSITIVITY": {
          vTDRSensitivityParamsCheck(params[settingName], settingName);

          break;
        }
        case "MAX_usrxpwr":
        case "MIN_usrxpwr": {
          maxUsrxpwrParamsCheck(params[settingName], settingName);
          break;
        }
        case "LENGTH_UNIT": {
          lengthUnitParamsCheck(params[settingName], settingName);
          break;
        }
        case "MODEM_FIXES_RADIUS": {
          modemFixesRadiusCheck(params[settingName], settingName);
          break;
        }
        case "CORRELATION_FIXES_RADIUS": {
          correlationFixesRadiusCheck(params[settingName], settingName);
          break;
        }
        case "PNM_MAX_CMTS_CPU_UTILIZATION": {
          pnmMaxCmtsCpuUtilizationCheck(params[settingName], settingName);
          break;
        }
        case "PNM_REPOLL_WAIT_TIME": {
          pnmRepollWaitTimeCheck(params[settingName], settingName);
          break;
        }
      }
      if (Number(siteConstantsConfig[settingName]) !== params[settingName]) {
        changedFields.push({ [settingName]: params[settingName] });
        previousFields.push({
          [settingName]: siteConstantsConfig[settingName],
        });

        generalSettingConfigs.push({
          constant_name: settingName,
          constant_value: params[settingName],
          status: true,
        });
      }
    }
  });

  return [generalSettingConfigs, previousFields, changedFields];
};
