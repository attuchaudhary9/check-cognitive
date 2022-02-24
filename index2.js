/* global Util */

const JobRoleHelper = {};

module.exports = JobRoleHelper;

JobRoleHelper.sanatizeCreateJobRoleParams = (params) => {

    if (params.decoded.user_type !== 1) {
        throw new Error('ERR_NOT_PRIVILIGED');
    }

    const { name, is_active, allowed_user_type, features } = params = params.body;

    if (!Util.commonUtils.isString(name) || Util.commonUtils.isEmpty(name)) {
        throw new Error('ERR_JOB_ROLE_NAME_EMPTY_OR_NOT_STRING');
    }

    if (!Util.commonUtils.isBoolean(is_active)) {
        throw new Error('ERR_JOB_ROLE_ACTIVE_STATUS_NOT_BOOLEAN');
    }

    if (!allowed_user_type.isValidAllowedUserType()) {
        throw new Error('ERR_INVALID_JOB_ROLE_ALLOWED_USER_TYPE');
    }

    if (!Array.isArray(features) || Util.commonUtils.isEmpty(features)) {
        throw new Error('ERR_INVALID_FEATURES_NOT_EMPTY');
    }

    return params;
};

JobRoleHelper.roundUpSubFeaturesAsParamsToInsert = (jobRoleFeatures, jobRoleId) => {
    const roundedUpSubFeatures = [];
    jobRoleFeatures.forEach(jobRoleFeature => {
        const jobRoleFeatureId = jobRoleFeature.feature_id;
        if (jobRoleFeature.sub_features.length) {
            jobRoleFeature.sub_features.forEach(jobRoleSubFeature => {
                roundedUpSubFeatures.push({
                    status: jobRoleSubFeature.status,
                    job_role_id: jobRoleId,
                    feature_id: jobRoleFeatureId,
                    sub_feature_id: jobRoleSubFeature.sub_feature_id,
                });
            });
        } else {
            roundedUpSubFeatures.push({
                status: jobRoleFeature.status,
                job_role_id: jobRoleId,
                feature_id: jobRoleFeatureId,
                sub_feature_id: null,
            });
        }
    });

    return roundedUpSubFeatures;
};

JobRoleHelper.roundUpSubFeaturesAsParamsToUpdate = async (
    jobRoleFeatures,
    jobRoleId
  ) => {
    const roundedUpSubFeatures = [];

    jobRoleFeatures.forEach(async (jobRoleFeature) => {
      const jobRoleFeatureId = jobRoleFeature.feature_id;

      if (jobRoleFeature.sub_features.length) {
        jobRoleFeature.sub_features.forEach(async (jobRoleSubFeature) => {
          roundedUpSubFeatures.push({
            id:jobRoleSubFeature.job_role_feature_id,
            status: jobRoleSubFeature.status,
            job_role_id: jobRoleId,
            feature_id: jobRoleFeatureId,
            sub_feature_id: jobRoleSubFeature.sub_feature_id,
          });
        });

      } else {
        roundedUpSubFeatures.push({
          id:jobRoleFeature.job_role_feature_id,
          status: jobRoleFeature.status,
          job_role_id: jobRoleId,
          feature_id: jobRoleFeatureId,
          sub_feature_id: null,
        });
      }
    });

    return roundedUpSubFeatures;
  };

  JobRoleHelper.roundUpDataForOutput = async (jobRoles, params) => {
    const id = params.id;
    params.features.forEach(jobRole => {
      const feature_id = jobRole.feature_id;
      if(jobRole.sub_features.length) {
        jobRole.sub_features.forEach(subFeature => {
          const sub_feature_id = subFeature.sub_feature_id;
          const jrfi = jobRoles.find(j => {
            if(j.job_role_id === id && j.feature_id === feature_id && j.sub_feature_id === sub_feature_id) {
              return j.id;
            }
          });
          subFeature.job_role_feature_id = jrfi.id;
        });
      } else {
        const jrfi = jobRoles.find(j => {
          if(j.job_role_id === id && j.feature_id === feature_id) {
            return j.id;
          }
        });
        jobRole.job_role_feature_id = jrfi.id;
      }
    });
    return params;
  };
