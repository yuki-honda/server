var $=require('jquery');
require('./runner/dtl/lib')();
require('./runner/dtl/Util').apply(root);
require('./runner/dtl/Dict').apply(root);
require('./runner/dtl/Label').apply(root);
require('./runner/dtl/Japanese2').apply(root);

process.on("message",function(msg){
	var program=msg.program;
	process.send({result:new Function(program)()});
});
