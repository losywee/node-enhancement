var http=require('http');
var fs=require('fs');
var path=require('path');

var mimeType = {
    '.js' : 'text/javascript',
    '.html' : 'text/html',
    '.css' : 'text/css'
};

var cache={};

function cacheAndDeliver(f, cb){

    if(!cache[f]) {
    fs.readFile(f,function(err, data) {
      if(!err) {
       cache[f] = {content: data};
          }
       cb(err,data);
        });
    return;
    }

  console.log('loading'+ f +'from cache');
  cb(null, cache[f].content);


};

http.createServer(function(request, response) {
    var lookup=path.basename(decodeURI(request.url)) || 'index.html';
    var f='content/' + lookup;
    fs.exists(f, function (exists) {
    console.log(exists ? lookup + "is there":lookup + "does't exist");
    if(exists) {
      cacheAndDeliver(f, function(err, data) {
        if(err) {
          response.writeHead(500);
          response.end('server Error');
          return;
           }
         var headers= {'Content-type' : mimeType[path.extname(f)]};
         response.writeHead(200, headers);
         response.end(data);

          });
return;
}
response.writeHead(404);
response.end();
});
  }).listen(8089);;

