// Load Partial view and startup route
employeeApp = angular.module('employeeApp', ['ngRoute'])
  .config(function($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: '/partials/employee.html',
        controller: 'EmployeeCtrl'
      }).otherwise({
        redirectTo: '/'
      });
  });
