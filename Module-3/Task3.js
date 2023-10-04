import fs from 'fs';
import stream from 'stream';
import csv from 'csvtojson';

// There is still open issue for trailing comma https://github.com/Keyang/node-csvtojson/issues/333
const lineToArray = new stream.Transform({
  transform (chunk, encoding, cb) {
    // add [ to very front
    // add , between rows
    // remove crlf from row
    this.push((this.isNotAtFirstRow ? ',' : '[') + chunk.toString('utf-8').slice(0, -1));
    this.isNotAtFirstRow = true;
    cb();
  },
  flush(cb) {
    // add ] to very end or [] if no rows
    const isEmpty = (!this.isNotAtFirstRow);
    this.push(isEmpty ? '[]' : ']');
    cb();
  }
});

stream.pipeline(
  fs.createReadStream('Module-3/cvsdirectory/data.csv'),
  csv({
    checkType: true,
    downstreamFormat: 'line',
    colParser: {
      "Amount":"omit",
    }
  }),
  lineToArray,
  fs.createWriteStream('Module-3/jsondirectory/result.json'),
  (err) => {
    if (err) {
      console.error('Pipeline failed', err);
    } else {
      console.log('Pipeline succeeded');
    }
  }
);
