process.on("message",function(msg){
	process.send({result:"chk"});
});
