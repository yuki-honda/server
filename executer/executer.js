var express=require("express");
var app=express();

var IO=require("../data/IO");
var read=IO.read;
var write=IO.write;
var push=IO.push;

var fs=require("fs");
var log=function(data){
  fs.writeFile("./executer/test.txt",data);
};

process.on('message',function (msg) {
  console.log('executer');
  var ret=eval(msg)||"empty";
  process.send(JSON.stringify(ret));
});
