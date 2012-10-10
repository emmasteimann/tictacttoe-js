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
    var self = this;
    setTimeout(function(){
      self.chooseNextLogicalTile();
    },500)
  }
  TicTacToeAi.prototype.chooseNextLogicalTile = function(element){
    var move_to_make = false;
    var potential_moves = [];
    // Check horizontals and verticals
    for (var i = 0; i < 3; i++){

      var vert_player_sequence = [];
      var vert_computer_sequence = [];
      var vert_empty_sequence = [];

      var horiz_player_sequence = [];
      var horiz_computer_sequence = [];
      var horiz_empty_sequence = [];

      // Check verticals
      for (var r = 0; r < 3; r++){
        var current_item = tic_tac_toe_manager.game_data_hash["row-" + i]["col-" + r];
        if(current_item == tic_tac_toe_manager.player_piece){
          vert_player_sequence.push(["row-" + i, "col-" + r])
        } else if (current_item == tic_tac_toe_manager.computer_piece){
          vert_computer_sequence.push(["row-" + i, "col-" + r])
        } else {
          vert_empty_sequence.push(["row-" + i, "col-" + r])
        }
      }

      // Check horizontals
      for (var r = 0; r < 3; r++){
        var current_item = tic_tac_toe_manager.game_data_hash["row-" + r]["col-" + i];
        if(current_item == tic_tac_toe_manager.player_piece){
          horiz_player_sequence.push(["row-" + r, "col-" + i])
        } else if (current_item == tic_tac_toe_manager.computer_piece){
          horiz_computer_sequence.push(["row-" + r, "col-" + i])
        } else {
          horiz_empty_sequence.push(["row-" + r, "col-" + i])
        }
      }


      // Perform sequence logic here --vvvv
      if(vert_player_sequence.length == 2 && vert_empty_sequence.length == 1){ // block player
        move_to_make = vert_empty_sequence[0];
        break;
      } else if (vert_computer_sequence.length == 2 && vert_empty_sequence.length == 1){ // win game
        move_to_make = vert_empty_sequence[0];
        break;
      } else if (vert_empty_sequence.length == 2 && vert_player_sequence.length == 1){ // log good moves
        potential_moves.push(vert_empty_sequence);
      } else if (vert_empty_sequence.length == 1 && vert_player_sequence.length == 1 && vert_computer_sequence.length == 1){ // log good moves
        potential_moves.push(vert_empty_sequence);
      }

      if(horiz_player_sequence.length == 2 && horiz_empty_sequence.length == 1){ // block player
        move_to_make = horiz_empty_sequence[0];
        break;
      } else if (horiz_computer_sequence.length == 2 && horiz_empty_sequence.length == 1){ // win game
        move_to_make = horiz_empty_sequence[0];
        break;
      } else if (horiz_empty_sequence.length == 2 && horiz_player_sequence.length == 1){ // log good moves
        potential_moves.push(horiz_empty_sequence);
      } else if (horiz_empty_sequence.length == 1 && horiz_player_sequence.length == 1 && horiz_computer_sequence.length == 1){ // log good moves
        potential_moves.push(horiz_empty_sequence);
      }

    }

    if(!move_to_make){
      console.log("checking diagonals")
      console.log(potential_moves)
      // Check diagonals
      var left_diag_player_sequence = [];
      var left_diag_computer_sequence = [];
      var left_diag_empty_sequence = [];

      var right_diag_player_sequence = [];
      var right_diag_computer_sequence = [];
      var right_diag_empty_sequence = [];

      for (var r = 0; r < 3; r++){
        var current_item = tic_tac_toe_manager.game_data_hash["row-" + r]["col-" + r];
        if(current_item == tic_tac_toe_manager.player_piece){
          left_diag_player_sequence.push(["row-" + r, "col-" + r])
        } else if (current_item == tic_tac_toe_manager.computer_piece){
          left_diag_computer_sequence.push(["row-" + r, "col-" + r])
        } else {
          left_diag_empty_sequence.push(["row-" + r, "col-" + r])
        }
      }

      for (var r = 0; r < 3; r++){
        var i = 2-r;
        var current_item = tic_tac_toe_manager.game_data_hash["row-" + r]["col-" + i];
        if(current_item == tic_tac_toe_manager.player_piece){
          right_diag_player_sequence.push(["row-" + r, "col-" + i])
        } else if (current_item == tic_tac_toe_manager.computer_piece){
          right_diag_computer_sequence.push(["row-" + r, "col-" + i])
        } else {
          right_diag_empty_sequence.push(["row-" + r, "col-" + i])
        }
      }

      if(left_diag_player_sequence.length == 2 && left_diag_empty_sequence.length == 1){ // block player
        move_to_make = left_diag_empty_sequence[0];
      } else if (left_diag_computer_sequence.length == 2 && left_diag_empty_sequence.length == 1){ // win game
        move_to_make = left_diag_empty_sequence[0];
      } else if (left_diag_empty_sequence.length == 2 && left_diag_player_sequence.length == 1){ // log good moves
        potential_moves.push(left_diag_empty_sequence);
      } else if (left_diag_empty_sequence.length == 1 && left_diag_player_sequence.length == 1 && left_diag_computer_sequence.length == 1){ // log good moves
        potential_moves.push(left_diag_empty_sequence);
      }

      if(!move_to_make){
        if(right_diag_player_sequence.length == 2 && right_diag_empty_sequence.length == 1){ // block player
          move_to_make = right_diag_empty_sequence[0];
        } else if (right_diag_computer_sequence.length == 2 && right_diag_empty_sequence.length == 1){ // win game
          move_to_make = right_diag_empty_sequence[0];
        } else if (right_diag_empty_sequence.length == 2 && right_diag_player_sequence.length == 1){ // log good moves
          potential_moves.push(right_diag_empty_sequence);
        } else if (right_diag_empty_sequence.length == 1 && right_diag_player_sequence.length == 1 && right_diag_computer_sequence.length == 1){ // log good moves
          potential_moves.push(right_diag_empty_sequence);
        }
      }

      if(!move_to_make){
        if(potential_moves.length > 0){
          move_to_make = potential_moves[Math.floor(Math.random()*potential_moves.length)];
          move_to_make = move_to_make[Math.floor(Math.random()*move_to_make.length)];
          console.log("This is the move we're making")
          console.log(move_to_make)
        } else{
          console.log("THIS IS NOT POSSIBLE!!!")
        }
      }
    }
    if(move_to_make){
      console.log(move_to_make)
      this.checkMove($("#game_board tr[class='"+move_to_make[0]+"'] td[class='"+move_to_make[1]+"']"),move_to_make[0],move_to_make[1])
    } else{
      if(potential_moves.length > 0){
        move_to_make = potential_moves[Math.floor(Math.random()*potential_moves.length)];
      } else{
        $("#message_area").html("Cat's Game")
      }
    }

  }

  TicTacToeAi.prototype.checkMove = function(element, row_selected, col_selected){
    tic_tac_toe_manager.game_data_hash[row_selected][col_selected] = tic_tac_toe_manager.computer_piece;
    $(element).html(tic_tac_toe_manager.computer_piece);
    this.is_your_turn = false;
    if(window.tic_tac_toe_util.isWinningMove(tic_tac_toe_manager.computer_piece)){
      $("#message_area").html("Computer won!")
    } else {
      $("#message_area").html("It's your turn")
      $("#game_board").trigger("your_turn");
    }
  }

  return TicTacToeAi;

})();