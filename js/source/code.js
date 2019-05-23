
var RootNode = new Nodo(null, "Root");
var EtccNode = new Nodo(this.RootNode, "Root");
var currentNode;


var myObj;
var fileName;

var loadDsv = d3.dsv(",", "text/plain;charset=ANSI");

this.generateJSON();

function generateJSON(){

  this.loadDsv("data/code.analysis.csv", function (data) {

    data.forEach(element => {
  
  
      let content = element['Path;Traductions'].toString();
      let allContent = content.split(";");
      let valueArray = allContent[1];
      let contentArray = allContent[0].split(".");
      this.EtccNode.expandNodo(contentArray, valueArray);
  
    });
  
  
    let result = this.EtccNode.getArrayNames();
    //Correct fromat of json
    result = result.slice(0, -1);
    result += "}";
    //Final Result
    var finalResult = "{" + result;
  
    try {
      this.myObj = JSON.parse(finalResult);
      var objStr = JSON.stringify(this.myObj, undefined, 4);
      document.getElementById("MiID").innerHTML = objStr;
  
    } catch (e) {
      
      document.getElementById("MiID").innerHTML = " \n ERROR: " + e.toString();
  
    }
  
  });

}

function downloadObjectAsJson(){
  var dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(this.myObj));
  var downloadAnchorNode = document.createElement('a');
  downloadAnchorNode.setAttribute("href",     dataStr);
  downloadAnchorNode.setAttribute("download", this.fileName + ".json");
  document.body.appendChild(downloadAnchorNode); 
  downloadAnchorNode.click();
  downloadAnchorNode.remove();
}

function UpdateName(){
  let input = document.getElementById("Name");
  this.fileName = input.value;
}

function UpdateRootName(){
  let input = document.getElementById("RootName");
  this.EtccNode = new Nodo(this.RootNode, input.value);
}
