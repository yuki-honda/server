var express=require("express");
var app=express();
var bodyParser = require('body-parser');
var multer = require('multer'); // v1.0.5
var upload = multer(); // for parsing multipart/form-data

app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded

app.use('/edit',express.static('edit'));
// app.use('/dtl',express.static('djs'));

// app.get('/test2',function(req,res){
// 	res.header('Access-Control-Allow-Origin','*');
// 	res.send("bbb"+(req.query.test));
// });
// app.get('/test',function(req,res){
// 	res.header('Access-Control-Allow-Origin','*');
// 	res.redirect("/test2?test=hogehoge");
// });
//ルーティング設定
app.get('/:prog_name', function (req, res) {
  //res.send('Hello World');
	res.header('Access-Control-Allow-Origin','*');
	console.log("program exec ./prog/"+req.params.prog_name);

	//拡張子の取得
	var filename=req.params.prog_name;
	var extension=filename.match(/\.[^.]+$/)+"";

	//ファイルの取得
	var data=fs.readFile(filename);

	//プログラムの取得
	var src;
	switch(extension){
		case ".js":
			src=data.toString();
			break;
	}

	//プログラムの実行
	switch(extension){
		case ".js":
			var func=new Function(src);
			func.call(this);
			break;
	}
	// res.send("chk2");
	// ret="no return";
	// //GETパラメータが入る
	// params=req.query;
	// res.send(ret.toString());


	/*test--*/
	/*
	window.t=window.t||{};
	//戻り値はretに入れる
	window.t.ret="no return";
	var f=new Function(src+"\nreturn this;");
	window.t=f.call(window.t);
	window.t.ret.send(window.t.ret.toString());
	*/
	/*--test*/
	//}
});


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
//ファイルの書き込み
app.post('/file/write',upload.array(),function(req,res){
	res.header('Access-Control-Allow-Origin','*');
	console.log("filewrite "+req.body["filename"]);
	fs.writeFile(req.body["filename"],req.body["src"]);
	res.send("no return");
});

app.listen(2021);
