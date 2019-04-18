global.include=m=>require(m);

process.on("message",msg=>{
	const program=`${msg.program}; return main("${msg.parameter}");`;
	const param=msg.param;
	process.send({result:new Function(program)()});
});
