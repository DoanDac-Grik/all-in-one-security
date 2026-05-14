// const { exec } = require("child_process");

// exec("/usr/share/zaproxy/zap.sh -cmd  -quickurl https://google.com -quickout /tmp/okzap.xml -quickprogress", (error, stdout, stderr) => {
//     if (error) {
//         console.log(`error: ${error.message}`);
//         return;
//     }
//     if (stderr) {
//         console.log(`stderr: ${stderr}`);
//         return;
//     }
//     //setTimeout(function(){ console.log("Hello"); }, 3000);
//     console.log(`stdout: ${stdout}`);
// });
<<<<<<< HEAD
 //Cmd zap: ./zap.sh -cmd  -quickurl https://google.com -quickout /tmp/repzap.xml -quickprogress
const options = {
  method: 'GET',
  headers: {
    Accept: 'application/json',
    'x-apikey': '8636535d7444c09c95dd52f6854cb623e1c86b83cfe816726b1df1968e67557b'
=======


// var exec = require('child-process-promise').exec;
 
// exec('/usr/share/zaproxy/zap.sh -cmd  -quickurl https://google.com -quickout /home/kali/Desktop/NewFolder/all-in-one-security/public/file/okzap.xml -quickprogress')
//     .then(function (result) {
//     console.log("ok ok lala")
//     })
//     .catch(function (err) {
//         console.error('ERROR: ', err);
//     });

const execShPromise = require("exec-sh").promise;
const { parseString } = require('xml2js');
const fs = require("fs");

// run interactive bash shell
const run = async () => {
  let out;

  try {
    out = await execShPromise('/usr/share/zaproxy/zap.sh -cmd  -quickurl https://google.com -quickout /home/kali/Desktop/NewFolder/all-in-one-security/public/file/okzap2.xml -quickprogress', true);
    
} catch (e) {
    console.log('Error: ', e);
    console.log('Stderr: ', e.stderr);
    console.log('Stdout: ', e.stdout);

    return e;
>>>>>>> 08fd640fd13447cfb0ecc328c9968c59cd2a5df6
  }

<<<<<<< HEAD

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
=======
  console.log('out: ', out.stdout, out.stderr);
}

run();   
    
>>>>>>> 08fd640fd13447cfb0ecc328c9968c59cd2a5df6
