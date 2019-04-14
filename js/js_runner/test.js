process.on('message',function(msg){
	alert("chkchk");
	process.send({result:"test"});
})
