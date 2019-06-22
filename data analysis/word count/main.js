const csv = require('csv-parser');  
const fs = require('fs');

let apps=[];
fs.createReadStream('input.csv')  
  .pipe(csv())
  .on('data', (row) => {
    let obj = {name:row.word, count:1}
    
    let check_obj = false;
    for(let i=0 ; i < apps.length ;i++){
        if(apps[i].name == row.word){
            check_obj = true;
            apps[i].count += 1;
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
        {id: 'name', title: 'Word'},
        {id: 'count', title: 'Access count'},
        ]
    });
    
    csvWriter  
        .writeRecords(apps)
        .then(()=> console.log('The CSV file was written successfully'));
  });

  
