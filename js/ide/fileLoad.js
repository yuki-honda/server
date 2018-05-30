$(function(){
  $("#load").click(function(){
    $("#loadWindowBg").show();
    $("#fileTable tbody tr").remove();
    fs.progDirFileListAsync(function(err,files){
      if(err)throw err;
      files.map(function(k){
        if(!k.match(/\.js$/))return;
        var obj={};
        obj['filename']=k;
        obj['timestamp']=fs.getAtimeSync(k);
        //var option=$("<option value=\""+k+"\">"+k+"</option>");
        //option.appendTo($("#files"));
        addToFileList(obj);
      });
    }.bind(this));
    //addToFileList({"filename":"hoge.dtl","timestamp":"---"});
    return false;
  });

  //loadWindowの切り替え
  var loadContainer=$('#loadWindowContainer');
  $("#loadWindow").addClass("loadWindow");
  loadContainer.append($('<table id="fileTable" class="table table-bordered fileTable"><thead></thead><tbody></tbody></table>'));
  var fileList=$("#fileTable tbody");
  //TODO スクロールバーの幅だけ小さくするなど？
  $("#fileTable thead").append($('<tr class="row"></tr>'));
  $("#fileTable thead tr").append($('<th class="col-xs-6 col-sm-6 col-md-6 col-lg-6">ファイル名</th><th class="col-xs-6 col-sm-6 col-md-6 col-lg-6">更新日時</th>'))

  loadContainer.append($('<button id="loadSelectBtn" class="btn btn-default loadSelectBtnNode">読み込み</button>'));
  $("#loadWindow").append(loadContainer);
  $("#loadSelectBtn").click(function(){
    var filename=findSelectFileName();
    if((filename+"").length<1)return;
    var src=fs.readFile(filename);
    editor.setValue(src);
    $("#loadWindowBg").hide();
  }.bind(this));

  var addToFileList =function(obj){
    var filename=obj['filename'];
    var timestamp=obj['timestamp']||'---';
    var tr=$('<tr class="row"></tr>');
    tr.append($('<td class="col-xs-6 col-sm-6 col-md-6 col-lg-6">'+filename+'</td>'));//class="col-xs-6" col-xs-6 col-xs-6
    tr.append($('<td class="col-xs-6 col-sm-6 col-md-6 col-lg-6">'+timestamp+'</td>'));
    tr.appendTo($("#fileTable tbody"));
    setDefault(tr);
    setClick(tr);
  };
  $("#loadWindowBg").click(function(){
    $("#loadWindowBg").hide();
    return false;
  });
  $("#loadWindow").click(function(){
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
