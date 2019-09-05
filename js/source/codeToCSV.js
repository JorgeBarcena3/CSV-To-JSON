
var EtccNode = new Nodo(null, "Root");
var currentNode;

var NUMERO_PAISES = 10;
var STRINGTODELIMIT = 'Path;English;Spanish;Dutch;French;Italian;Swedish;Portuguese;German;Polish;Danish';

var myObj;
var MyJSON;
var fileName;
var errorFiles = new Array();
var valuesJSON = "";

this.generateCSV();

function generateCSV() {


  d3.json("data/JSONAnalysis.json").then(function (data) {

    this.myObj = data;
    this.MyJSON = "Path;Traductions\r\n";

    this.MyJSON += Nodo.generarNodosFromJson(data);
    let allContent = this.MyJSON.split("\n");

    allContent.forEach(function (data) {

      let values = data.split(";");
      if (values[0] != 'Path')
        this.valuesJSON += values[1] + "\n";

    });

    document.getElementById("MiID").innerHTML = this.valuesJSON;


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
