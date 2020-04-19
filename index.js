const request = require('request');

const path = require('path');
const fs = require('fs');

const imageList = require('./imageList').list;

let downloadImage = async (imageNameItem, url) => {
    return new Promise((resolve, reject) => {
        let option = {url};
        request.get(option, (err, res, body) => {
            let imageName = `${imageNameItem}.${res.headers['content-type'].split('/')[1]}`;
            request(option.url).pipe(fs.createWriteStream(imageName)).on('close', ()=>{
                console.log(`${imageName}下载完成`);
                resolve();
            });
            // let writeStream = fs.createWriteStream(imageName);
            // res.pipe(writeStream).on('end', ()=>{resolve()});
            // fs.writeFileSync(imageName, Buffer.from(body));
            // console.log(`${imageName}下载完成`);
            // resolve();
        });
         // request(option.url).pipe(fs.createWriteStream('1.gif')).on('end', ()=>{resolve()});
    });
}

let  downloadImageList = async () => {
    for (let i = 0; i < imageList.length; i++) {
        await downloadImage(`images/${i + 1}`, imageList[i]);
    }
}

downloadImageList().then(() => {
    console.log("全部图片下载完成");
}).catch(err => {
    console.log(err);
});