const child_process=require('child_process');

const transpile=program=>
	new Promise(resolve=>{
		const prg=child_process.fork("./js/dtl_runner/transpiler/transpiler.js");
		prg.on('message',msg=>{resolve(msg.program);prg.kill();});
		prg.send({program:program});
	});

const run=(program,parameter)=>
	new Promise(resolve=>{
		const prg=child_process.fork("./js/dtl_runner/runner/runner.js");
		prg.on('message',msg=>{resolve(msg.result);prg.kill();});
		prg.send({program:program,parameter:parameter});
	});

module.exports=async (program,parameter)=>
	new Promise(async resolve=>{
		program=await transpile(program);
		resolve(await run(program,parameter));
	});
