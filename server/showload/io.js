var top=require("./spawn")
var osInfo=require("./os-info")

var started = false

var settings = {
  limit: 10,
  order: '%CPU',
  speed: '1'
}

var bounds = {
  limits: [10, 20, 30, 40, 50 ],
  orders: ['%CPU', '%MEM'],
  speeds: ['.5','1','2','5','10']
}


var NAMESPACE = '/showload-socket'

module.exports = function(nsp) {

  console.log(11, NAMESPACE);
  

  // var nsp = io.of(NAMESPACE);

  nsp.on('connection', function(socket) {
    console.log('a user connected. count:', Object.keys(nsp.sockets).length);
    

    socket.emit('settings', settings)

    if(!started){
      started = top.start(settings, function(err, data){
        nsp.emit('showload', data)
      })
    }

    socket.on('config', (update)=>{
      let restart = false
      if(update.order && settings.order !== update.order && bounds.orders.indexOf(update.order) > -1){
        restart = true
        settings.order = update.order
      } 

      if(update.speed && settings.speed !== update.speed && bounds.speeds.indexOf(update.speed) > -1){
        restart = true
        settings.speed = update.speed
      } 

      if(update.limit && settings.limit !== update.limit && bounds.limits.indexOf(update.limit) > -1){
        restart = true
        settings.limit = update.limit
      } 

      if(restart){
        topStop()
        started = top.start(settings, (err, data)=>{
          nsp.emit('showload', data)
        })
        nsp.emit('settings', settings)
      }

    })

    socket.on('disconnect', function() {      
      var  count = Object.keys(nsp.sockets).length
      console.log('user disconnected. count', count);
      if(started && count == 0){
        topStop()
      }
    });

    osInfo.lscpu(function(data){               
      socket.emit('lscpu', data)
    })

  });
}

function topStop(){
  top.stop()
  started = false
}

function countCLients(nsp){
  var count = 0;
  for (var prop in nsp.sockets) {
    if (hasOwnProp.call(nsp.sockets, prop)) {
      count++;
    }
  }
}