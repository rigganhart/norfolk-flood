var app = angular.module('Norfolk-Flood',['ui.router']);

app.config(function($stateProvider, $urlRouterProvider) {
  $urlRouterProvider.otherwise('/main');
  
  $stateProvider
    .state('main', {
      url: '/main',
      templateUrl: '_main.html'
    })
    .state('thank-you', {
      url: '/thank-you',
      templateUrl: '_thanks.html'
    });
})

// User Input Controller:
app.controller('userIncomeController', ['$scope','$http', 'dataService', function($scope,$http, dataService){

  $scope.simulatedData = dataService.getSimData(); //income, response
  $scope.realData = dataService.getRealData();
  $scope.rangeData = dataService.getIncomeRanges();
  $scope.incomeSubmitted = false;
  
  $scope.setAssessment = function ( scenario ) {
    console.log( "Setting", scenario);
    dataService.setReactionData( {
      income: parseFloat($scope.incomeLevel), 
      response: scenario 
    });
    $state.go('.thank-you');
  } 
  
  $scope.getIncomeImpact = function() {
    $scope.toCost = function (income, lossFactor) {
      return (parseFloat(income) * ( parseFloat(lossFactor) / 100 )).toFixed(0);
    };
    //Identify income range and calculate flood impact values
    $scope.incomeSubmitted = true;
    console.log($scope.incomeSubmitted);
    
    var incomeLevel = parseFloat($scope.incomeLevel);
    var incomeRange = [];
    
    if( incomeLevel > 999999 ) {
      incomeRange = [$scope.rangeData[8]];
    } else {
      incomeRange = $scope.rangeData.filter( function(range) {
        return incomeLevel >= range['min'] && incomeLevel <= range['maxUpTo']; 
      });
    }
    console.log("lookie");
    console.log(incomeRange);
    console.log(incomeRange[0]['0m']);
    console.log(parseFloat( incomeRange[0]['0m'] ));
    $scope.outcomes = [
      {
        level: '0.00',
        levelName: 'NONE',
        cost: $scope.toCost( $scope.incomeLevel, incomeRange[0]['0m'] ),
        message: 'If the sea level stays the same, you are predicted to lose $' + $scope.toCost( $scope.incomeLevel, incomeRange[0]['0m'] )
      },
      {
        level: '0.50',
        levelName: 'LOW',
        cost: $scope.toCost( $scope.incomeLevel, incomeRange[0]['5m'] ),
        message: 'In the worst-case seal level rise scenario, you are predicted to lose $' + $scope.toCost( $scope.incomeLevel, incomeRange[0]['5m'] )
      },
      {
        level: '0.75',
        levelName: 'HIGH',
        cost: $scope.toCost( $scope.incomeLevel, incomeRange[0]['75m'] ),
        message: 'In the worst-case sea level rise scenario, you are predicted to lose $' + $scope.toCost( $scope.incomeLevel, incomeRange[0]['75m'] )
      }
    ];
  };

  

}]);

app.factory('dataService', ['$http',function($http){
  var simData = [];
  var realData = [];
  var rangeData = [];

  return{
    getIncomeRanges : function(){
      $http({
        method: 'GET',
        url: '/income'
      }).then(function(response){
        console.log("income ranges from server",response);
        angular.copy(response.data,rangeData);
      });
      return rangeData;
    },
    getSimData : function(){
      $http({
        method: 'GET',
        url: '/sim'
      }).then(function(response){
        console.log("simulated data from server",response);
        angular.copy(response.data,simData);
      });
      return simData;
    },
    getRealData : function(){
      $http({
        method: 'GET',
        url: '/real'
      }).then(function(response){
        console.log("real data from server",response);
        angular.copy(response.data,realData);
      });
      return realData;
    },
    setReactionData : function( reaction ){
      $http({
        method: 'POST',
        url: '/real',
        data: reaction
      }).then(function(response){
        console.log("response data to server",response);
      });
      return true;
    }
  };

}]);
