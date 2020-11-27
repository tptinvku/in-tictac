var http = require('http');
var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://localhost:27017/";

http.createServer(function (req, res) {
    res.writeHead(200, {'Content-Type': 'text/html'});
    res.end('Hello World!');
}).listen(8080);

MongoClient.connect(url,{ useNewUrlParser: true },function (err,db) {
    if(err) throw err;
    console.log("Database created!!! ");
    db.close();
})
