var http= require('http');
var contents= require('fs').readFileSync('form.html');
var querystring= require('querystring');
var util= require('util');

var maxData= 2*1024*1024;

http.createServer(function(request, response){

    if (request.method === 'GET') {

     response.writeHead(200, {'content-type':'text/html'});
     response.end(contents);
    }
   if(request.method === 'POST') {
    var postData='';
    
    request.on('data', function(chunck){
    postData += chunck;
    if(postData.length > maxData ) {
    postData = '';
    this.destory();
    response.writeHead(413);
    response.end('Too large.');

      }
    

}).on('end', function() {
var postDataObject =querystring.parse(postData);
console.log('user posted:\n' + postData);
console.log('you posted:\n' + postData);
response.end('you posted: \n' + util.inspect(postDataObject));
}
);
}

}).listen(8089);
