const clova = require('@line/clova-cek-sdk-nodejs')
const express = require('express')
var app=express();
var bodyParser = require('body-parser'); // POST通信
var multer = require('multer'); // v1.0.5
var upload = multer(); // for parsing multipart/form-data
var child_process=require("child_process");
var fork = child_process.fork;
var opener=require('opener');
 
app.use('/edit',express.static('edit'));

// var applicationId="who.honda.myservice";
// var serif='誰について教えてほしいんだい？';
// var slotName="whoIntent";

// var speechText=child_process.execFileSync("node",["./prog/clova.js","honda"]);
// console.log(speechText);

$("#on").click(function(){
	var serif=$("#serif").val();
	var applicationid=$("#applicationid").val();
	var slotName=$("#slotName").val();
	clova_up(applicationid,serif,slotName);
});

$("#edit").click(function(){opener(window.url+"/edit");});

function clova_up(applicationId,serif,slotName){
	console.log("hey");
	console.log(arguments);
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
			// console.log(arguments);
			const intent = responseHelper.getIntentName()
			const sessionId = responseHelper.getSessionId()
	 
			let speechText = ''
			// switch (intent) {
			//   case slotName:
			const slots = responseHelper.getSlots()
			const eventName = slots[slotName];

			speechText = await (function(){
				return new Promise(function(resolve){
					var prg=child_process.fork("./prog/clova.js");
					prg.on('message',function(msg){resolve(msg.message);});
					prg.send({message:eventName})
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
	const clovaMiddleware = clova.Middleware({ applicationId: applicationId })
	app.post('/clova', clovaMiddleware, clovaSkillHandler)
}
// clova_up(applicationId,serif,slotName);

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
