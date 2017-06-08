const config = require('config');
const CronJob = require('cron').CronJob;
const pg = require('../../db/models/pgAPI');


const processEndingAuctions = new CronJob({
  cronTime: '00 0-59 * * * *',
  onTick: function() {
    console.log("hello world");
  },
  start: true
});

processEndingAuctions.start();
