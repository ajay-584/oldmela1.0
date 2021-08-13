// const fs = require('fs');
const AWS = require('aws-sdk');

const BUCKET_NAME = 'oldmela';

const s3 = new AWS.S3({
    accessKeyId: 'AKIA2N6AUCNQNXH4SCXA',
    secretAccessKey:'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'
});



const deleteImage = (file)=>{
    return new Promise((resolve, reject)=>{
        const params = {
            Bucket: BUCKET_NAME,
            Key:file
        }
        s3.deleteObject(params, (err,data)=>{
            if(err){
                return reject(err);
            }
            // console.log("Image has been delete",data);
            return resolve(data);
        });
        // checking image is exit or not
        // fs.stat(file, (err, stat)=>{
        //     if(err){
        //         return reject(err)
        //     }
        //     // deleting image from folder 
        //     fs.unlink(file, (err, data)=>{
        //         if(err){
        //             return reject(err);
        //         }
        //         return resolve(data);
        //     });
        // });
    });
}
module.exports = deleteImage;