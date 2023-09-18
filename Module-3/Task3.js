import fs from 'fs';
import stream from 'stream';
import csv from 'csvtojson';

stream.pipeline(
  fs.createReadStream('Module-3/cvsdirectory/data.csv'),
  csv({
    colParser:{
      "Book":"string",
      "Author":"string",
      "Amount":"omit",
      "Price":"number",
    },
  }),
  fs.createWriteStream('Module-3/jsondirectory/result.json'),
  (err) => {
    if (err) {
      console.error('Pipeline failed', err);
    } else {
      console.log('Pipeline succeeded');
    }
  }
);

