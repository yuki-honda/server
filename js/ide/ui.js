$(function(){
	$("#save").click(function(){
		var src=editor.getValue();
	  var filename=inputFileName("ファイル名を入力してください",".js");
	  if(filename===false)return;

	  fs.writeFile(filename,src);
	  //var list=$("#files").childen();
	  //list.map(function(k){console.log(k);});
	  var filesList=$("#files").children();
	  var filenameList=[];
	});

	$("#fontsize").click(function(){
	  var size=prompt("フォントサイズ",editor.getFontSize());
	  editor.setFontSize(size);
	});

	var init=require("./data/initialize");
	$("#dataInit").click(function(){
		var key=inputString("初期設定したいデータの名前を入力してください","");
	  if(key===false)return;
		var value=inputString("初期設定する値を入力してください","");
	  if(value===false)return;
		try{
			value=eval(value);
		}catch(e){
			alert("不正な値です。");
			return;
		}
		init(key,value);
	});
});
