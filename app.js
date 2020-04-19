

const express = require('express');
const bodyParser = require('body-parser');
var svgCaptcha = require('svg-captcha');
var cors = require('cors')
var fs= require('fs')
const app = express();
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())

app.get('/', (req, res) => {
    // res.json({"message": "This is Home Page"});
    res.writeHead(200, {'Content-Type': 'text/html'})
    var myReadStream = fs.createReadStream(__dirname + '/index.html', 'utf-8');
    myReadStream.pipe(res)
});

app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    res.header('Access-Control-Allow-Methods', 'PUT, POST, GET, DELETE, OPTIONS');
    next();
});
app.use(cors());

app.listen(8081, () => {
    console.log("Server is listening on port 8081");
});

app.get('/captcha', function (req, res) {
    var options= {size:6,color: false}
var captcha = svgCaptcha.create(options);
res.type('svg');
    res.status(200).json({'data':captcha.data, 'text':captcha.text});
});