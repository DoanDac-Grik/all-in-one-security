const nvt = require('node-virustotal');
require('dotenv').config();
const request = nvt.makeAPI().setKey(process.env.API_KEY);


class CheckSafeLink {
    checkDomain(domain) {
        return new Promise((resolve, reject) => {
            request.domainLookup(domain, function (err, res) {
                resolve(res);
                reject(err);
            });
        });
    }

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
    //Se lam sau
    //checkUrl(url)


}
module.exports = new CheckSafeLink();
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