const val = async (jobRoles, params) => {
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