var fs=(function(){
  var _fs=require('fs');
	this._readFile=_fs.readFileSync;
  this.readFile=function(filename){
    return _fs.readFileSync("./prog/"+filename).toString();
  };
  this.writeFile=function(filename,src){
		console.log("filename:",filename);
		console.log("src:",src);
    _fs.writeFile("./prog/"+filename,src,function(err){});
  };
  this.getProgDirFileListSync=function(){
    return _fs.readdirSync("./prog/");
  };
  this.progDirFileListAsync=function(func){
    _fs.readdir("./prog/",func);
  };
	this.getAtimeSync=function(filename){
		var _atime=_fs.statSync("./prog/"+filename).atime.toString();
		var _atime_arr=_atime.split(" ");
		var atime="";
		var m=["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];
		atime+=m.indexOf(_atime_arr[1])+1+"月";
		atime+=_atime_arr[2]+"日";
		atime+=_atime_arr[4];
		return atime;
	};
  return this;
})();
