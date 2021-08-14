const AWS = require('aws-sdk');

const BUCKET_NAME = 'oldmela';

const s3 = new AWS.S3({
    accessKeyId: 'AKIA2N6AUCNQNXH4SCXA',
    secretAccessKey:'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',
    region:'ap-south-1'
});


//=============== Bucket Creation
// const CreateBucket = ()=>{
//     const params = {
//         Bucket:BUCKET_NAME
//     }
//     s3.createBucket(params,(err,info)=>{
//         if(err){
//             console.log(err);
//         }
//         console.log(info);
//     })
// }
// CreateBucket();

// ===========upload file on se bucket

const uploadFile = (buffer, name, imgType)=>{
    return new Promise((resolve, reject)=>{
        const params = {
            Bucket:BUCKET_NAME,
            Key:name,
            Body:buffer,
            ContentType:'image/'+imgType,
            ACL:'public-read'
        }
        s3.upload(params, (err, info)=>{
            if(err){
                return reject(err)
            }
            return resolve(info.Key)
        })
    });
}

module.exports = uploadFile;