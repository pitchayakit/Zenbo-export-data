const fs = require('fs');
const createCsvWriter = require('csv-writer').createObjectCsvWriter;  

fs.readdir("Regression", function(err, filenames) {
    let datas=[];
    //console.log(filenames);
    filenames.forEach(function(filename) {
        let input = fs.readFileSync("Regression/"+filename, 'utf8');
        let regex = /TimeStamp":"(.*?)",.*correctedSentence.....(.*?)..,/g;
        let matches;
        
        while (matches = regex.exec(input)) {
            //console.log(matches)
            let obj = {};
            console.log('TimeStamp: ' + matches[1]);
            console.log('correctedSentence: ' + matches[2]);
            obj["timeStamp"] = matches[1];
            obj["correctedSentence"] = (matches[2]) ? obj["correctedSentence"] = matches[2] : obj["correctedSentence"] = "misrecognition";
            datas.push(obj);   
        }
    });
    //console.log(datas)
    
    const csvWriter = createCsvWriter({  
        path: 'output.csv',
        header: [
        {id: 'timeStamp', title: 'TimeStamp'},
        {id: 'correctedSentence', title: 'Corrected Sentence'},
        ]
    });
    
    csvWriter  
        .writeRecords(datas)
        .then(()=> console.log('The CSV file was written successfully'));
});



