$(function(){
  editor = CodeMirror.fromTextArea(document.getElementById("editor"), {
    lineNumbers: true,
    lineWrapping: true,
    indentUnit: 4,
    tabSize: 4,
    indentWithTabs: true,
    mode: "javascript"
  });
  $(".CodeMirror").css("font-size",18);
  editor.setOption("extraKeys",{
    "Cmd-Up":function(){
      var size=parseInt($(".CodeMirror").css("font-size"));
      $(".CodeMirror").css("font-size",size+1);
      editor.refresh();
    },
    "Cmd-Down":function(){
      var size=parseInt($(".CodeMirror").css("font-size"));
      $(".CodeMirror").css("font-size",size-1);
      editor.refresh();
    },
    "F5":function(){
      $("#run").click();
    },
  });
  editor.setFontSize=function(size){
    $(".CodeMirror").css("font-size",size);
    editor.refresh();
    return this;
  };
  editor.getFontSize=function(){
    return parseInt($(".CodeMirror").css("font-size"));
  }
});
