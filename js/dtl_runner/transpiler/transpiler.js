const MinimalParser=require('./transpiler/minimal');

process.on("message",function(msg){
	let program = msg.program;
	program = MinimalParser.parse(program);
	process.send({program:program});
});
