const csv = require('csv-parser');  
const fs = require('fs');
const TimeFormat = require('hh-mm-ss');

let apps=[];
fs.createReadStream('input.csv')  
  .pipe(csv())
  .on('data', (row) => {
    let duration = TimeFormat.toS(row.Duration);
    let obj = {name:row.App, count:1, duration:row.Duration}
    
    let check_obj = false;
    for(let i=0 ; i < apps.length ;i++){
        if(apps[i].name == row.App){
            check_obj = true;
            apps[i].count += 1;
            duration_update = TimeFormat.toS(apps[i].duration) + duration; 
            apps[i].duration = TimeFormat.fromS(duration_update,'hh:mm:ss');
            break;
        }
    }
    if(check_obj == false)
        apps.push(obj);
  })
  .on('end', () => {
    console.log('CSV file successfully processed');
    console.log(apps);
    const createCsvWriter = require('csv-writer').createObjectCsvWriter;  
    const csvWriter = createCsvWriter({  
        path: 'output.csv',
        header: [
        {id: 'name', title: 'Name'},
        {id: 'count', title: 'Access count'},
        {id: 'duration', title: 'Duration'},
        ]
    });
    
    csvWriter  
        .writeRecords(apps)
        .then(()=> console.log('The CSV file was written successfully'));
  });

  
