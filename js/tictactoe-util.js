var TicTacToeUtil;

TicTacToeUtil = (function() {

  function TicTacToeUtil(){

  }

  TicTacToeUtil.prototype.isWinningMove = function(piece){
  // var row_number = parseInt(row_selected.match(/\d+$/)[0], 10);
  // var col_number = parseInt(col_selected.match(/\d+$/)[0], 10);

  // Check horizontals and verticals
  for (var i = 0; i < 3; i++){
    if( tic_tac_toe_manager.game_data_hash["row-" + i]["col-" + 0] == piece
        && tic_tac_toe_manager.game_data_hash["row-" + i]["col-" + 1] == piece
        && tic_tac_toe_manager.game_data_hash["row-" + i]["col-" + 2] == piece
      ){
        return true;
    }
    if( tic_tac_toe_manager.game_data_hash["row-" + 0]["col-" + i] == piece
      && tic_tac_toe_manager.game_data_hash["row-" + 1]["col-" + i] == piece
      && tic_tac_toe_manager.game_data_hash["row-" + 2]["col-" + i] == piece
      ){
        return true;
    }
  }

  // Check diagonals
  if( tic_tac_toe_manager.game_data_hash["row-" + 0]["col-" + 0] == piece
    && tic_tac_toe_manager.game_data_hash["row-" + 1]["col-" + 1] == piece
    && tic_tac_toe_manager.game_data_hash["row-" + 2]["col-" + 2] == piece
    ) {
      return true;
  }

  if( tic_tac_toe_manager.game_data_hash["row-" + 0]["col-" + 2] == piece
    && tic_tac_toe_manager.game_data_hash["row-" + 1]["col-" + 1] == piece
    && tic_tac_toe_manager.game_data_hash["row-" + 2]["col-" + 0] == piece
    ) {
      return true;
  }

  return false;
}

  return TicTacToeUtil;

})();