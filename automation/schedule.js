var cron = require('node-cron');
const {apodAPITask} = require('./task')

cron.schedule('30 6 * * *', () => {
  console.log("automation start")
    apodAPITask()
});
