describe('Player', function() {
  describe('initialize', function() {
    it('sets the players symbol to X or O', function() {
      var testPlayer = Object.create(Player);
      testPlayer.initialize("X");
      testPlayer.symbol.should.equal("X");
    });
  });

  describe('create', function() {
    it('creates a Player object', function() {
      var testPlayer = Player.create();
      Player.isPrototypeOf(testPlayer).should.equal(true);
    });
    it('initializes the player with the symbol passed to it', function(){
      var testPlayer = Player.create('X');
      testPlayer.symbol.should.equal('X');
    })
  });
});

beforeEach(function(){
  Space.allSpaces = [];
});

describe('Space', function() {
  describe('markBy', function() {
    it('sets the mark attribute equal to the mark attribute of the player who marked it', function() {
      var testSpace = Object.create(Space);
      var testPlayer = Player.create("X");
      testSpace.markBy(testPlayer);
      testSpace.mark.should.equal(testPlayer);
    });
  });

  describe('create', function() {
    it('creates a space object', function() {
      var testSpace = Space.create();
      Space.isPrototypeOf(testSpace).should.equal(true);
    });
    it('initializes the space object with coordinates passed to it', function() {
      var testSpace = Space.create([1,2]);
      testSpace.coordinates.should.eql([1,2]);
    });
    it('pushes the new space instance to the allSpace array', function(){
      var testSpace = Space.create([1,2]);
      testSpace.allSpaces.should.eql([testSpace]);
    });
  });

  describe('initialize', function() {
    it('sets the space object coordinates with the coordinates passed to it', function() {
      var testSpace = Object.create(Space);
      testSpace.initialize([2,3]);
      testSpace.coordinates.should.eql([2,3]);
    });
  });
  describe('find', function(coordinates){
    it('returns the space instance with given coordinates', function(){
      var testSpace = Space.create([1,2]);
      Space.find(1,2).should.eql(testSpace);
    });
  });
});

describe('Board', function(){
  describe('create', function(){
    it('creates a new Board object instance', function(){
      var testBoard = Board.create();
      Board.isPrototypeOf(testBoard);
    });
    it('creates 9 spaces and sets the spaces array equal to the Space.allSpaces array', function(){
      var testBoard = Board.create();
      testBoard.spaces.should.eql(Space.allSpaces);
      testBoard.spaces.length.should.equal(9);
    });
  });
  describe('initialize', function() {
    it('should create arrays for x-coordinates, y-coordinates, and all spaces', function() {
      var testBoard = Object.create(Board);
      testBoard.initialize();
      testBoard.spaces.should.eql([]);
      testBoard.xCoordinates.should.eql([]);
      testBoard.oCoordinates.should.eql([]);
    });
  });

  describe('checkWin', function() {
    it('returns true if current player has any three spaces horizontally aligned', function() {
      var testBoard = Board.create();
      testBoard.xCoordinates = [[1,1],[2,1],[3,1]];
      testBoard.checkWin().should.equal(true);
    });
  });
});

describe('Game', function(){
  describe('initialize', function(){
    it('creates two players and creates a board for the Game instance we are working on', function(){
      var testGame = Object.create(Game);
      testGame.initialize();
      testGame.playerX.symbol.should.equal('X');
      testGame.playerO.symbol.should.equal('O');
      testGame.board.spaces.length.should.equal(9);
    });
  });
  describe('create', function(){
    it('creates an instance of the Game object and initializes it', function() {
      var testGame = Game.create();
      Game.isPrototypeOf(testGame).should.equal(true);
    });
  });

});


