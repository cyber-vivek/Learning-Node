const http = require('http');
const fs = require('fs');
const _ = require('lodash');

const server = http.createServer((req, res) => {

    // lodash
    const num = _.random(0,20);
    console.log(num);

    const greet  = _.once(()=>{
        console.log("hello");
    })

    greet();
    greet();


    // set header content type
    res.setHeader('Content-Type', 'text/html');

    let path = './views/'

    switch (req.url) {
        case '/':
            path += 'index.html';
            res.statusCode = 200;
            break;
        case '/about':
            path += 'about.html';
            res.statusCode = 200;
            break;
        // redirecting to a url
        case '/about-us':
            res.statusCode = 301;
            res.setHeader('Location', '/about');
            res.end();
            break;
        default:
            path += '404.html';
            res.statusCode = 404;
            break;
    }

    // send an html file
    fs.readFile(path, (err, data) => {
        if (err) {
            console.log(err);
            res.end();
        }
        else {
            // res.write(data);
            // if we write only one thing only we can give it in the end methon
            res.end(data);
        }
    })

});

server.listen(3000, 'localhost', () => {
    console.log('listening for requests on port 3000');
});








         // NOTES   //
             // Status Codes
               // 100 range - informational responses
               // 200 range - success codes
               // 300 range - codes for redirects
               // 400 range - user or client error codes
               // 500 range - servre error codes

             // 

