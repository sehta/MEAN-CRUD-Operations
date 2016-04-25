todoApp.factory('employeesFactory', function($http) {
  var urlBase = '/api/employees';
  var _empService = {};

  _empService.getEmps = function() {
    return $http.get(urlBase);
  };

  _empService.saveEmp = function(todo) {
    return $http.post(urlBase, todo);
  };

  _empService.updateEmp = function(todo) {
    return $http.put(urlBase, todo);
  };

  _empService.deleteEmp = function(id) {
    return $http.delete(urlBase + '/' + id);
  };

  return _empService;
});
