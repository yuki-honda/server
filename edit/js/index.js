var place=window.location.href.toString().match(/^https?:\/\/(?:(?:[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3})|(?:localhost))\:[0-9]{1,4}/);

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

var inputFileName=function(text,ext){
  var filename="ファイル名"+ext;
  filename=prompt(text,filename);
  if(filename == "" || filename == null){
    alert("キャンセルしました。");
    return false;
  }
  if(filename.match(/\.[a-zA-Z0-9]+$/) == null) filename+= ext;
  return filename;
};
