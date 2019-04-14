const clova = require('@line/clova-cek-sdk-nodejs')
const express = require('express')
const app=express();
const bodyParser = require('body-parser'); // POST通信
const multer = require('multer'); // v1.0.5
const upload = multer(); // for parsing multipart/form-data
const child_process=require("child_process");
const opener=require('opener');

const dtl_runner=require("./js/dtl_runner/dtl_runner.js");
 
app.use('/edit',express.static('edit'));


$("#on").click(()=>{
	// var serif=$("#serif").val();
	// var id=$("#id").val();
	// var slotName=$("#slotName").val();
	// clova_up(id,serif,slotName);
	clova_up("fortune","a","dateSlot");
	// (async ()=>{
	//   let program=fs.readFile("test.dtl");
	//   program=await (()=>new Promise(resolve=>{
	//     const prg=child_process.fork("./js/dtl_runner/transpiler.js");
	//     prg.on('message',msg=>{prg.kill();resolve(msg.program);});
	//     prg.send({program:program});
	//   }))();
	//   const result=await (()=>new Promise(resolve=>{
	//     const prg=child_process.fork("./js/dtl_runner/runner.js");
	//     prg.on('message',msg=>{prg.kill();resolve(msg.result);});
	//     prg.send({program:program});
	//   }))();
	//   console.log(program);
	//   console.log(result);
	// })();
});

$("#edit").click(()=>opener(window.url+"/edit"));

function clova_up(id,serif,slotName){
	// console.log(arguments);
	const clovaSkillHandler = clova.Client
		.configureSkill()
		.onLaunchRequest(responseHelper => {
			responseHelper.setSimpleSpeech({
				lang: 'ja',
				type: 'PlainText',
				value: serif,
			})
		})
		.onIntentRequest(async responseHelper => {
			const intent = responseHelper.getIntentName()
			const sessionId = responseHelper.getSessionId()
	 
			let speechText = ''
			const slots = responseHelper.getSlots()
			const eventName = slots[slotName];

			speechText = await (()=>{
				return new Promise(async resolve=>{
					const progDirFileList=fs.getProgDirFileListSync();
					const file=progDirFileList.filter(
						fn=>fn.split("/").shift().split(".")[0].match(RegExp("^"+id+"$"))
					)[0];
					console.log(file.match(/\..+$/)[0]);
					switch(file.match(/\..+$/)[0]){
						case '.js':
							const prg=child_process.fork("./prog/"+id+".js");
							prg.on('message',msg=>resolve(msg.message));
							prg.send({message:eventName})
							break;
						case '.dtl':
							// let program=fs.readFile(id+".dtl");
							// console.log(program);
							// program=await (()=>new Promise(resolve=>{
							//   const prg=child_process.fork("./js/dtl_runner/transpiler.js");
							//   prg.on('message',msg=>{prg.kill();resolve(msg.program);});
							//   prg.send({program:program});
							// }))();
							// console.log(program);
							// const result=await (()=>new Promise(resolve=>{
							//   const prg=child_process.fork("./js/dtl_runner/runner.js");
							//   prg.on('message',msg=>{prg.kill();resolve(msg.result);});
							//   prg.send({program:program});
							// }))();
							// console.log(program);
							const result=await dtl_runner(id+".dtl");
							resolve(result);
							break;
					}
				});
			})();
			responseHelper.setSimpleSpeech(
				clova.SpeechBuilder.createSpeechText(speechText)
			)
			responseHelper.endSession()
		})
		.onSessionEndedRequest(responseHelper => {
			const sessionId = responseHelper.getSessionId()
			// Do something on session end
		})
		.handle()
	const clovaMiddleware = clova.Middleware({ applicationId: id+".honda.myservice" })
	app.post('/'+id, clovaMiddleware, clovaSkillHandler)
}

//ファイル名の一覧を取得
app.get('/file/list',function(req,res){
	res.header('Access-Control-Allow-Origin','*');
	console.log('filelist');
	var data=fs.getProgDirFileListSync().toString();
	data=data.split(",");
	data=data.filter(function(e){return e.match(/.js$/);});
	data=data.map(function(e){
		var atime=fs.getAtimeSync(e);
		return e+","+atime;
	});
	res.send(data.join("\n"));
});
//ファイルの中身を取得
app.get('/file/read',function(req,res){
	res.header('Access-Control-Allow-Origin','*');
	params=req.query;
	console.log("fileread "+params["filename"]);
	if(params["filename"])res.send(fs.readFile(params["filename"]));
});

app.use(bodyParser.urlencoded({ extended: false })); // for parsing application/x-www-form-urlencoded

//ファイルの書き込み
app.post('/file/write',bodyParser.json(),function(req,res){
	res.header('Access-Control-Allow-Origin','*');
	fs.writeFile(req.body["filename"],req.body["src"]);
	res.send("no return");
});

app.listen(2021, () => console.log(`Server running on 2021`))

// const ngrok = require('ngrok');

// connectNgrok().then(url => {
//     console.log('URL : ' + url);
// });

// // ngrokを非同期で起動
// async function connectNgrok() {
//     let url = await ngrok.connect({addr:2021});
//     return url;
// }
