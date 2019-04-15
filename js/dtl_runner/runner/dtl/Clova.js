module.exports=(function(){this['clova']=this['create']();
this['clova']['content']="";
this['clova']['set']=dtlbind(this,function(str){
var self=this;var 自分=self;var _args=Array.prototype.slice.call(arguments);var _rest=Array.prototype.slice.call(arguments,1);
return this['data']=str;
});
this['clova']['get']=dtlbind(this,function(){
var self=this;var 自分=self;var _args=Array.prototype.slice.call(arguments);var _rest=Array.prototype.slice.call(arguments,0);
return this['data'];
});
this['clova']['speech']=dtlbind(this,function(str){
var self=this;var 自分=self;var _args=Array.prototype.slice.call(arguments);var _rest=Array.prototype.slice.call(arguments,1);
return this['content']=str;
});
this['addAlias']("clova","クローバー");
this['clova']['addAlias']("get","読む","聞く");
return this['clova']['addAlias']("speech","話す","言う");
});

/*
//NOGENERATOR
clova=!create.
clova:content="".
clova:set=[|str| data=str].
clova:get=[ data ].
clova:speech=[|str| content=str ].

!"clova" "クローバー" addAlias.
clova!"get" "読む" "聞く" addAlias.
clova!"speech" "話す" "言う" addAlias.
*/
