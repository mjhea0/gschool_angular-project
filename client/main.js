var myApp = angular.module('myApp', ['ngRoute']);

myApp.config(function ($routeProvider) {
  $routeProvider
    .when('/', {templateUrl: '/partials/home.html', controller: 'loginController'})
    .when('/register', {controller: 'registerController'})
    .when('/logout', {controller: 'logoutController'})
    .when('/main', {templateUrl: '/partials/main.html'});
});

myApp.run(function ($rootScope, $location, $route, AuthService) {
  $rootScope.$on('$routeChangeStart', function (event, next, current) {
    if (AuthService.isLoggedIn() === false) {
      $location.path('/');
    }
  });


});
