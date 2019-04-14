process.on("message",function(msg){
	const program=`${msg.program}; return main("${msg.parameter}");`;
	const param=msg.param;
	process.send({result:new Function(program)()});
});
