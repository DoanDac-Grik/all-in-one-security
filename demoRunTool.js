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


const nvt = require('node-virustotal');
require('dotenv').config();
 const defaultTimedInstance= nvt.makeAPI().setKey(process.env.API_KEY);
const url="https://www.npmjs.com"
const hashed = nvt.sha256(url);
const theSameObject = defaultTimedInstance.urlLookup(hashed, function(err, res){
    if (err) {
      console.log('Well, crap.');
      console.log(err);
      return;
    }
    const data = JSON.parse(res).data.attributes.last_analysis_results;
    console.log(data)
    return;
  });
  

