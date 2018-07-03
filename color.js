/**
 *      BUGSS
 *  1) When user found color, continuous clicking on other boxes increases score because color matches
 *              Partially fixed. Can't score, but blocks dissapear again, no further issues
 *  2) hard mode -> cannot 'win', system doesnt go in if statement where color match
 *              Can't figure out under what circumstances bug appear
 */


var squares = document.querySelectorAll(".square")
var theTitle = document.querySelector("span");
var isCorrect = document.querySelector("#correct");
var topDiv = document.querySelector("#infoBeginning");
var topdivColor = topDiv.style.backgroundColor;
var easy = document.querySelector("#easy");
var hard = document.querySelector("#hard");
var playerScoreSpan = document.querySelector("#pScore");
var playerScore = playerScoreSpan.textContent;
var tries = 0;
var pickedColor;
var easyGame = true;
sixColors = [];

initListeners();
init();


function initListeners(){
    //event listeners on 'Easy' Button for both hover and click
    // easy.addEventListener("mouseover" , function(){
    //     easy.classList.toggle("hovering")
    // });
    easy.addEventListener("click" , function(){
        easy.classList.add("easyHard");
        hard.classList.remove("easyHard");
        easyGame = true;

        //score back to 0
        playerScoreSpan.textContent = 0;
        playerScore = 0;

        //start new game with new settings
        init();    
    });
    //same for 'Hard' Button
    // hard.addEventListener("mouseover" , function(){
    //     hard.classList.toggle("hovering")
    // });
    hard.addEventListener("click" , function(){
        easy.classList.remove("easyHard");
        hard.classList.add("easyHard");
        easyGame = false;

        //score back to 0
        playerScoreSpan.textContent = 0;
        playerScore = 0;

        //start new game with new settings
        init();
    });

    //event listeners for squares
    for(var i = 0 ; i < squares.length ; i ++){
        squares[i].addEventListener("click" , function(){
            var rgb = this.style.backgroundColor;
            if( rgb == pickedColor){
                colorFound();
            }
            else{
                this.style.backgroundColor = "rgb(0, 0, 0, 0.0)";
                isCorrect.innerHTML = "<strong><em> Try Again. </em></strong>";
                tries ++;
            }
        });
    }
}




function randColorEasy(){
    var color = (Math.random() * 255);
    
    return color;
}

//Setting new colors to each squares
// function called whenever 'easy' 'hard' or 'new game' button are pressed 
function init(){

    //topDiv.style.backgroundColor = "#F8EAB";
    isCorrect.innerHTML = "";
    tries = 0;

    if(easyGame == true){

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
    topDiv.style.backgroundColor = pickedColor;
}

function setnewColorsHard(){
    tries = 0;
    var r = parseInt(randColorEasy());
    var minR;
    var maxR;
    var g = parseInt(randColorEasy());
    var minG;
    var maxG;
    var b = parseInt(randColorEasy());
    var minB;
    var MaxB;
    sixColors[0] = "rgb(" + r + ", " + g + ", "+ b + ")";
    var answer = "rgb(" + r + ", " + g + ", "+ b + ")";

    //ensure no negative color code appear
    if(r < 75){minR = 0}
    else{minR = r-75}
    if(g<75){minG = 0}
    else{minG = g-75}
    if(b < 75){minB = 0}
    else{minB = b-75}
    //ensures no above 255
    if(r >179){maxR = 255}
    else{maxR = r+75}
    if(g >180){maxG = 255}
    else{maxG = g+75}
    if(b >180){maxb = 255}
    else{maxb = b+75}

    for (var i = 0 ; i < 5 ; i ++){
        
        rx = parseInt( Math.random() * ((maxR) - minR) + minR );
        gx = parseInt( Math.random() * ((maxR) - (minG)) + (minG) );
        bx = parseInt( Math.random() * ((maxR) - (minB)) + (minB) );

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

//line to avoid multiple point clicking on all right colors
    pickedColor = 0;

    //If the choice was this round's first, then score increases by one
    if(tries == 0){
        playerScoreSpan.textContent = ++playerScore;
    }
}




