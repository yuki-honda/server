const child_process=require('child_process');

const run=(program,parameter)=>
	new Promise(resolve=>{
		console.log("program:",program);
		console.log(`parameter:${parameter}`);
		const	prg=child_process.fork("./js/js_runner/runner/runner.js");
		prg.on('message',msg=>{resolve(msg.result);prg.kill();});
		prg.send({program:program,parameter:parameter});
	});

module.exports=async (program,param)=>
	new Promise(async resolve=>resolve(await run(program,param)));
