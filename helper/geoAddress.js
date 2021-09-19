const unirest = require("unirest");


const mapAddress = (address)=>{
    // const token = 'FvaH8c0_H6jzM4W8IxQdpw';
    const apikey = `Wes6djuH85t982ux2RgmgiZ2IxfOlOpf8sqoXFHAUDA`;
    return new Promise((resolve, reject)=>{
    const req = unirest(`GET`, `https://autosuggest.search.hereapi.com/v1/autosuggest?apiKey=${apikey}&at=28.644800,77.216721&limit=5&resultType=city&q=${address}&lang=en-UK`);
        // req.headers({'Authorization': `Bearer tNSRkA7iQVs7rz1aJEL_mKaghBgyL9VBV--IRcxrE5A`})
        req.end((result)=>{
            if(result.error){
                // console.log(result.error);
                return reject(result.error);
            }
            // console.log(result.body);
            // console.log(result.body.items[0].position);
            return resolve(result.body);
        });
    });
} 

module.exports = mapAddress;
// mapAddress('Pali Darbhanga');