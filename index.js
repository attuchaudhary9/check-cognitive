const sanitizeGeneralSettingConfigs = (params, siteConstantsConfig) => {
  const previousFields = [];
  const changedFields = [];
  const generalSettingConfigs = [];
  const isValidParamsSettings = (params, settingName) => {
    params = Number(params);
    console.log("PARAMS", params);
    if (isNaN(params)) throw new Error(`ERR_INVALID_${settingName}`);
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
          const offLineModemCycleDays = [3, 7, 10, 14];
          params[settingName] = Number(params[settingName]);
          if (!offLineModemCycleDays.includes(params[settingName])) {
            throw new Error(`ERR_INVALID_${settingName}`);
          }
          break;
        }

        case "HISTORY_DELETE_CYCLE": {
          const historicalDeleteCycleDays = [
            7, 14, 21, 28, 35, 42, 49, 56, 63, 70, 77, 84, 91, 98, 105,
          ];
          params[settingName] = Number(params[settingName]);
          if (!historicalDeleteCycleDays.includes(params[settingName])) {
            throw new Error(`ERR_INVALID_${settingName}`);
          }
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
          isValidParamsSettings(params[settingName], settingName);
          break;
        }
        case "DISABLE_NOTIFICATION_VAL":
        case "SHOW_HIDE_REGISTER_VAL":
        case "ENABLE_AUTO_GEOCODE": {
          params[settingName] = Number(params[settingName]);
          if (
            isNaN(params[settingName]) ||
            !(params[settingName] === 1 || params[settingName] === 0)
          )
            throw new Error(`ERR_INVALID_${settingName}`);
          break;
        }

        case "MAX_BIRTH_CERTIFICATE": {
          params[settingName] = Number(params[settingName]);
          if (
            isNaN(params[settingName]) ||
            !(params[settingName] >= 1 && params[settingName] <= 50)
          )
            throw new Error(`ERR_INVALID_${settingName}`);
          break;
        }

        case "vTDR_SENSITIVITY": {
          params[settingName] = Number(params[settingName]);
          if (
            isNaN(params[settingName]) ||
            !(params[settingName] >= -40 && params[settingName] <= -15)
          )
            throw new Error(`ERR_INVALID_${settingName}`);

          break;
        }
        case "MAX_usrxpwr": {
          params[settingName] = Number(params[settingName]);
          if (
            isNaN(params[settingName]) ||
            !(params[settingName] >= -1000 && params[settingName] <= 1000)
          )
            throw new Error(`ERR_INVALID_${settingName}`);
          break;
        }
        case "MIN_usrxpwr": {
          params[settingName] = Number(params[settingName]);
          if (
            isNaN(params[settingName]) ||
            !(params[settingName] >= -1000 && params[settingName] <= 1000)
          )
            throw new Error(`ERR_INVALID_${settingName}`);
          break;
        }
        case "LENGTH_UNIT": {
          params[settingName] = Number(params[settingName]);

          if (
            isNaN(params[settingName]) ||
            !(params[settingName] === 1 || params[settingName] === 3.28)
          ) {
            throw new Error(`ERR_INVALID_${settingName}`);
          }
          break;
        }
        case "MODEM_FIXES_RADIUS": {
          const validModemFixRadius = [10, 50, 100, 500, 1000];
          params[settingName] = Number(params[settingName]);
          if (
            isNaN(params[settingName]) ||
            !validModemFixRadius.includes(params[settingName])
          )
            throw new Error(`ERR_INVALID_${settingName}`);
          break;
        }
        case "CORRELATION_FIXES_RADIUS": {
          const validCorrFixRadius = [50, 100, 500, 1000, 2000, 5000];
          params[settingName] = Number(params[settingName]);
          if (
            isNaN(params[settingName]) ||
            !validCorrFixRadius.includes(params[settingName])
          )
            throw new Error(`ERR_INVALID_${settingName}`);
          break;
        }
        case "PNM_MAX_CMTS_CPU_UTILIZATION": {
          params[settingName] = Number(params[settingName]);
          if (
            isNaN(params[settingName]) ||
            !(params[settingName] < 100 && params[settingName] > 1)
          )
            throw new Error(`ERR_INVALID_${settingName}`);
          break;
        }
        case "PNM_REPOLL_WAIT_TIME": {
          params[settingName] = Number(params[settingName]);
          if (
            isNaN(params[settingName]) ||
            !(params[settingName] < 1320 && params[settingName] > 1)
          )
            throw new Error(`ERR_INVALID_${settingName}`);
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
};
