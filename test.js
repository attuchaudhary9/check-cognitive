const val = {
  "data": {
      "widget_sequence": {
          "left_panel": "red_cm_count,red_cm_daily,modem_count,cmts_count,health,red_cm_weekly,alarm,prediction",
          "right_panel": "modem_action_list,modems_weekly_variation,correlation,spectra_impaired_modems,cmts_cm_status_variation,modem_current_count,birth_certificate_list,work_order_list,top_technician_login,modem_watch_list,fbc_correlation_list,rxmer_correlation_list"
      },
      "user_widget_preference": {
          "node_action_list": {
              "is_visible": true,
              "num_records": 3
          },
          "modem_action_list": {
              "is_visible": true,
              "num_records": 3,
              "sort_col": "MTC"
          },
          "modems_weekly_variation": {
              "is_visible": true,
              "num_days": 7
          },
          "top_technician_login": {
              "is_visible": true,
              "technician_count": 3,
              "past_days": 7
          },
          "work_order_list": {
              "is_visible": true,
              "open": true,
              "in_progress": true,
              "fixed": true,
              "closed": true,
              "assigned": true,
              "queued": true,
              "number_of_records": 100
          },
          "modems_status_variation": {
              "is_visible": true,
              "num_days": 7
          },
          "birth_certificate_list": {
              "is_visible": true,
              "pass": true,
              "fail": true,
              "startDate": "",
              "endDate": ""
          },
          "spectra_impaired_modems": {
              "is_visible": true
          },
          "cmts_cm_status_variation": {
              "is_visible": true,
              "num_days": 7
          },
          "modem_watch_list": {
              "is_visible": true
          },
          "correlation": {
              "is_visible": true,
              "impacted_customer_on_account": true
          },
          "modem_current_count": {
              "is_visible": true
          },
          "search": {
              "is_visible": true
          },
          "left_panel": {
              "is_visible": false
          },
          "fbc_correlation_list": {
              "is_visible": true
          },
          "rxmer_correlation_list": {
              "is_visible": true
          }
      }
  }
}

const val1 = {
  "data": {
      "widget_sequence": {
          "left_panel": "red_cm_count,red_cm_daily,modem_count,cmts_count,health,red_cm_weekly,alarm,prediction",
          "right_panel": "modem_action_list,modems_weekly_variation,correlation,spectra_impaired_modems,cmts_cm_status_variation,modem_current_count,birth_certificate_list,work_order_list,top_technician_login,modem_watch_list,fbc_correlation_list,rxmer_correlation_list"
      },
      "user_widget_preference": {
          "node_action_list": {
              "is_visible": true,
              "num_records": 3
          },
          "modem_action_list": {
              "is_visible": true,
              "num_records": 3,
              "sort_col": "MTC"
          },
          "modems_weekly_variation": {
              "is_visible": true,
              "num_days": 7
          },
          "top_technician_login": {
              "is_visible": true,
              "technician_count": 3,
              "past_days": 7
          },
          "work_order_list": {
              "is_visible": true,
              "open": true,
              "in_progress": true,
              "fixed": true,
              "closed": true,
              "assigned": true,
              "queued": true,
              "number_of_records": 100
          },
          "modems_status_variation": {
              "is_visible": true,
              "num_days": 7
          },
          "birth_certificate_list": {
              "is_visible": true,
              "pass": true,
              "fail": true,
              "startDate": "",
              "endDate": ""
          },
          "spectra_impaired_modems": {
              "is_visible": true
          },
          "cmts_cm_status_variation": {
              "is_visible": true,
              "num_days": 7
          },
          "modem_watch_list": {
              "is_visible": true
          },
          "correlation": {
              "is_visible": true,
              "impacted_customer_on_account": true
          },
          "modem_current_count": {
              "is_visible": true
          },
          "search": {
              "is_visible": true
          },
          "left_panel": {
              "is_visible": false
          },
          "fbc_correlation_list": {
              "is_visible": true
          },
          "rxmer_correlation_list": {
              "is_visible": true
          }
      }
  }
}
function shallowEqual(object1, object2) {
  const keys1 = Object.keys(object1);
  const keys2 = Object.keys(object2);
  if (keys1.length !== keys2.length) {
    return false;
  }
  for (let key of keys1) {
    if (object1[key] !== object2[key]) {
      return false;
    }
  }
  return true;
}
console.log(shallowEqual(val, val1))