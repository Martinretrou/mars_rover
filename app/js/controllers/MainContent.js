app.controller('MainContent', function($scope, $http) {

  var apiKey    = 'fhXBsHhORdxBVMqvBOHwouMKm8VpE4zSYrXIaIH4',
      

   today = new Date(),
   dd = today.getDate(),
   mm = today.getMonth()+1,
   yyyy = today.getFullYear();
  
   if(dd<10) {
       dd='0'+dd
   } 
   
   if(mm<10) {
       mm='0'+mm
   } 

   today = yyyy+'-'+mm+'-'+ (dd - 1);

//xhr on yesterday's date to be able to assure content
    $http({
        method: 'GET',
        dataType:"json",
        contentType:"application/json; charset=utf-8",
        url: 'https://api.nasa.gov/mars-photos/api/v1/rovers/curiosity/photos?earth_date=' + today + '&api_key=' + apiKey,
    }).then(function successCallback(response) {
        console.log(response);

        $scope.photo1 = response.data.photos[0].img_src;
        $scope.photo2 = response.data.photos[5].img_src;
        $scope.photo3 = response.data.photos[10].img_src;
        $scope.photo4 = response.data.photos[15].img_src;

        $scope.sol = response.data.photos[0].sol;
        $scope.date = response.data.photos[0].earth_date;

        $scope.total_photos = response.data.photos[0].rover.total_photos;
        $scope.launchDate = response.data.photos[0].rover.launch_date;
        $scope.landingDate = response.data.photos[0].rover.landing_date;
        $scope.status = response.data.photos[0].rover.status;
        $scope.rover = response.data.photos[0].rover.name;
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






