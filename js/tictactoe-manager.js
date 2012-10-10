(function() {

    var TicTacToeManager;

    TicTacToeManager = (function() {
          // Constructor
          function TicTacToeManager(data){
            this.player_piece = 'X';
            this.computer_piece = 'O';
            this.initial_game_board = data.initial_game_board;
            this.game_data_hash = {};
            this.is_your_turn = true;
            this.players_last_move = {};
          }

          // Kick off the manager, weeeeh!
          TicTacToeManager.prototype.initialize = function(){
            this.prepGameBoard()
            this.loadEventListeners();

          }

          TicTacToeManager.prototype.prepGameBoard = function(){
            var self = this;
            $('#game_board tr').map(function(idx, el){
              self.game_data_hash["row-"+idx] = {};
              $(el).addClass("row-"+idx)
              $(el).children("td").map(function(td_idx, td_el){
                var td_element = $(td_el);
                self.game_data_hash["row-"+idx]["col-"+td_idx] = td_element.val();
                td_element.addClass("col-"+td_idx);
              });
            });
            $("#message_area").html("It's your turn")
          }

          TicTacToeManager.prototype.loadEventListeners = function(){
            var self = this;
            $('#game_container').delegate("#game_board tr td","click",function(event){
              self.checkMove(this);
            });
            $("#game_board").bind("your_turn", function(event){
              self.itsYourTurn(event);
            });
            $("#new_game_button").on("click",function(event){
              self.resetGame(this);
            });
          }

          TicTacToeManager.prototype.itsYourTurn = function(element){
            this.is_your_turn = true;
          }

          TicTacToeManager.prototype.resetGame = function(element){
            this.game_data_hash = {};
            this.is_your_turn = true;
            this.players_last_move = {};
            $("#game_board").html(this.initial_game_board);
            this.prepGameBoard();
          }

          TicTacToeManager.prototype.checkMove = function(element){
            console.log("checking move")
            if (this.is_your_turn){
              var col_selected = $(element).attr("class");
              var row_selected = $(element).parent("tr").attr("class");
              var current_value = this.game_data_hash[row_selected][col_selected];
              if(current_value != this.computer_piece && current_value != this.player_piece){
                this.game_data_hash[row_selected][col_selected] = this.player_piece;
                this.players_last_move["row"] = row_selected;
                this.players_last_move["col"] = col_selected;
                $(element).html(this.player_piece);
                this.is_your_turn = false;
                if(window.tic_tac_toe_util.isWinningMove(this.player_piece)){
                  $("#message_area").html("You won!")
                } else {
                  $("#message_area").html("It's their turn")
                  $("#game_board").trigger("ai_turn");
                }
              }
            }
          }

          return TicTacToeManager;

    })();

    // On DOM Load
    $(function() {
      var initial_game_data = {
        initial_game_board: $('#game_board').html()
      }
      window.tic_tac_toe_manager = new TicTacToeManager(initial_game_data);
      window.tic_tac_toe_ai = new TicTacToeAi();
      window.tic_tac_toe_util = new TicTacToeUtil();
      tic_tac_toe_ai.initialize();
      tic_tac_toe_manager.initialize();
    });

}).call(this); // immediately run and load this jazz into memory