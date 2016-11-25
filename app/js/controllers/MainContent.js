app.controller('MainContent', function($scope, $http) {

    var apiKey = 'fhXBsHhORdxBVMqvBOHwouMKm8VpE4zSYrXIaIH4',


    today = new Date(),
    dd = today.getDate(),
    mm = today.getMonth() + 1,
    yyyy = today.getFullYear();

    if (dd < 10) {
        dd = '0' + dd
    }

    if (mm < 10) {
        mm = '0' + mm
    }

    today = yyyy + '-' + mm + '-' + (dd - 3);

    //xhr on yesterday's date to be able to assure content
    $http({
        method: 'GET',
        dataType: "json",
        contentType: "text/plain",
        url: 'https://api.nasa.gov/mars-photos/api/v1/rovers/curiosity/photos?earth_date=' + today + '&api_key=' + apiKey,
    }).then(function successCallback(response) {
        console.log(response);

        $scope.responseJSON = response;
        $scope.url = response.data.photos;
        $scope.error = '';
        $scope.errordesc = '';
        $scope.urltest = [];

        angular.forEach($scope.url, function(img_src) {
            $scope.urltest.push(img_src);
        })

        $scope.modal = false;

        $scope.today_photos = response.data.photos.length;
        $scope.photo1 = response.data.photos[0].img_src;
        $scope.photo2 = response.data.photos[1].img_src;
        $scope.photo3 = response.data.photos[2].img_src;
        $scope.photo4 = response.data.photos[3].img_src;

        $scope.id1 = response.data.photos[0].id;
        $scope.id2 = response.data.photos[1].id;
        $scope.id3 = response.data.photos[2].id;
        $scope.id4 = response.data.photos[3].id;

        $scope.sol = response.data.photos[0].sol;
        $scope.date = response.data.photos[0].earth_date;

        $scope.total_photos = response.data.photos[0].rover.total_photos;
        $scope.launchDate = response.data.photos[0].rover.launch_date;
        $scope.landingDate = response.data.photos[0].rover.landing_date;
        $scope.status = response.data.photos[0].rover.status;
        $scope.rover = response.data.photos[0].rover.name;

    }, function errorCallback(response) {
        $scope.modal = true;
        $scope.error = 'Something went wrong when retrieving the data from NASA';
        $scope.errordesc = 'Try again tomorrow.';
        console.log('Something went wrong...');
    });

});
