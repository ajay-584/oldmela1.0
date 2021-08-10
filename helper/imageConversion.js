const imageConversion = require("image-conversion");
var Blob = require('blob');

const file = '../public/pic/IMG_20200813_220840.jpg'
// async function view() {
//     console.log(file);
//     const res = await imageConversion.compressAccurately(file,200)
//     console.log(res);
//   }

  view();


  function view(){
    console.log(file);
    imageConversion.compressAccurately(file,200).then(res=>{
      //The res in the promise is a compressed Blob type (which can be treated as a File type) file;
      res.Blob().then((data)=>{
          console.log(data);
      })
    })
  }