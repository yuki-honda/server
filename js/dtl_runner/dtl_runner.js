const fs=require('fs');
const child_process=require('child_process');

const transpile=program=>
	new Promise(resolve=>{
		const prg=child_process.fork("./js/dtl_runner/transpiler/transpiler.js");
		prg.on('message',msg=>{resolve(msg.program);prg.kill();});
		prg.send({program:program});
	});

const run=program=>
	new Promise(resolve=>{
		const prg=child_process.fork("./js/dtl_runner/runner/runner.js");
		prg.on('message',msg=>{resolve(msg.result);prg.kill();});
		prg.send({program:program});
	});

module.exports=async filename=>
	new Promise(async resolve=>{
		let program=fs.readFileSync("./prog/"+filename,'utf8');
		program=await transpile(program);
		resolve(await run(program));
	});
