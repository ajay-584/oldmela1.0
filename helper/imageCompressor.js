const sharp = require('sharp');
const uuid = require('uuid');

const compressAndMoveImage = async (img,outputPath)=>{
    var img1 = '';
    if(img){
        img1 = uuid.v1() + '.png';
        await sharp(img.data).toFile(outputPath+img1);
    }
    return img1
}

module.exports = compressAndMoveImage;