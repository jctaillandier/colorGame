var squares = document.querySelectorAll(".square")
var theTitle = document.querySelector("span");
var isCorrect = document.querySelector("#correct");
var topDiv = document.querySelector("#infoBeginning")
var pickedColor;
sixColors = [];

setnewColors();

function randColor(){
    var color = (Math.random() * 255);
    
    return color;
}

function setnewColors(){
    topDiv.style.backgroundColor = parseInt(randColor());
    isCorrect.innerHTML = "";


    for (var i = 0 ; i < squares.length ; i++){
        var r = parseInt(randColor());
        var g = parseInt(randColor());
        var b = parseInt(randColor());

        var rgb =  "rgb(" + r + ", " + g + ", "+ b + ")";

        squares[i].style.backgroundColor = rgb;
        sixColors[i] = rgb;
    }

    var answer = parseInt(Math.random() * 5);
    var selectedColor = sixColors[answer];
    theTitle.textContent = selectedColor;
    pickedColor = selectedColor;
}

function colorFound(){
    for(var i = 0 ; i < squares.length ; i ++){
        squares[i].style.backgroundColor = pickedColor;
    }
    isCorrect.innerHTML = "<strong><em>Correct !!! </em></strong>";
    topDiv.style.backgroundColor = pickedColor;
}

for(var i = 0 ; i < squares.length ; i ++){
    squares[i].addEventListener("click" , function(){
        var rgb = this.style.backgroundColor;
        if( rgb == pickedColor){
            colorFound();
        }
        else{
            this.style.backgroundColor = "rgb(0, 0, 0, 0.0)";
        }
    });
}
