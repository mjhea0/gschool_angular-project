var greetings;

angular.module('myApp').controller('loginController',
  ['$scope', '$location', 'AuthService',
  function ($scope, $location, AuthService) {

    $scope.login = function () {

      // initial values
      $scope.loginError = false;
      $scope.disabled = true;
      greetings = document.getElementById('loginName').value;

      // call login from service
      AuthService.login($scope.loginForm.username, $scope.loginForm.password)
        // handle success
        .then(function () {
          $location.path('/main');
          $scope.disabled = false;
          $scope.loginForm = {};
        })
        // handle error
        .catch(function () {
          $scope.loginError = true;
          $scope.errorMessage = "Invalid username and/or password";
          $scope.disabled = false;
          $scope.loginForm = {};
        });

    };

    $scope.register = function () {

      // initial values
      $scope.error = false;
      $scope.disabled = true;
      $scope.success = false;

      // call register from service
      AuthService.register($scope.registerForm.username, $scope.registerForm.password)
        // handle success
        .then(function () {
          $location.path('/');
          $scope.disabled = false;
          $scope.registerForm = {};
          $scope.success = true;
        })
        // handle error
        .catch(function () {
          $scope.error = true;
          $scope.errorMessage = "Something went wrong!";
          $scope.disabled = false;
          $scope.registerForm = {};
        });

    };

}]);

angular.module('myApp').controller('logoutController',
  ['$scope', '$location', 'AuthService',
  function ($scope, $location, AuthService) {

    $scope.logout = function () {

      console.log(AuthService.getUserStatus());

      // call logout from service
      AuthService.logout()
        .then(function () {
          $location.path('/');
        });

    };

}]);

angular.module('myApp').controller('githubController',
  ['$scope', '$location', '$http',
  function ($scope, $location, $http) {

    $scope.user = greetings;
    $scope.getGithub();
    $scope.getRepo();

}]);

$scope.getGithub = function () {

  // initial values
  $scope.error = false;
  $scope.disabled = true;
  $scope.image = false;
  $scope.searched = false;

  $http({
    method: 'GET',
    url: 'https://api.github.com/users/' + $scope.githubName
  })
    // handle success
    .then(function (res) {
      // console.log(res.data);
      $scope.searched = true;
      $scope.githubAvatar = res.data.avatar_url;
      $scope.image = true;
      $scope.githubUsername = res.data.name;
      $scope.blog = res.data.blog;
      $scope.email = res.data.email;
      $scope.location = res.data.location;
      $scope.totalRepos = res.data.public_repos;
      $scope.stalkers = res.data.followers;
      $scope.stalkees = res.data.following;
    })
    // handle error
    .catch(function () {
      $scope.error = true;
      $scope.errorMessage = "Something went wrong!";
      $scope.disabled = false;
      $scope.registerForm = {};
    });

};

$scope.getRepo = function () {
  for (var x = 1; res.data.length < 30; x++)
  $http({
    method: 'GET',
    url: 'https://api.github.com/users/' + $scope.githubName + '/repos?page=' + x
  })
    .then(function (res) {
      console.log(res.data);
      var totalForks = 0;
      var addedStars = 0;
      $scope.numberStarredRepos = 0;
      var addedCommits = 0;
      for (var i = 0; i < res.data.length; i++) {
        totalForks += res.data[i].forks_count;
        $scope.forks = totalForks;

        addedStars += res.data[i].stargazers_count;
        $scope.totalStars = addedStars;

        if (res.data[i].stargazers_count !== 0) {
          $scope.numberStarredRepos ++;
        }
      }
    })
    // handle error
    .catch(function () {
      $scope.error = true;
      $scope.errorMessage = "Something went wrong!";
      $scope.disabled = false;
      $scope.registerForm = {};
    });

    // $http({
    //   method: 'GET',
    //   url: 'https://api.github.com/repos' + $scope.githubName + '/' + res.data.name + '/commits'
    // })
    //   .then(function (res) {
    //     console.log(res.data.commit);
    //   })
};
