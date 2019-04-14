const MinimalParser=require('./minimal');
const fs=require('fs');

process.on("message",function(msg){
	let program = msg.program;
	program = MinimalParser.parse(program);
	process.send({program:program});
});
