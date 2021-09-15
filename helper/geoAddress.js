const unirest = require("unirest");


const mapAddress = (token, type, address, limit=10)=>{
    return new Promise((resolve, reject)=>{
        const req = unirest(`GET`, `https://atlas.mapmyindia.com/api/places/geocode?address=${address}&itemCount=${limit}`);
        req.headers({'Authorization': `${type} ${token}`})
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

module.exports = mapAddress;
// const tempToken = {
//     access_token: "cb01cbc8-c309-43d9-a187-a9b2a3f11ee5",
//     client_id: "33OkryzDZsK_HllDUXmIZyD3dMUEDxvAib9S2UAb4zMOB1P8oMpIs5XUCNJaNVtjHEkfrb7k1gMqB0IiflXxeQ==",
//     expires_in: 81044,
//     project_code: "prj1631586936i321095552",
//     scope: "READ",
//     token_type: "bearer"
// }
// mapAddress(tempToken, 'machhaita', 10);