let app = angular.module('Norfolk-Flood',[]);


// User Input Controller:
app.controller('userIncomeController', ['$scope','$http', 'dataService', function($scope,$http, dataService){

  $scope.simulatedData = dataService.getSimData();
  $scope.realData = dataService.getRealData();



}]);

app.factory('dataService', ['$http',function($http){
  var simData = [];
  var realData = [];

  return{
    getSimData : function(){
      $http({
        method: 'GET',
        url: '/sim'
      }).then(function(response){
        console.log("simulated data from server",response);
        angular.copy(response.data,simData)
      })
      return simData;
    },
    getRealData : function(){
      $http({
        method: 'GET',
        url: '/real'
      }).then(function(response){
        console.log("real data from server",response);
        angular.copy(response.data,realData)
      })
      return realData;
    }
  }

}]);
