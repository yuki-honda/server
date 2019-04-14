const child_process=require('child_process');

const run=(program,parameter)=>
	new Promise(resolve=>{
		let prg;
		try{
		prg=child_process.fork("./js/js_runner/runner/runner.js");
		}catch(e){alert(e);}
		prg.on('message',msg=>{resolve(msg.result);prg.kill();});
		prg.send({program:program,parameter:parameter});
	});

module.exports=async (program,param)=>
	new Promise(async resolve=>resolve(await run(program,param)));
