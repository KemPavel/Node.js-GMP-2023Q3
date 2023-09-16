const os = require('os');
const fs = require('fs');
const childProcess = require('child_process');

const commands = {
  unix: 'ps -A -o %cpu,%mem,comm | sort -nr | head -n 1',
  windows: 'powershell "Get-Process | Sort-Object CPU -Descending | Select-Object -Property Name, CPU, WorkingSet -First 1 | ForEach-Object { $_.Name + \' \' + $_.CPU + \' \' + $_.WorkingSet }"'
};

const command = os.platform() === 'win32' ? commands.windows : commands.unix;

const saveData = (data) => {
  const time = new Date().getTime();
  const newLine = `${time}: ${data}`;
  fs.appendFile('activityMonitor.log', newLine, (err) => {
    if (err) throw err;
    console.warn('Updated!');
  });
};

const execProcess = (cmd, cb) => {
  childProcess.exec(cmd, (error, stdout) => {
    console.clear();
    console.log(stdout);
    cb && cb(stdout);
  });
};

setInterval(() => {
  execProcess(command);
}, 100);

setInterval(() => {
  execProcess(command, saveData);
}, 60 * 1000);


process.on('uncaughtException', (error) => {
  console.error(`${(new Date).toUTCString()} uncaught exception: ${error.message}`);
  console.error(error.stack);
  process.exit(1);
});
