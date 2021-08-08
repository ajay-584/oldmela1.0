const sharp = require('sharp');


sharp('../public/images/img_avatar2.png').toFile('../public/newfile.png',(err,rel)=>{
    if(err){
        console.log("error h idher ",err)
    }
    console.log("sabkuchh thik h",rel);
});