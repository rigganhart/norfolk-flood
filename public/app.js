let app = angular.module('Norfolk-Flood',[]);


// User Input Controller:
app.controller('userIncomeController', ['$scope','$http', 'dataService', function($scope,$http, dataService){

  $scope.simulatedData = dataService.getSimData(); //income, response
  $scope.realData = dataService.getRealData();
  $scope.rangeData = dataService.getIncomeRanges();
  $scope.incomeSubmitted = false;
  
  $scope.getIncomeImpact = function() {
    //Identify income range and calculate flood impact values
    $scope.incomeSubmitted = true;
    console.log($scope.incomeSubmitted);
    
    var incomeLevel = parseFloat($scope.incomeLevel);
    
    var incomeRange = $scope.rangeData.filter( function(range) {
      return incomeLevel >= range['Min'] && incomeLevel <= range['MaxUpTo']; 
    });
    console.log("lookie");
    console.log(incomeRange[0]);
    console.log(incomeRange[0]['0m']);
    console.log(parseFloat( incomeRange[0]['0m'] ));
    $scope.outcomes = [
      {
        level: '0.00',
        levelName: 'NONE',
        cost: $scope.incomeLevel * ( parseFloat( incomeRange[0]['0m'] ) / 100 ),
        message: 'If the sea level stays the same, you are predicted to lose $' + parseFloat($scope.incomeLevel * incomeRange['0m']).toFixed(0)
      },
      {
        level: '0.50',
        levelName: 'LOW',
        cost: $scope.incomeLevel * ( parseFloat( incomeRange[0][0]['5m'] ) / 100 ),
        message: 'In the worst-case seal level rise scenario, you are predicted to lose $' + parseFloat($scope.incomeLevel * incomeRange['0m']).toFixed(0)
      },
      {
        level: '0.75',
        levelName: 'HIGH',
        cost: $scope.incomeLevel * ( parseFloat( incomeRange[0][0]['75m'] ) / 100 ),
        message: 'In the worst-case sea level rise scenario, you are predicted to lose $' + parseFloat($scope.incomeLevel * incomeRange['0m']).toFixed(0)
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
    }
  };

}]);
