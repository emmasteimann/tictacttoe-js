var TicTacToeAi;

TicTacToeAi = (function() {

  function TicTacToeAi(){

  }
  TicTacToeAi.prototype.initialize = function(){
    this.loadEventListeners();

  }
  TicTacToeAi.prototype.loadEventListeners = function(){
    var self = this;
    $("#game_board").bind("ai_turn", function(event){
      self.takeYourTurn(event);
    });
  }
  TicTacToeAi.prototype.takeYourTurn = function(element){
    this.chooseNextLogicalTile();
  }
  TicTacToeAi.prototype.chooseNextLogicalTile = function(element){

  }

  return TicTacToeAi;

})();