var fs=(function(){
  this.readFile=function(filename){
    //return _fs.readFileSync("./prog/"+filename).toString();
  };
	this.readFileAsync=function(filename,func){
		// $.get(place+"/file/read?filename=clova.js"[>+filename<],function(data){
		$.get(place+"/file/read?filename="+filename,function(data){
			func(data);
		});
	};
  this.writeFile=function(filename,src){
    //_fs.writeFile("./prog/"+filename,src);
		$.post(place+"/file/write",{
			"filename":filename,
			// "filename":"clova.js",//filename,
			"src":src
		});
  };
  this.getProgDirFileListSync=function(){
    //return _fs.readdirSync("./prog/");
  };
  this.progDirFileListAsync=function(func){
		var arr;
    $.get(place+"/file/list",function(data){
			arr=data.split("\n");
			arr=arr.map(function(e){return e.split(",");});
			func("",arr);
		});
  };
  return this;
})();
