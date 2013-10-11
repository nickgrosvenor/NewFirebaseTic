'use strict';

angular.module('gameLogicApp', ["firebase"])
  .config(function ($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'views/main.html',
        controller: 'MainCtrl'
      })
      .otherwise({
        redirectTo: '/'
      });
  });

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


 winner = ""
 for(x=0; x<=2; ++x) {
   if($scope.games[$scope.gameId].board[0][x] == $scope.games[$scope.gameId].board[1][x] &&
      $scope.games[$scope.gameId].board[1][x] == $scope.games[$scope.gameId].board[2][x] &&
      $scope.games[$scope.gameId].board[2][x] != "" ) 
   {
    if ($scope.games[$scope.gameId].board[0][x]=="x") 

    {
    winner = "x"; }
      else
    {
    winner = "o";
    }   
       // var planet = document.getElementById('planet');
       // planet.style.opacity = "0.9";
  }



      
 if($scope.games[$scope.gameId].board[x][0] == $scope.games[$scope.gameId].board[x][1] &&
    $scope.games[$scope.gameId].board[x][1] == $scope.games[$scope.gameId].board[x][2] &&
    $scope.games[$scope.gameId].board[x][2] != "") 

    if ($scope.games[$scope.gameId].board[x][0]=="x") 

    {
    winner = "x"; }
      else
    {
    winner = "o";
    }   
    
    } 

 if($scope.games[$scope.gameId].board[0][0] == $scope.games[$scope.gameId].board[1][1] &&
    $scope.games[$scope.gameId].board[1][1] == $scope.games[$scope.gameId].board[2][2] &&
    $scope.games[$scope.gameId].board[2][2] != "") 

    if ($scope.games[$scope.gameId].board[0][0]=="x") 

    {
    winner = "x"; }
      else
    {
    winner = "o";
    }   
    
 if($scope.games[$scope.gameId].board[0][2] == $scope.games[$scope.gameId].board[1][1] &&
    $scope.games[$scope.gameId].board[1][1] == $scope.games[$scope.gameId].board[2][0] &&
    $scope.games[$scope.gameId].board[2][0] != "") 

    if ($scope.games[$scope.gameId].board[1][1]=="x") 

    {
    winner = "x"; }
      else
    {
    winner = "o";
    }       


if (winner == "x") {


      var popup_screech_wins = document.getElementById('popup_screech_wins');
       popup_screech_wins.style.backgroundImage = 'url(screechwins1.png)';
       popup_screech_wins.style.display = "block";
    } 

    if (winner == "o") {

      var popup_screech_wins = document.getElementById('popup_screech_wins');
       popup_screech_wins.style.backgroundImage = 'url(urkelwins.png)';
       popup_screech_wins.style.display = "block";


    }


}  // end of win logic ------------


//location of the array ----> $scope.games[$scope.gameId].board
  $scope.hello = function () {
      $scope.games[$scope.gameId].board[0] = "Hello!";
    };
 



//Everything above this line ----------

  });
