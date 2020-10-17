const app = angular.module('app', ['ngMaterial']);

app.controller('Tracker', function ($scope, $http){
  $scope.defaultCountry = 'philippines';
  $scope.countries = [];
  $scope.success = false;
  $http.get('https://api.covid19api.com/world/total').then(response=>{
    $scope.success = true;
      $scope.worldLatest = response.data;
      $scope.getLatest($scope.defaultCountry);

  }).catch(err => console.error(err));
  $scope.getLatest = (country) => {
    $scope.loading = true;
    $http.get(`https://api.covid19api.com/country/${country}/status/confirmed`).then(response=>{
      $scope.covidLatest = response.data[response.data.length-1];
      $scope.loading = false;
  }).catch(err => console.error(err));
  };
  $http.get('https://api.covid19api.com/countries').then(response=>{
    $scope.countries = response.data;
    $scope.countries.sort((a,b) => (a.Country > b.Country) ? 1 : ((b.Country > a.Country) ? -1 : 0));
  }).catch(err => console.error(err));
});