const { exec } = require("child_process");

exec("ping 8.8.8.8", (error, stdout, stderr) => {
    if (error) {
        console.log(`error: ${error.message}`);
        return;
    }
    if (stderr) {
        console.log(`stderr: ${stderr}`);
        return;
    }
    //setTimeout(function(){ console.log("Hello"); }, 3000);
    console.log(`stdout: ${stdout}`);
});

const { exec } = require("child_process");

exec("ping 8.8.8.8", (error, stdout, stderr) => {
    if (error) {
        console.log(`error: ${error.message}`);
        return;
    }
    if (stderr) {
        console.log(`stderr: ${stderr}`);
        return;
    }
    
    //setTimeout(function(){ console.log("Hello"); }, 3000);
    console.log(`stdout: ${stdout}`);
});


