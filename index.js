var game = {
  rules: {
    'rock': {w: 'scissors', l: 'paper'},
    'paper': {w: 'rock', l: 'scissors'},
    'scissors': {w: 'paper', l: 'rock'}
  },
  play: false,
  userChoice: 0,
  pcChoice: 0,
  status: 0,
  score: 0
}
var rps = ['rock', 'paper', 'scissors'];

function playGame() {
  cpuPick();
  console.log('user: ' + game.userChoice);
  console.log('pc: ' + game.pcChoice);
  if (game.rules[game.userChoice].w === game.pcChoice) {
    game.status = 1;
    game.score++;
  } else if (game.rules[game.userChoice].l === game.pcChoice) {
    game.status = 2;
  } else if (game.userChoice === game.pcChoice){
    game.status = 3;
  }
  switchToGame();
}

function cpuPick() {
  var randomNumber = (Math.floor(Math.random() * 3));
  game.pcChoice = rps[randomNumber];
}

function playAgain() {
  fadeO('.yp2, .hp2, .win, .lose, .draw, .replay, #rock, #rock2, #paper, #paper2, #scissors, #scissors2, #radial-win');
  setTimeout(function(){
    if(game.pcChoice === game.userChoice + '2'){
      $('#' + game.pcChoice).remove();
    }
    $('.yp2').removeClass('yp2').addClass('yp1');
    $('.hp2').removeClass('hp2').addClass('hp1');
    $('#radial-win').addClass('off').removeClass('btn-left2 btn-right2');
    $('#rock').addClass('btn3').removeAttr('style').removeClass('btn-left2 btn-right2');
    $('#paper').addClass('btn1').removeAttr('style').removeClass('btn-left2 btn-right2');
    $('#scissors').addClass('btn2').removeAttr('style').removeClass('btn-left2 btn-right2');
    fadeI('.triangle, .btn1, .btn2, .btn3');
  }, 501);
  setTimeout(function(){
    game.play = false;
    game.userChoice = 0;
    game.pcChoice = 0;
    status = 0;
  }, 1000)
}

// Animations

$('#rules').click(function() {
  fadeI('.rules-container');
})

$('#close').click(function(){
  fadeO('.rules-container');
})

$(".btn-icon, .cir-btn").click(function(event) {
  if (game.play === false){
    animatePress(event.target.name);
    game.play = true;
    game.userChoice = event.target.name;
    switchToGame();
    playGame();
  }
})
$(".replay").click(function(event) {
  animatePress(event.target.name);
  playAgain();
})

function animatePress(currentBtn) {
  $("#" + currentBtn).addClass("pressed");
  setTimeout(function () {$("#" + currentBtn).removeClass("pressed");}, 300);
}

function switchToGame() {
  fadeO('.triangle');
  fadeO("#rock");
  fadeO("#paper");
  fadeO("#scissors");
  setTimeout(function(){$('.cir-btn').removeClass('btn3 btn1 btn2');},501);
  setTimeout(function(){
    if (game.userChoice === game.pcChoice) {
      game.pcChoice = game.pcChoice + '2';
      $("#" + game.userChoice).clone().attr('id', game.pcChoice).appendTo('.game');
    }
    assignPC(game.pcChoice);
    $('#' + game.userChoice).addClass('btn-left1');
    fadeI('#' + game.userChoice);
    fadeI('#' + game.pcChoice);
    fadeI('.yp1');
    fadeI('.hp1');
  }, 1000);
  setTimeout(function(){winLose();}, 3000);
}

function assignPC(id) {
  $('#' + id).addClass("btn-right1");
}

function winLose() {
  moveList = ['btn-left', 'btn-right', 'yp', 'hp'];
  for (var i = 0; i < moveList.length; i++) {
    moveOver(moveList[i]);
  }
  setTimeout(function(){
    if (game.status === 1) {
      fadeI('.win');
      $('#radial-win').addClass('btn-left2');
      fadeI('#radial-win');
      updateScore();
    } else if (game.status === 2) {
      fadeI('.lose');
      $('#radial-win').addClass('btn-right2');
      fadeI('#radial-win');
    } else if (game.status === 3){
      fadeI('.draw');
    }
    fadeI('.replay');
  }, 1000);
}

function fadeO(element) {
  if ($(element).hasClass('off') === true) {
    $(element).removeClass('off');
  }
  setTimeout(function(){
    $(element).fadeOut(500);
  }, 10);
}

function fadeI(element) {
  $(element).fadeIn(500);
}

function moveOver (element) {
  fadeO('.' + element + '1');
  setTimeout(function(){
    $('.' + element + '1').removeClass(element + '1').addClass(element + '2');
    fadeI('.' + element + '2');
  }, 1000);
}

function updateScore() {
  $('#score').text(game.score);
}
