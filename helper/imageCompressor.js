const sharp = require('sharp');
const uuid = require('uuid');

const compressAndMoveImage = async (img,outputPath)=>{
    var img1 = '';
    if(img){
        const extension = img.mimetype.replace(/\//g, ' ').split(' ')[1];
        // Generating a unique name of image
        img1 = uuid.v1() + '.' + extension;
        await sharp(img.data).resize(1200,800,{fit:'inside'}).toFile(outputPath+img1);
    }
    return img1
}

// compressAndMoveImage('../public/pic/s.jfif','../public/pic/');

module.exports = compressAndMoveImage;