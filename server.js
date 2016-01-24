var http=require('http');
var path=require('path');


var pages= [

    {route: '', output: 'hello' },
    {route: 'about', output: 'About page'},
    {route: 'another page', output: function() {return 'here\n'+ this.route;}},
];
http.createServer(function(request, response){
    var lookup= path.basename(decodeURI(request.url));
    pages.forEach(function(page) {
    if(page.route === lookup) {
    response.writeHead(200, {'COntent-Type': 'text/html'});
    response.end(typeof page.output === 'function' ? page.output():page.output);
}

});

if(!response.finished) {
    response.writeHead(404);
    response.end('page not find');
}
    
}).listen(8088);
