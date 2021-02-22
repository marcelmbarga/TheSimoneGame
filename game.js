
var buttonColours = ["red", "blue", "green", "yellow"];
var gamePattern = [];
var userClickedPattern = [];
var level = 0;
var started = false;
function nextSequence() {
    userClickedPattern=[];
    var randomNumber = Math.floor(4*Math.random()) ;
    var randomChosenColour = buttonColours[randomNumber];
    gamePattern.push(randomChosenColour);
    $("#" + randomChosenColour).fadeOut(100).fadeIn(100).fadeOut(100).fadeIn(100);
    playSound(randomChosenColour);
    level++;
    $('h1').text('Level ' + level);
}    

$(document).keypress(function(){
    if (!started) {
        $('h1').text('Level 0');
        nextSequence();
        started = true;
    }
})

$('.btn').click(function() {
    var userChosenColour = $(this).attr('id');
    userClickedPattern.push(userChosenColour);
    playSound(userChosenColour);
    animatePress(userChosenColour);
    checkAnswer(userClickedPattern.length - 1);
    console.log('user ' + userClickedPattern);
    console.log('game1 ' + gamePattern);
})

function checkAnswer(currentLevel) {
    // nextSequence();
    console.log('game2 ' + gamePattern);
    if (userClickedPattern[currentLevel] === gamePattern[currentLevel]) {
        console.log('succes');
        if ( userClickedPattern.length == gamePattern.length) {
            setTimeout(function(){ nextSequence() }, 1000);
        }
    } else {
        console.log('wrong');
        var wrong = new Audio("sounds/wrong.mp3");
        wrong.play();
        $('h1').text('Game Over, Press Any Key to Restart')
        $('body').addClass('game-over');
        setTimeout(function(){ 
        $('body').removeClass('game-over');
        }, 200);
        startOver();
    }
}

function startOver() {
    level = 0;
    gamePattern = [];
    started = false;

}

function animatePress(currentColour) {
    $("#" + currentColour).addClass('pressed');
    setTimeout(function(){ 
        $("#" + currentColour).removeClass('pressed');
     }, 100);
}

function playSound(key) {
    switch (key) {
        case "red":
        var red = new Audio("sounds/red.mp3");
        red.play();
        break;
        case "green":
        var green = new Audio("sounds/green.mp3");
        green.play();
        break;
        case "blue":
        var blue = new Audio("sounds/blue.mp3");
        blue.play();
        break;
        case "yellow":
        var yellow = new Audio("sounds/yellow.mp3");
        yellow.play();
        break;
    
        default:
    }
};