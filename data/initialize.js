module.exports=(function(key,value){
  var fs=require("fs");
  var txt=fs.readFileSync("./data/data.txt",{encoding:'utf-8'});
  var json2obj=function(json){return JSON.parse(json);};
  var obj2json=function(obj){return JSON.stringify(obj);};
  var data=json2obj(txt);
  var save=function(obj){
    fs.writeFile("./data/data.txt",obj2json(obj));
  };
  var write=function(key,value){
    data[key]=value;
  };
  write(key,value);
  save(data);
});
