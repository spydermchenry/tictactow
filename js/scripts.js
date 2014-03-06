var Player = {
  initialize: function(symbol) {
    this.symbol = symbol;
  },
  create: function(symbol){
    var player = Object.create(Player);
    player.initialize(symbol);
    return player;
  }
};

var Space = {
  allSpaces: [],
  markBy: function(player) {
    this.mark = player;
  },

  create: function(coordinates) {
    var space = Object.create(Space);
    space.initialize(coordinates);
    Space.allSpaces.push(space);
    return space;
  },

  initialize: function(coordinates){
    this.coordinates = coordinates;
    this.mark = "";
  },
  find: function(coordinateX, coordinateY) {
    var searchResult;
    Space.allSpaces.forEach(function(space) {
      if(space.coordinates[0]===coordinateX && space.coordinates[1]===coordinateY) {
        searchResult = space;
      }
    });
    return searchResult;
  }
};

var Board = {
  create: function() {
    var board = Object.create(Board);
    board.initialize();
    for(var i = 1; i <= 3 ; i++){
      for(var j = 1; j <= 3; j++){
        var space = Space.create([i, j]);
      };
    };
    board.spaces = Space.allSpaces;
    return board;
  },
  initialize: function() {
    this.spaces = [];
    this.xCoordinates = [];
    this.oCoordinates = [];
  },
  checkThreeInARow: function(coordinateArray) {
    var result = false;
    for(var i = 0; i < 2; i++) {  
      var oneCounter = 0;
      var twoCounter = 0;
      var threeCounter = 0;
      coordinateArray.forEach(function(coordinateSet){
        if (coordinateSet[i] === 1){
          oneCounter ++;
        } else if (coordinateSet[i] === 2){
          twoCounter ++;
        } else if (coordinateSet[i] === 3){
          threeCounter ++;
        }
        if(oneCounter === 3 || twoCounter === 3 || threeCounter === 3){
          result = true;
        }
      });
    }; 
    return result;  
  },
  checkDiagonal: function(coordinateArray) {
    var oneCounter = 0;
    var twoCounter = 0;
    var result = false;
    var master1 = ["11", "22", "33"];
    var master2 = ["13", "22", "31"];

      coordinateArray.forEach(function(coordinateSet) {
        if(master1.indexOf(coordinateSet.join("")) > -1) {
          oneCounter ++;
        }
        if(master2.indexOf(coordinateSet.join("")) > -1) {
          twoCounter ++;
        }
      });

      if(oneCounter === 3 || twoCounter === 3){
      result = true;
    }
    return result;
  },
  checkWin: function(player) {
    var result = false;
    if(this.checkThreeInARow(this.xCoordinates) || this.checkDiagonal(this.xCoordinates)) {
      this.winner = 'Player X'
      result = true;
    } else if (this.checkThreeInARow(this.oCoordinates) || this.checkDiagonal(this.oCoordinates)) {
      this.winner = 'Player O'
      result = true;
    } 
    return result;
  }
};

var Game = {
  initialize: function() {
    this.board = Board.create();
    this.playerX = Player.create('X');
    this.playerO = Player.create('O');
  },
  create: function() {
    var game = Object.create(Game);
    game.initialize();
    return game;
  },

};

$(function() {
  var currentPlayer;
  var newGame;
  var counter = 0;

  $('button#start-game').click(function(){
    $('button#start-game').text('New game?');
    newGame = Game.create();
    counter = 0;
    $('#message-box').empty().append('<span class="x-turn">X\'s Turn!</span>');
    $('td').children('div').text("");
    $('#game-table').show();
    $('#message-box').show();
    currentPlayer = newGame.playerX;
  });

  $('td').click(function() {
    var currentXcoordinate = $(this).index()+1;
    var currentYcoordinate = $(this).parent().index()+1;

    currentSpace = Space.find(currentXcoordinate,currentYcoordinate);

    if(currentSpace.mark === "") {
      currentSpace.markBy(currentPlayer);
      counter += 1;
      $(this).children('div').append('<span class="' + currentPlayer.symbol +'">' + currentPlayer.symbol + '</span>');
      if(currentPlayer.symbol === 'X') {
        newGame.board.xCoordinates.push([currentXcoordinate,currentYcoordinate]);
      } else {
        newGame.board.oCoordinates.push([currentXcoordinate,currentYcoordinate]);
      }  
    } else {
      $('#message-box').empty().append('<span class="space-repeat">That space taken! Please choose another!</span>');
      return;
    }
    if(newGame.board.checkWin()) {
      $('#message-box').empty().append('<span class="win">' + currentPlayer.symbol + ' WINS!</span>');
    } else {

      if(counter === 9) {
        $('#message-box').empty().append('<span class="cat">CATS GAME!  No winner!</span>');
      } else {
      if(currentPlayer == newGame.playerX) {        
        currentPlayer = newGame.playerO;
        $('#message-box').empty().append('<span class="o-turn">O\'s Turn!</span>');
      } else {
        currentPlayer = newGame.playerX;
        $('#message-box').empty().append('<span class="x-turn">X\'s Turn!</span>');
      }
    }
  }
  });
});
