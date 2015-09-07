var intervalId;

function Game () {
  this.score= 0;

  this.moleMachine = function () {
    var boxNumber = Math.floor((Math.random()*25)+1);
    var boxPhrase = "div.field div:nth-child(" + boxNumber + ")";
    var moleBox = document.querySelector(boxPhrase);
    var allBoxes = document.querySelectorAll(".hole");
    allBoxes = [].slice.call(allBoxes);
    allBoxes.forEach(function (box) { box.style.backgroundColor = "black";
    });
    moleBox.style.backgroundColor = "#33FF33";
  };

  this.doThings = function doThings () {
    meterAdjustment();
    var speed = 1500 - (this.score*1.5);
    if (speed === 0) {
      clearInterval(intervalId);
    } else {
      intervalId = setInterval (moleSwitcher, speed);
    }
  };
}

var blinker = document.querySelector(".blinker")

var painMeter = document.querySelectorAll(".level");
var painMeter = [].slice.call(painMeter);

var meterAdjustment = function () {
  var levelNumber = (game.score/100);
  painMeter.forEach( function (face) { face.style.backgroundColor = "black";});
  for (var j = 0; j< levelNumber; j++) {
    painMeter[j].style.backgroundColor = "#33FF33";
  }
}

setInterval(function () {
  if (blinker.style.display === "none") {
    blinker.style.display = "inline-block";} else {
    blinker.style.display = "none";}
    }, 500)

var startButton = document.querySelector(".button");

var game;

startButton.onclick = function () {
  game = new Game();
  whack();
  game.doThings();
  startButton.style.opacity = ".5";
};

var moleSwitcher = function () {
    game.moleMachine();
  };

var scoreBoard = document.querySelector(".score");

var scoreCard = function () {
    if (this.style.backgroundColor !== "black") {
      game.score += 100;
    } else {game.score -= 100;}
    scoreBoard.innerHTML = "Score: " + game.score;
    this.style.backgroundColor = "black";
    clearInterval(intervalId);
    game.doThings();
  };

function whack () {
  for (var i=1; i<26; i++) {
    var clickedMole = document.querySelector(".field div:nth-child(" + i + ")");
    clickedMole.onclick = scoreCard;
  }
}

var cheat = document.querySelector(".cheat")

cheat.onclick = function () {
  game.score= 800;
  scoreBoard.innerHTML = "Score: " + game.score;
  clearInterval(intervalId);
  game.doThings();
  }












