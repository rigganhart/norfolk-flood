let app = angular.module('Norfolk-Flood',[]);


// User Input Controller:
app.controller('userIncomeController', ['$scope','$http', 'dataService', function($scope,$http, dataService){

  $scope.simulatedData = dataService.getSimData(); //income, response
  $scope.realData = dataService.getRealData();
  $scope.rangeData = dataService.getIncomeRanges();
  
  $scope.getIncomeImpact = function() {
    //Identify income range and calculate flood impact values
    console.log($scope.incomeLevel);
    $scope.incomeSubmitted = true;
    
    var incomeRange = $scope.rangeData.filter( function(range) {
      console.log(range);
      $scope.incomeLevel >= range['Min'] && $scope.incomeLevel <= range['MaxUpTo']; 
    });
    console.log(incomeRange);
    $scope.outcomes = [
      {
        level: '0.0',
        levelName: 'NONE',
        cost: $scope.incomeLevel * incomeRange['0m'],
        message: 'If the sea level stays the same, you can expect to lose $' + parseFloat($scope.incomeLevel * incomeRange['0m']).toFixed(0)
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
      return simData;
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
    }
  };

}]);
