var $=require('jquery');
require('./dtl/lib')();
require('./dtl/Util').apply(root);
require('./dtl/Dict').apply(root);
require('./dtl/Label').apply(root);
require('./dtl/Clova').apply(root);
require('./dtl/Japanese2').apply(root);

process.on("message",function(msg){
	root["clova"]["set"](msg.parameter);
	var program=msg.program;
	new Function(program)();
	process.send({result:root["clova"]["content"]});
});
