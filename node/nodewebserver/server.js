const express = require('express')
const server = express();
const path = require('path');
let port = 3000;

server.use(express.json());
server.use(express.urlencoded({extended: true}));
server.use(express.static(path.join(__dirname, '/public')));

server.listen(port, () => console.log(`Listening at http://localhost:${port}`))