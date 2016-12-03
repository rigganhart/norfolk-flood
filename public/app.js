let app = angular.module('Norfolk-Flood',[]);


// User Input Controller:
app.controller('userIncomeController', ['$scope','$http', 'dataService', function($scope,$http, dataService){

  $scope.simulatedData = dataService.getSimData();




}]);

app.factory('dataService', ['$http',function($http){
  var simData = []

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
    }
  }

}]);
