ModemHelper.extractStrategicData = async (params) => {
  console.log('done');
  let isAnyFileSaved = false;

  try {
    const dataExtractionTables = await Models.rdbms.DataExtraction.getDataExtractionTables({ is_active: true });
    const timezone = await Helpers.commonHelper.getSiteConstant('SYSTEM_TIMEZONE');
    const date = Util.dateTimeUtils.getCurrentTimeBasedOn(timezone);
    const currentDay = date.getDay();
    const currentHour = Util.dateTimeUtils.getTimeInHours(timezone);
    const timestamp = date.getTime();

    const externalRepositories = await Models.rdbms.ExternalRepository.getExternalRepositories({ is_active: true });
    const isAnyValidBucket = await ModemHelper.isAnyValidBucketExist(externalRepositories);
/** For of
 * Loop */
    if(!isAnyValidBucket) {
      Logger.info('The External Repositories provided does not have valid credentials');
    } else {
      const result = await ModemHelper.generateStrategicDataTablesCsv({
        dataExtractionTables,  currentHour, currentDay, timestamp, cronName: params.cron_name
      });
      const indexOfModemByCmtsTable = result.indexOf(`modem_by_cmts_${timestamp}.csv`);

      /* modem_by_cmts entry swipped with last entry of result array to unblock other CSVs to upload first
      because csv generated for this table is very large in size
      and takes lot of time to upload CSV on external repository */
      if (result && indexOfModemByCmtsTable != -1 && indexOfModemByCmtsTable != result.length - 1) {
        [result[indexOfModemByCmtsTable], result[result.length - 1]] =
        [result[result.length - 1], result[indexOfModemByCmtsTable]];
      }

      if (result.length) {
        ModemHelper.loopExternalRepositories(externalRepositories,result);
      }
    }
  } catch (error) {
    return { 'error': error };
  }

  const message = isAnyFileSaved ? 'Data extraction reports saved successfully!!!' :
  'Data extraction CRON execution completed without generating any CSV!!!';

  return { 'success': message };
};


ModemHelper.loopExternalRepositories = (externalRepositories,result) => {
  for (const repository of externalRepositories) {
    if (repository.source_name === 'S3') {
      const { bucketName, decryptedAccessKeyId, decryptedSecretKey } =
      ModemHelper.getDecryptedBucketCredential(repository);

      const S3 = new AWS.S3({
        accessKeyId: decryptedAccessKeyId,
        secretAccessKey: decryptedSecretKey
      });

      for (const csvFileName of result) {
        try {
          const filePath = `${process.cwd()}/data_extraction/${csvFileName}`;
          if (Util.commonUtils.doesFileExists(filePath)) {
            const key = `data_extraction/${csvFileName}`;
            // eslint-disable-next-line no-await-in-loop
            await Util.commonUtils.uploadFileToS3(S3, key, bucketName, filePath, csvFileName);
            isAnyFileSaved = true;
          }
        } catch (error) {
          Logger.error(`Error while uploading csv for table ${csvFileName} on bucket ${bucketName}`);
          Logger.error(error);
        }
      }
    }
  }
}