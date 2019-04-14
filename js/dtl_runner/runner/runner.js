var $=require('jquery');
require('./dtl/lib')();
require('./dtl/Util').apply(root);
require('./dtl/Dict').apply(root);
require('./dtl/Label').apply(root);
require('./dtl/Japanese2').apply(root);

process.on("message",function(msg){
	var program=msg.program;
	process.send({result:new Function(program)()});
});
