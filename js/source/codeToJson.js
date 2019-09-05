
var EtccNode = new Nodo(null, "Root");
var currentNode;


var myObj;
var objStr;
var fileName;
var errorFiles = new Array();
var finalResult = '';

var NUMERO_PAISES = 10;
var STRINGTODELIMIT = 'Path;English;Spanish;Dutch;French;Italian;Swedish;Portuguese;German;Polish;Danish';
var charToDelimite = '^';
var loadDsv = d3.dsv(charToDelimite, "text/plain;charset=ANSI");

this.generateJSON();

function generateJSON() {

  this.loadDsv("data/code.analysis.csv", function (data) {

    let nameOfCountries = STRINGTODELIMIT.split(";");

    for (let i = 0; i < NUMERO_PAISES; i++) {

      let name = nameOfCountries[i + 1];

      data.forEach(element => {

        let content = element[STRINGTODELIMIT].toString();
        let allContent = content.split(";");
        let valueArray = allContent[i + 1];
        let contentArray = allContent[0].split(".");

        if (valueArray.includes("<") || valueArray.includes("#") || valueArray.includes("-") || valueArray.includes("ø") || valueArray.includes("æ")) {
          if (valueArray.includes("img")) {
            valueArray = valueArray.replace('\"', "");
          }
          this.errorFiles.push(valueArray);
          valueArray = "INVALID_CHARACTER_" + this.errorFiles.length.toString();
        }
        this.EtccNode.expandNodo(contentArray, valueArray);

      });

      let result = this.EtccNode.getArrayNames();
      //Correct format of json
      let formatName = '';
      if (i == 0)
        formatName = '"' + name + '":'
      else
        formatName = ', "' + name + '":'

      result = formatName + '{' + result + "}";

      //Final Result
      finalResult += result;

    }

    finalResult = "{" + finalResult + "}";

    try {
      this.myObj = JSON.parse(finalResult);
      this.objStr = JSON.stringify(this.myObj, undefined, 4);

      this.objStr = this.replaceInvalidChar(this.objStr);

      document.getElementById("MiID").innerHTML = "OJO TENER CUIDADO CON LAS ETIQUETAS <IMG... Y LOS PUNTOS EN LOS LABELS\n" + objStr;

    } catch (e) {

      //document.getElementById("MiID").innerHTML = " \n ERROR: " + e.toString();

    }

  });



}

function replaceInvalidChar(str) {

  for (let i = 0; i < this.errorFiles.length; i++) {
    let errorName = "INVALID_CHARACTER_" + (i + 1).toString();
    var search = str.search(errorName);
    str = str.replace(errorName, this.errorFiles[i]);
  }

  return str;

}

function downloadObjectAsJson() {
  var dataStr = "data:text/json;charset=utf-8," + objStr;
  // dataStr = this.replaceInvalidChar(dataStr);
  var downloadAnchorNode = document.createElement('a');
  downloadAnchorNode.setAttribute("href", dataStr);
  downloadAnchorNode.setAttribute("download", this.fileName + ".json");
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
