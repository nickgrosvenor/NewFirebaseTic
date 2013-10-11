'use strict';

angular.module('gameLogicApp')
  .controller('MainCtrl', function ($scope, angularFire) {
    // binding these to firebase
    $scope.games = [];
    $scope.queue = {};



    var games = new Firebase("https://nicknewtic.firebaseio.com/games");
    angularFire(games, $scope, "games").then(function () {

      var queue = new Firebase("https://nicknewtic.firebaseio.com/queue");
      angularFire(queue, $scope, "queue").then(function () {
        if ($scope.queue.gameId == undefined) {
          console.log("I'm player 1");
          $scope.player = "p1";

          var newGame = {
            board: [[{mark:""},{mark:""},{mark:""}],[{mark:""},{mark:""},{mark:""}],[{mark:""},{mark:""},{mark:""}]],
            turn: 'p1',
            win: false,
            turnCount: 0,
            playerTurn: 1



          };

          $scope.gameId = $scope.games.push(newGame) - 1;
          $scope.queue.gameId = $scope.gameId;
          console.log("Player 1's game is: " + $scope.gameId);

        } else {
          console.log("I'm player 2");
          $scope.player = "p2";

          $scope.gameId = $scope.queue.gameId;
          $scope.queue = {};
          console.log("Player 2's game is: " + $scope.gameId);
        }
      });

    });



//end of firebase stuff


 $scope.clickSquare = function(cell){
   if($scope.games[$scope.gameId].playerTurn % 2 == 1)
          cell.mark = "x";
        else
         cell.mark = "o";
            $scope.winTest(); 
        $scope.games[$scope.gameId].playerTurn++;
 };


 
 $scope.findimg=function(cell){
      
      switch (cell.mark){
      case "x": 
      return "img/urkel.jpg";
      case "o":
      return "img/Screech2.jpg";


      }

 };

     
// START OF WIN LOGIC -------------------  
$scope.winTest=function(){
  for(var c=0;c<=2;++c){
    if($scope.games[$scope.gameId].board[0][c].mark==$scope.games[$scope.gameId].board[1][c].mark && $scope.games[$scope.gameId].board[1][c].mark==$scope.games[$scope.gameId].board[2][c].mark && $scope.games[$scope.gameId].board[0][c].mark!="")
      alert($scope.games[$scope.gameId].board[0][c].mark + " wins!");
      $scope.won=true; 
    if($scope.games[$scope.gameId].board[c][0].mark==$scope.games[$scope.gameId].board[c][1].mark && $scope.games[$scope.gameId].board[c][1].mark==$scope.games[$scope.gameId].board[c][2].mark && $scope.games[$scope.gameId].board[c][0].mark!="")
      alert($scope.games[$scope.gameId].board[c][0].mark + " wins!");
      $scope.won=true;  
    if($scope.games[$scope.gameId].board[0][0].mark==$scope.games[$scope.gameId].board[1][1].mark && $scope.games[$scope.gameId].board[1][1].mark==$scope.games[$scope.gameId].board[2][2].mark && $scope.games[$scope.gameId].board[2][2].mark!="")
      alert($scope.games[$scope.gameId].board[0][0].mark + " wins!");
      $scope.won=true;
    if($scope.games[$scope.gameId].board[0][2].mark==$scope.games[$scope.gameId].board[1][1].mark && $scope.games[$scope.gameId].board[1][1].mark==$scope.games[$scope.gameId].board[2][0].mark && $scope.games[$scope.gameId].board[2][2].mark!="")
      alert($scope.games[$scope.gameId].board[0][2].mark + " wins!");
      $scope.won=true; }
}

// end of win logic ------------


//location of the array ----> $scope.games[$scope.gameId].board
  $scope.hello = function () {
      $scope.games[$scope.gameId].board[0] = "Hello!";
    };
 



//Everything above this line ----------

  });
