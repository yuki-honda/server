var os = require('os');
var networkInterfaces = os.networkInterfaces();
var localAddress=getLocalAddress();
var ipv4=localAddress.ipv4[0].address;
//var alert=alert||console.log;
try{
	$(function(){
		$("#ip").text("IPアドレス:"+ipv4);
		$("#port").text("ポート番号:2021");
	});
}catch(e){
	console.log("Server running at http://"+ipv4+":2021/");
}

function getLocalAddress() {
	var ifacesObj = {}
	ifacesObj.ipv4 = [];
	ifacesObj.ipv6 = [];
	var interfaces = os.networkInterfaces();

	for (var dev in interfaces) {
		interfaces[dev].forEach(function(details){
			if (!details.internal){
				switch(details.family){
					case "IPv4":
						ifacesObj.ipv4.push({name:dev, address:details.address});
						break;
					case "IPv6":
						ifacesObj.ipv6.push({name:dev, address:details.address})
						break;
				}
			}
		});
	}
	return ifacesObj;
};

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
var inputString=function(text,init){
  var str=init;
  str=prompt(text,str);
  if(str == "" || str == null){
    alert("キャンセルしました。");
    return false;
  }
  return str;
};
