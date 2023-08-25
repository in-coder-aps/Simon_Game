let gamePattern=[];
let userClickedPattern=[];
const buttonColours=["red","blue","green","yellow"];

let level=0;
let started=false;

$(document).keypress(function(){
  if(!started){
    nextSequence();
    started=true;
  }
});

$(".btn").click(function(){
  let userChosenColour=$(this).attr("id");
  userClickedPattern.push(userChosenColour);
  playSound(userChosenColour);
  animatePress(userChosenColour);
  checkAnswer(userClickedPattern.length-1);
});


function checkAnswer(curIndex){
  if(gamePattern[curIndex]==userClickedPattern[curIndex])
    {
      if(userClickedPattern.length===gamePattern.length)
      {
        setTimeout(function(){
          nextSequence();
        },1000);
      }
    }
  else{
    playSound("wrong");
    $("body").addClass("game-over");
    $("#level-title").text("Game Over, Press Any Key to Restart");
    setTimeout(function(){
      $("body").removeClass("game-over");
    },200);
    startOver();
  }
}
function startOver(){
  level=0;
  started=false;
  gamePattern=[];
}
function nextSequence(){
    userClickedPattern=[];
    level++;
    $("#level-title").text("Level "+level);

    const randomNumber=Math.floor(Math.random()*4);
    let randomChosenColour=buttonColours[randomNumber];
    gamePattern.push(randomChosenColour);

    $("#"+randomChosenColour).fadeOut(100).fadeIn(100).fadeOut(100).fadeIn(100);
    playSound(randomChosenColour);
}

function playSound(buttonName){
    var audio = new Audio("./sounds/"+buttonName+".mp3");
    audio.play();
}

function animatePress(buttonName){
  $("#"+buttonName).addClass("pressed");
  setTimeout(function(){
    $("#"+buttonName).removeClass("pressed");
  },100);
}

