// // // const { exec } = require("child_process");

// // // exec("ping 8.8.8.8", (error, stdout, stderr) => {
// // //     if (error) {
// // //         console.log(`error: ${error.message}`);
// // //         return;
// // //     }
// // //     if (stderr) {
// // //         console.log(`stderr: ${stderr}`);
// // //         return;
// // //     }
// // //     //setTimeout(function(){ console.log("Hello"); }, 3000);
// // //     console.log(`stdout: ${stdout}`);
// // // });


    
// // get filesystem module 
// const fs = require("fs"); 
// // using the readFileSync() function 
// // and passing the path to the file 
// const buffer = fs.readFileSync("/home/kali/Desktop/scan2.xml"); 
// // use the toString() method to convert 
// // Buffer into String 
// const fileContent = buffer.toString();
// // import File System Module

// // import xml2js Module
// const {

//   parseString

// } = require('xml2js');



// //xml data
// var xmldata = fileContent;

// // parsing xml data
// parseString(xmldata, function (err, results) {

// // parsing to json
// let data = JSON.stringify(results)

// // display the json data
// console.log(JSON.parse(data).OWASPZAPReport.site[0].alerts[0].alertitem);
// });
 //Cmd zap: ./zap.sh -cmd  -quickurl https://google.com -quickout /tmp/repzap.xml -quickprogress

const options = {
  method: 'GET',
  headers: {
    Accept: 'application/json',
    'x-apikey': '8636535d7444c09c95dd52f6854cb623e1c86b83cfe816726b1df1968e67557b'
  }
};

fetch('https://www.virustotal.com/api/v3/search?query=178ba564b39bd07577e974a9b677dfd86ffa1f1d0299dfd958eb883c5ef6c3e1', options)
  .then(response => response.json())
  .then(response => console.log(response))
  .catch(err => console.error(err));