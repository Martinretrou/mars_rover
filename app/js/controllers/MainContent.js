app.controller('MainContent', function($scope, $http) {

  var apiKey = 'fhXBsHhORdxBVMqvBOHwouMKm8VpE4zSYrXIaIH4';

//xhr on today's date
    $http({
        method: 'GET',
        dataType:"json",
        contentType:"application/json; charset=utf-8",
        url: 'https://api.nasa.gov/planetary/apod?api_key=' + apiKey,
    }).then(function successCallback(response) {
        $scope.copyright = response.data.copyright;
        $scope.date = response.data.date;
        $scope.explanation = response.data.explanation;
        $scope.hdurl = response.data.hdurl;
        $scope.url = response.data.url;
        $scope.title = response.data.title;

    }, function errorCallback(response) {
        console.log('Something went wrong...');
    });


//xhr request on specific date 
    $scope.request = function() {
      $http({
        method: 'GET',
        dataType:"json",
        contentType:"application/json; charset=utf-8",
        params:{
          date: $scope.date,
        },
        url: 'https://api.nasa.gov/planetary/apod?api_key=' + apiKey,
    }).then(function successCallback(response) {
        $scope.copyright = response.data.copyright;
        $scope.date = response.data.date;
        $scope.explanation = response.data.explanation;
        $scope.hdurl = response.data.hdurl;
        $scope.url = response.data.url;
        $scope.title = response.data.title;

    }, function errorCallback(response) {
        console.log('Something went wrong...');
    });
    }
    
});






