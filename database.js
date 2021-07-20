const mongoose = require('mongoose');
// const assert = require('assert');
const db_url = process.env.DB_URL;

// // connetion code
// mongoose.connect(
//     db_url,
//     {
//         useNewUrlParser: true,
//         useUnifiedTopology: true,
//         useCreateIndex: true
//     },
//     function (err, link) {
//         // check errr
//         assert.equal(err, null, 'Database connection fail....');
//         // if everything is ok
//         console.log("Database connected...");
//     }
// );


async function main(){
    try{
        const db = await mongoose.connect(db_url, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useFindAndModify: false,
            useCreateIndex: true
        });
        if(db){
            console.log('Data base connected successfully');
        }
    }catch(e){
        console.log('Data base connection fail');
        console.log(e);
    }
}
main();