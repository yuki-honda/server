var express=require("express");
var app=express();
var bodyParser = require('body-parser'); // POST通信
var multer = require('multer'); // v1.0.5
var upload = multer(); // for parsing multipart/form-data
var child_process=require("child_process");
var fork = child_process.fork;

app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded

app.use('/edit',express.static('edit'));

//ルーティング設定
app.get('/:prog_name', function (req, res) {
	res.header('Access-Control-Allow-Origin','*');
	console.log("program exec ./prog/"+req.params.prog_name);

	//GETパラメータのパース
	Object.keys(req.query).map(function(v){
		try{
			req.query[v]=(eval(req.query[v]));
		}catch(e){
			res.send("GETパラメータの値が不正です");
			return;
		}
	});

	//実行環境を作成
	var executer=fork('executer/executer.js');
	executer.on('message',function(_res){
		res.send(_res);
		executer.kill();
	});

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
			//メイン関数呼び出しと引数の設定
			src+="\nmain("+JSON.stringify(req.query)+");";
			break;
	}

	//プログラムの実行
	switch(extension){
		case ".js":
		  executer.send(src);
			break;
	}
	console.log(src);
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
