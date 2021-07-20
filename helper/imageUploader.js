const uuid = require('uuid');
const imgUploader = (img, filePath) =>{
    return new Promise(async (resolve, reject)=>{
        try{
            var img1 = '';
            // checking images is uploaded or not
            if (img) {
              let extension = img.mimetype.replace(/\//g, ' ').split(' ')[1];
              // Generating a unique name of image
              img1 = uuid.v1() + '.' + extension;
              // moving image in imgae file
              await img.mv(filePath + img1);
            }
            return resolve(img1);
        }catch(e){
            return reject(e);
        }
    });
}

module.exports = imgUploader;