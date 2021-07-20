const mongoose = require('mongoose');
const db_url = process.env.DB_URL;
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