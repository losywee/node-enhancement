var EventEmitter= require('events');
var util= require('util');


function MyThing() {
  EventEmitter.call(this);
  doFristThing();
  this.emit('thing1');

}

util.inherits(MyThing, EventEmitter);

var mt = new MyThing();
mt.on('thing1', function onThing1(){
console.log('Thing1 occur!');
});
