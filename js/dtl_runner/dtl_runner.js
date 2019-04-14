const fs=require('fs');

const transpile=program=>
	new Promise(resolve=>{
		const prg=child_process.fork("./transpiler/transpiler.js");
		prg.on('message',msg=>{prg.kill();resolve(msg.program);});
		prg.send({program:program});
	});

const run=program=>
	new Promise(resolve=>{
		const prg=child_process.fork("./runner/runner.js");
		prg.on('message',msg=>{prg.kill();resolve(msg.result);});
		prg.send({program:program});
	});

module.exports=async filename=>{
	let program=fs.readFile("../../prog/"+filename,'utf8',data=>{

	});

};
