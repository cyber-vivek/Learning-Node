
///// ***  STREAMS & Buffers   ***//////
// we can relate it to real life stream to fill a container from another container through a pipe
// start using data, before it has finished loading
//  it is used if size of file is too large and reading it could take a lot of time
// small chunk or package of data called buffer are sent to stream
// when we stream something on browser then buffer are sent without sending the whole video at once



const fs = require('fs');

const readStream = fs.createReadStream('./docs/blog3.txt',{encoding:'utf-8'});
const writeStream = fs.createWriteStream('./docs/blog4.txt');

readStream.on('data',(chunk)=>{
    console.log('----New Chunk----');
    console.log(chunk);
    writeStream.write('\n NEW CHUNK \n');
    writeStream.write(chunk);
})