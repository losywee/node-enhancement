var http = require('http');
var fs= require(fs);

var options= {}

options.file= '50meg';
options.fileSize= fs.statSync(options.file).size;
options.kbps= 32;

http.createServer(function(request, response){

  var download= Object.create(options);
  download.chunks= new Buffer(download.fileSize);
  download.bufferOffset= 0;
  response.writeHead(200, {'Content-type': options.fileSize});
  fs.createReadStream(options.file).on('data', function(chunck) {
    chunck.copy(download.chunks, download.bufferOffset);
    download.bufferOffset += chunk.length;

}).once('open', function(){

});

}).listen(8089);
