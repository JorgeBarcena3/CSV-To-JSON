
var EtccNode = new Nodo(null, "Root");
var currentNode;


var myObj;
var objStr;
var fileName;
var errorFiles = new Array();

var loadDsv = d3.dsv(",", "text/plain;charset=ANSI");

this.generateJSON();

function generateJSON() {

  this.loadDsv("data/code.analysis.csv", function (data) {

    data.forEach(element => {


      let content = element['Path;Traductions'].toString();

      let allContent = content.split(";");
      let valueArray = allContent[1];
      let contentArray = allContent[0].split(".");
      if (valueArray.includes("<") || valueArray.includes("#")) {
        if (valueArray.includes("img")) {
          valueArray = valueArray.substring(0, valueArray.length - 1).substr(1);
        }
        this.errorFiles.push(valueArray);
        valueArray = "INVALID_CHARACTER_" + this.errorFiles.length.toString();
      }
      this.EtccNode.expandNodo(contentArray, valueArray);

    });


    let result = this.EtccNode.getArrayNames();
    //Correct fromat of json
    // result = result.slice(0, -1);
    result += "}";
    //Final Result
    var finalResult = "{" + result;

    try {
      this.myObj = JSON.parse(finalResult);
      this.objStr = JSON.stringify(this.myObj, undefined, 4);

      this.objStr = this.replaceInvalidChar(this.objStr);

      document.getElementById("MiID").innerHTML = objStr;

    } catch (e) {

      document.getElementById("MiID").innerHTML = " \n ERROR: " + e.toString();

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
  var dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(this.myObj));
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
