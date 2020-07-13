const http = require('http');
const app =require('./app');
const port =3000;


const server = http.createServer(app);

// const server = http.createServer((req,res) => {
//     res.writeHead(200, {"Content-Type": "text/plain"});
//     res.write('hello word');
//     res.end();
// });

server.listen(port);