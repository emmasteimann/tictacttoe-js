(function() {

    var TicTacToeManager;

    TicTacToeManager = (function() {


          function TicTacToeManager(){

          }

          return TicTacToeManager;

    })();

    // On DOM Load
    $(function() {

      tic_tac_toe_game = new TicTacToeManager();
      tic_tac_toe_game.initialize();
    });

}).call(this);