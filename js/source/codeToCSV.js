
var EtccNode = new Nodo(null, "Root");
var currentNode;


var myObj;
var MyJSON;
var fileName;
var errorFiles = new Array();

this.generateCSV();

function generateCSV() {

  d3.json("/data/JSONAnalysis.json", function (data) {

    if (data.includes("<") || data.includes("#")) {
      if (data.includes("img")) {
        data = data.substring(0, data.length - 1).substr(1);
      }
      this.errorFiles.push(data);
      data = "INVALID_CHARACTER_" + this.errorFiles.length.toString();
    }

    this.myObj = data;
    this.MyJSON = "Path;Traductions\r\n";

    this.MyJSON += Nodo.generarNodosFromJson(data);

  });

}

function downloadObjectAsCSV() {
  var dataStr = "data:text/csv;charset=utf-8,%EF%BB%BF" + this.MyJSON;
  var downloadAnchorNode = document.createElement('a');
  downloadAnchorNode.setAttribute("href", dataStr);
  downloadAnchorNode.setAttribute("download", this.fileName + ".csv");
  document.body.appendChild(downloadAnchorNode);
  downloadAnchorNode.click();
  downloadAnchorNode.remove();
}

function UpdateName() {
  let input = document.getElementById("Name");
  this.fileName = input.value;
}

function UpdateRootName() {
  let input = document.getElementById("RootName");
  this.EtccNode = new Nodo(this.RootNode, input.value);
}
