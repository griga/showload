
const express = require('express')
// module.exports = function(config){
  var config = {};// config || {}

  // var app;
  // if(!config.app){
  //   throw new Error('invalid `showload` config. `app` option is required ')
  //   app = config.app;
  // }

  if(!config.path) {
    config.path = '/'
  }

  // if( config.path.search('^/')!= 0){
  //   throw new Error('invalid `showload` config. `path` option should start with `/` ')
  // }

  // if(!config.io && !config.server){
  //   throw new Error('invalid `showload` config. use either `socket` or server option ')
  // }

  // if(!config.io){
  //   config.io = require('socket.io').listen(config.server)
  // }

  var app = express()

  console.log('app.mountpath 1 ', app.mountpath); // /admin

  // app.get('/', function (req, res) {
  //   console.log('app.mountpath 2', app.mountpath); // /admin
  //   res.send('Admin Homepage');
  // });

  // return app
  
  app.use(config.path, express.static(__dirname + '/public'))

  // config.app.get(config.path + '/*', function(req, res) {
  //   var path = req.params[0];
  //   // Don't let them peek at /etc/passwd
  //   if (path.indexOf('..') === -1) {
  //     return res.sendfile(__dirname + '/public/' + path);
  //   } else {
  //     res.status = 404;
  //     return res.send('Not Found');
  //   }
  // });

  

  const server = require("http").Server(app);

 

  app.listen(2000, ()=>{
    console.log('http://localhost:2000')


  
  var io = require('socket.io').listen(server); 
  // app.set('io', io)
  require('./server/showload/io')(io)
  })
// }


