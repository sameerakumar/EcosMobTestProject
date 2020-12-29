const CronJob = require('cron').CronJob;
let ScheduleMailSending = require('./SendingMails');

// Cron job for sending mails every day at 10:50 pm)
/*console.log('job started...')
new CronJob(
  '50 22 *  *  *',
  function() {
    ScheduleMailSending.sendingMailsWithScheduler();
  },
  null,
  true,
  'Asia/Kolkata'
); */
// Cron job for sending mails every 15min time interval)
console.log('job started...')
new CronJob(
  '*/15 * * * *',
  function() {
    ScheduleMailSending.sendingMailsForEvery15Min();
  },
  null,
  true,
  'Asia/Kolkata'
);
