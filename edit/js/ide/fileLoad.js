$(function(){
	// $("#load").click(function(){
  //   fs.readFileAsync("clova.js",function(data){
	//     var src=data.toString();
	//     editor.setValue(src.split("//auto_add;")[0]);
	//   });
	// });
	$("#load").click(function(){
		$("#saveWindowBg").show();
		$("#fileTable tbody tr").remove();
		fs.progDirFileListAsync(function(err,files){
			if(err)throw err;
			files.map(function(k){
				var filename=k[0];
				var timestamp=k[1];
				if(!filename.match(/\.js$/))return;
				var obj={};
				obj['filename']=filename;
				obj['timestamp']=timestamp||"---";
				//var option=$("<option value=\""+k+"\">"+k+"</option>");
				//option.appendTo($("#files"));
				addToFileList(obj);
			});
		}.bind(this));
		//addToFileList({"filename":"hoge.dtl","timestamp":"---"});
		return false;
	});

	//saveWindowの切り替え
	var loadContainer=$('#saveWindowContainer');
	$("#saveWindow").addClass("saveWindow");
	loadContainer.append($('<table id="fileTable" class="table table-bordered fileTable"><thead></thead><tbody></tbody></table>'));
	var fileList=$("#fileTable tbody");
	$("#fileTable thead").append($('<tr class="row"><th class="col-xs-6">ファイル名</th><th class="col-xs-6">更新日時</th></tr>'));

	
	loadContainer.append($('<button id="loadSelectBtn" class="btn btn-default loadSelectBtnNode">読み込み</button>'));
	$("#saveWindow").append(loadContainer);
	$("#loadSelectBtn").click(function(){
		var filename=findSelectFileName();
		if((filename+"").length<1)return;

		fs.readFileAsync(filename,function(data){
			editor.setValue(data.toString());
		});
		$("#saveWindowBg").hide();
	}.bind(this));

	var addToFileList =function(obj){
		var filename=obj['filename'];
		var timestamp=obj['timestamp']||'---';
		var tr=$("<tr class=\"row\"></tr>");
		tr.append($("<td class=\"col-xs-6\">"+filename+"</td>"));
		tr.append($("<td class=\"col-xs-6\">"+timestamp+"</td>"));
		tr.appendTo($("#fileTable tbody"));
		setDefault(tr);
		setClick(tr);
	};
	$("#saveWindowBg").click(function(){
		$("#saveWindowBg").hide();
		return false;
	});
	$("#saveWindow").click(function(){
		event.stopPropagation();
	});

	function setDefault(file){
		file.css("background-color","#FFFFFF");
		file.mouseover(function(){
			$(this).css("background-color","#CCFFCC") .css("cursor","pointer")
		});
		file.mouseout(function(){
			$(this).css("background-color","#FFFFFF").css("cursor","normal")
		});
	}

	function setClick(file){
		file.click(function(){
			setDefault($("#fileTable tbody tr"));
			$(this).css("background-color","yellow");
			$(this).mouseover(function(){
				$(this).css("background-color","yellow") .css("cursor","pointer")
			});
			$(this).mouseout(function(){
				$(this).css("background-color","yellow").css("cursor","normal")
			});
		});
	}
	function findSelectFileName(){
		var res;
		$("#fileTable tbody").children("tr").map(function(k,v){
			if($(v).css("background-color")=="rgb(255, 255, 0)")
			res=$($(v).children("td")[0]).text();
		});
		return res;
	}
});

