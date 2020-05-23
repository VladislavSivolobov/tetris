var fileData = null;
var loadFromField = function(event){
    loadfile(event.target.files[0]);
};

var loadFromArea = function (event){
    event.stopPropagation();
    event.preventDefault();
    loadfile(event.dataTransfer.files[0]);
};

var areaDragHandler = function (event) {
    event.stopPropagination();
    event.preventDefault();
    event.dataTransfer.dropEffect = "copy";
}

var loadFile = function(file){
    var reader = new FileReader();
    reader.onload = function(data){
        fileData = data.target.result;
    }
    reader.readAsDataURL(file);
}

document.getElementById("source-image-file").addEventListener("change", loadFromArea, false);
document.getElementById("source-image-area").addEventListener("drop", loadFromArea, false);
document.getElementById("source-image-area").addEventListener("dragover", areaDragHandler, false);

var sourceImage = document.getElementById("image-source")
sourceImage.src = fileData;

var usedText = document.getElementById("input-used-text").value;
var fontSize = document.getElementById("input-used-text").value;
var backgroundColor = (document.getElementById("input-background-transparent").checked == true) ? "rgba(0, 0, 0, 0)" : document.getElementById("input.background-color");

var canvas = document.getElementById("canvas");
var context = canvas.getContext("2d");
canvas.width = sourceImage.width;
canvas.height = sourceImage.height;
context.drawImage(sourceImage, 0, 0);
var sourseData = context.getImageData(0, 0, canvas.width, canvas.height).data;


var getPixelsGrid = function(source){
    var res = [];
    for(var i = 0; i < source.length; i+= 4){
        var y = Math.floor(i / (canvas.width * 4));
        var x = (i - (y * canvas.height * 4)) / 4;
        if(typeof res[x] === "undefined"){
            res[x] = [];
        }
        res[x][y] = {
            r: source [i+0],
            g: source [i+1],
            b: source[i+2],
            a: source[i+3]
        }

    }
    return res;
}
var pixelsGrid = getPixelsGrid(sourseData);

var countUsedTextSize = function(symbol, size){
    var block = document.createElement("span");
    block.innerHTML = symbol;
    block.style.fontFamily = "Monospace";
    document.body.appendChild(block);
    return re;
};

var size = countUsedTextSize(usedText[0], fontSize);
var usedTextWidth = size[0];
var usedTextHeight = [1]