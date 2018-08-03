module.exports=new (function(){
  var fs=require("fs");
  var txt=fs.readFileSync("./data/data.txt",{encoding:'utf-8'});
  var json2obj=function(json){return JSON.parse(json);};
  var obj2json=function(obj){return JSON.stringify(obj);};
  var data=json2obj(txt);
  this.look=function(){
    return txt;
  };
  var save=function(obj){
    fs.writeFile("./data/data.txt",obj2json(obj));
  };
  this.read=function(key){return data[key]};
  this.write=function(key,value){
    data[key]=value;
    save(data);
  };
  this.push=function(key,value){
    if(Array.isArray(data[key])){
      data[key].push(value);
      save(data);
    }
  };
})();
