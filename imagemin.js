const imagemin         = require('imagemin-keep-folder');
const imageminMozjpeg  = require('imagemin-mozjpeg');
const imageminPngquant = require('imagemin-pngquant');

imagemin(['src/images/**/*.{jpg,png}'], {
  plugins: [
    imageminMozjpeg({ quality: 80 }),
    imageminPngquant({ quality: '65-80' })
  ],
  replaceOutputDir: output => {
    return output.place(/images\//, '../../dist/images/')
  }
}).then(() => {
  console.log('画像を圧縮しました。');
});