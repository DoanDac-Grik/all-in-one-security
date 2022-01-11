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


// fetch('https://www.virustotal.com/api/v3/search?query=178ba564b39bd07577e974a9b677dfd86ffa1f1d0299dfd958eb883c5ef6c3e1', options)
//   .then(response => response.json())
//   .then(response => console.log(response))
//   .catch(err => console.error(err));
// const axios = require('axios');
// const getUser = async function () {
//   try {
//     return await axios.get('https://www.virustotal.com/api/v3/search?query=178ba564b39bd07577e974a9b677dfd86ffa1f1d0299dfd958eb883c5ef6c3e1', options);
//     // console.log(response.data.data[0].attributes.sandbox_verdicts);
//     // console.log('=============================================');
//     // console.log(response.data.data[0].attributes.popular_threat_classification);
//     // console.log('=============================================');
//     // console.log(response.data.data[0].attributes.sigma_analysis_summary); 
//     // console.log('=============================================');
//     // console.log(response.data.data[0].attributes.type_description);
//     // console.log(response.data.data[0].attributes.bytehero_info);
//     // console.log('=============================================');
//     // console.log(response.data.data[0].attributes.total_votes);
//     //return a;
//   } catch (error) {
//     console.error(error);
//   }
// }
// const a =getUser().then( ok => ok)
const hash='178ba564b39bd07577e974a9b677dfd86ffa1f1d0299dfd958eb883c5ef6c3e1'
const virusTotalHelper = require('./helpers/virusTotalHelper');
virusTotalHelper.checkFile(hash, options)
.then( ok => console.log(ok.data.data[0].attributes.type_description))