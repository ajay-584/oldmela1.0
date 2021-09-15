const unirest = require("unirest");


const tokenGenerator = ()=>{
    return new Promise((resolve, reject)=>{
        const req = unirest("POST", "https://outpost.mapmyindia.com/api/security/oauth/token");
        req.headers({'Content-Type': 'multipart/form-data'})
        req.field({
            'grant_type': 'client_credentials',
            'client_id': '33OkryzDZsK_HllDUXmIZyD3dMUEDxvAib9S2UAb4zMOB1P8oMpIs5XUCNJaNVtjHEkfrb7k1gMqB0IiflXxeQ==',
            'client_secret': 'lrFxI-iSEg_eY2wd0nntN0S1ePBQ6d05MRNpbm-Zi0f1sA1A6VAOrki2Cq6171k1eJys-SiXH-k3EJgqKFFoneLpnf__L0-6'
          }) // Form field
        req.end((result)=>{
            if(result.error){
                // console.log(result.error);
                return reject(result.error);
            }
            // console.log(result.body);
            return resolve(result.body);
        });
    });
} 

module.exports = tokenGenerator;
// tokenGenerator();