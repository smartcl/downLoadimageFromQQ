const webp=require('webp-converter');

const fs = require('fs');

const webpToJpg = (webpFile, jpgFile) => {
    return new Promise((resolve, reject) => {
        webp.dwebp(webpFile, jpgFile, "-o", (status,error) => {
            console.log(status,error);
            resolve(status);
        });
    });
}

const webpToJpgAll = async () => {
    let files = fs.readdirSync('./images');
    for (let i = 0; i < files.length; i++) {
        if (files[i].indexOf('webp') > -1) {
            let webpFile = `./images/${files[i]}`
            let jpgFile = `./images/${files[i].split('.')[0]}.jpg`;
            await webpToJpg(webpFile, jpgFile);
            console.log(`${webpFile} ====> ${jpgFile} 完成`);
        }
    }
}

webpToJpgAll().then(() => {
    console.log("转换完成");
}).catch(err => {
    console.log(err);
});