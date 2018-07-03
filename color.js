var squares = document.querySelectorAll(".square")
var theTitle = document.querySelector("span");
var isCorrect = document.querySelector("#correct");
var topDiv = document.querySelector("#infoBeginning");
var easy = document.querySelector("#easy");
var hard = document.querySelector("#hard");
var pickedColor;
var easyGame = true;
sixColors = [];

setnewColorsEasy();

easy.addEventListener("click" , function(){
    easy.classList.add("easyHard");
    hard.classList.remove("easyHard");
    easyGame = true;

    //start new game with new settings
    setnewColorsEasy();    
});
hard.addEventListener("click" , function(){
    easy.classList.remove("easyHard");
    hard.classList.add("easyHard");
    easyGame = false;

    //start new game with new settings
    setnewColorsEasy();
});

function randColorEasy(){
    var color = (Math.random() * 255);
    
    return color;
}

function setnewColorsEasy(){

    if(easyGame == true){
        topDiv.style.backgroundColor = parseInt(randColorEasy());
        isCorrect.innerHTML = "";


        for (var i = 0 ; i < squares.length ; i++){
            var r = parseInt(randColorEasy());
            var g = parseInt(randColorEasy());
            var b = parseInt(randColorEasy());

            var rgb =  "rgb(" + r + ", " + g + ", "+ b + ")";

            squares[i].style.backgroundColor = rgb;
            sixColors[i] = rgb;
        }

        var answer = parseInt(Math.random() * 5);
        var selectedColor = sixColors[answer];
        theTitle.textContent = selectedColor;
        pickedColor = selectedColor;
    }
    else{
        setnewColorsHard();
    }
}

function setnewColorsHard(){

    var r = parseInt(randColorEasy());
    var minR;
    var g = parseInt(randColorEasy());
    var minG;
    var b = parseInt(randColorEasy());
    var minB;
    sixColors[0] = "rgb(" + r + ", " + g + ", "+ b + ")";

    //ensure no negative color code appear
    if(r < 75){minR = 0}
    else{minR = r-75}
    if(g<75){minG = 0}
    else{minG = g-75}
    if(b < 75){minB = 0}
    else{minB = b-75}

    for (var i = 0 ; i < 5 ; i ++){
        
        rx = parseInt( Math.random() * ((r+75) - minR) + minR );
        gx = parseInt( Math.random() * ((g+75) - (minG)) + (minG) );
        bx = parseInt( Math.random() * ((b+75) - (minB)) + (minB) );

        var rgb ="rgb(" + rx + ", " + gx + ", "+ bx + ")"; 
        sixColors[i+1] = rgb;
        squares[i].style.backgroundColor = rgb;
    }
    var answer = parseInt(Math.random() * 5);
    var selectedColor = sixColors[answer];
    theTitle.textContent = selectedColor;
    pickedColor = selectedColor;

}

//if user clicks on right blocks
function colorFound(){
    for(var i = 0 ; i < squares.length ; i ++){
        squares[i].style.backgroundColor = pickedColor;
    }
    isCorrect.innerHTML = "<strong><em>Correct !!! </em></strong>";
    topDiv.style.backgroundColor = pickedColor;
}


//event listeners for squares
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
