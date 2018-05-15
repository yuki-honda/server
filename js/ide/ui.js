$("#save").click(function(){
	var src=editor.getValue();
  var filename=prompt("ファイル名を入力してください","ファイル名.js");
  if(!(filename+"")["length"])return;
  if(!(filename+"").match(/\.[a-zA-Z]+$/))filename+=".js";

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
