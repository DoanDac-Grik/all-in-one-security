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
  }

  console.log('out: ', out.stdout, out.stderr);
}

run();   
    