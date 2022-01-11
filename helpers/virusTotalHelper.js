const nvt = require('node-virustotal');
require('dotenv').config();
const request = nvt.makeAPI().setKey(process.env.API_KEY);
const axios = require('axios');

class VirusTotalHelper {
    //use virus total to check domain safe or not
    checkDomain(domain) {
        return new Promise((resolve, reject) => {
            request.domainLookup(domain, function (err, res) {
                resolve(res);
                reject(err);
            });
        });
    }
    //just a filtering to get clean domain :)
    reduceUrl(domain) {
        const heaerUrls = [
            'https://',
            'http://',
            'http://www.',
            'https://www.',
        ]
        const findInclude = heaerUrls.find(heaerUrl => domain.includes(heaerUrl))
        return findInclude ? (new URL(domain)).hostname.replace('www.', '') : domain;
    }
    //with file's hash, call api virus-total to check file safe or not
    checkFile(hash, options){
        const data = async function() {
            try {
                return await axios.get(`https://www.virustotal.com/api/v3/search?query=${hash}`, options);    
            } catch (error) {
                console.log(error);
            }
        }
        return data().then(data =>data);
    }


}
module.exports = new VirusTotalHelper();
// if (err) {
//     console.log('Virustotal API did not work because:');
//     console.log(err);
//     return;
// }
// var road = JSON.parse(res);
// const rawData = road.data.attributes.last_analysis_results;
// let trust=0; 
// let distrust=0;
// let resultArr =[];      
// for (const [key, value] of Object.entries(rawData)) {           
//     if(value.result !== 'clean'){
//             resultArr.push({[key]: value.result})
//         distrust++;
//     }
//     else {
//         trust++;
//     }
// }
// resolve(resultArr);
//  console.log(resultArr);
//  console.log('trust: ',trust);
// console.log('distrust: ',distrust);