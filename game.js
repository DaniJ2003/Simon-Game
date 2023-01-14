var buttonColours = ["red", "blue", "green", "yellow"];
var gamePattern = [];
var userClickedPattern = [];
var randomChosenColor;
var started = false;
var level = 0;

$(document).keydown(function() {
    if(!started) {
        $("body").removeClass("game-over glow");
        $(".btn").show();
        $("#level-title").text("Level "+level);
        nextSequence();
        started = true;
    }
});


$(".btn").click(function() {
    var userChosenColor = $(this).attr("id");
    userClickedPattern.push(userChosenColor);
    playSound(userChosenColor);
    animatePress(userChosenColor);
    answer(userClickedPattern.length-1);
});

function nextSequence() {
    userClickedPattern = [];
    level++; 
    $("#level-title").text("Level "+level);
    var randomNumber = Math.floor(Math.random()*4);
    randomChosenColor = buttonColours[randomNumber];
    gamePattern.push(randomChosenColor);
    $("#"+randomChosenColor).fadeIn(100).fadeOut(100).fadeIn(100);
    playSound(randomChosenColor);   
}

function playSound(name) {
    var audio = new Audio("sounds/"+name+".mp3");
    audio.play();
}

function animatePress(currentColor) {
    $("#"+currentColor).addClass("pressed");
    setTimeout(() => {
        $("#"+currentColor).removeClass("pressed");
    }, 100);
}

function startOver() {
    level = 0;
    gamePattern = [];
    started = false;
}

function answer(currentLevel) {
    if(gamePattern[currentLevel] === userClickedPattern[currentLevel]){
        console.log("success");
        if(gamePattern.length === userClickedPattern.length) {
            setTimeout(() => {
                nextSequence();
            }, 1000);
        }
    }
    else {
        console.log("Wrong"); 
        playSound("wrong");
        $("body").addClass("game-over glow");
        // setTimeout(() => {
        //     $("body").removeClass("game-over");
        // }, 750);
        $("#level-title").html("<span style='font-size: 5rem'>Game Over!</span> <br><br> <span style='font-size: 1.5rem'>Press Any Key to Restart</span>");
        $(".btn").hide();
        startOver();
    }
}
