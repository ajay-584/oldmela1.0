const fs = require('fs');



const deleteImage = (file)=>{
    return new Promise((resolve, reject)=>{
        // checking image is exit or not
        fs.stat(file, (err, stat)=>{
            if(err){
                return reject(err)
            }
            // deleting image from folder 
            fs.unlink(file, (err, data)=>{
                if(err){
                    return reject(err);
                }
                return resolve(data);
            });
        });
    });
}

module.exports = deleteImage;