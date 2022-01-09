var cron = require('node-cron');
const {apodAPITask} = require('./task')

const task = cron.schedule('0 6 * * *', () =>  {
    apodAPITask()
  });

task.start()