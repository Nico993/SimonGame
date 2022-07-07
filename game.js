var userClickedPattern = [];
var gamePattern = [];
var buttonColours = ["red","blue","green","yellow"];
var gameStart = false;
var level = 0;

function main(){
    //detect any key pressed
    $(document).on("keydown",function(){
        if(gameStart === false){
            gameStart = true;
            $("#level-title").text("Level " + level);
            nextSequence();
        }
    })

    //detect any button pressed
    $(".btn").on("click",function(){
        let userChosenColour = this.id;
        userClickedPattern.push(userChosenColour);
        playSound(userChosenColour);
        animatePress(userChosenColour);
        checkAnswer(userClickedPattern);
    })

    
}

function nextSequence(){
    userClickedPattern = [];
    let randomNumber = Math.floor(Math.random()*4);
    let randomChosenColour = buttonColours[randomNumber];
    gamePattern.push(randomChosenColour);

    //animate Part
    $("#" + randomChosenColour).fadeOut(100).fadeIn(100);
    playSound(randomChosenColour);
    level++;
    $("#level-title").text("Level " + level);
}


function playSound(name){
    let audio = new Audio("sounds/" + name + ".mp3");
    audio.play();
}

function animatePress(currentColour){
    $("#" + currentColour).addClass("pressed");
    setTimeout(function(){
        $("#" + currentColour).removeClass("pressed");
    },100);
}

function checkAnswer(){
    if(userClickedPattern[userClickedPattern.length - 1] === gamePattern[userClickedPattern.length - 1]){
        if(userClickedPattern.length === gamePattern.length){
            setTimeout(nextSequence,1000);
        }
    }
    else{
        let audio = new Audio("sounds/wrong.mp3");
        audio.play();
        $("body").addClass("game-over");
        setTimeout(function(){
        $("body").removeClass("game-over");
        },200);
        $("#level-title").text("Game over, Press Any Key to Restart");
        startOver()
    }
}

function startOver(){
    level = 0;
    gamePattern = [];
    gameStart = false;
}
main();