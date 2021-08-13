const sharp = require('sharp');
const uuid = require('uuid');
const uploadFile = require('./uploadImageOnS3')

const compressAndMoveImage = (img,outputPath)=>{
    return new Promise((resolve, reject)=>{
        var img1 = '';
        if(img){
            const extension = img.mimetype.replace(/\//g, ' ').split(' ')[1];
            // Generating a unique name of image
            img1 = uuid.v1() + '.' + extension;
            sharp(img.data).resize(1200,800,{fit:'inside'}).toBuffer(async(err,data,info)=>{
                if(err){
                    return reject(err);
                }
                await uploadFile(data, img1, info.format);
            });
        }
        return resolve(img1);
    });
}

// compressAndMoveImage('../public/pic/s.jfif','../public/pic/');

module.exports = compressAndMoveImage;