const nvt = require('node-virustotal');
require('dotenv').config();
const request = nvt.makeAPI().setKey(process.env.API_KEY);
const axios = require('axios');


class VirusTotalHelper{
    //Check domain is safe or not
    checkDomain(domain){
        return new Promise((resolve, reject)=>{
            request.domainLookup(domain, function (err, res) {
                resolve(res);
                reject(err);  
            });
        });
    }
    //Check hash code safe or not
    checkFile(hash, options){
        const a = async function() {
            try {
                return await axios.get(`https://www.virustotal.com/api/v3/search?query=${hash}`, options);    
            } catch (error) {
                console.log(error);
            }
        }
        return a().then(data =>data);
    }
   
  }
module.exports = new VirusTotalHelper();
