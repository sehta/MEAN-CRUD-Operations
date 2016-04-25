todoApp.controller('TodoCtrl', function($rootScope, $scope, employeesFactory) {


  $scope.isEditable = [];
$scope.options = ["Male","Female"];
$scope.empGender = $scope.options[0];
$scope.employees = [];
$scope.isEdit=false; 
$scope.editIndex=-1;
  // get all Todos on Load
  employeesFactory.getEmps().then(function(data) {
    $scope.employees = data.data;
  });

  // Save a Todo to the server
  $scope.save = function($event) {
   var date = $scope.empDOB.split("/"); 
   var birthday = new Date(date[2],date[0]-1,date[1]);
   var ageDifMs = Date.now() - birthday.getTime();
    var ageDate = new Date(ageDifMs); 
      employeesFactory.saveEmp({
        "name": $scope.empName,
           "email": $scope.empEmail,
           "department": $scope.empDepartment,
           "gender": $scope.empGender,
           "dob": $scope.empDOB,
          "age":Math.abs(ageDate.getUTCFullYear() - 1970),
      }).then(function(data) {
        $scope.employees.push(data.data);
           $scope.empName = '';
      $scope.empEmail = '';
      $scope.empDepartment = '';
      $scope.empGender = 'Male';
      $scope.empDOB = '';
      $scope.empAge = '';
    $scope.isEdit=false;
      $scope.editIndex=-1;
      });
     
  };

    
      // Save a Todo to the server
  $scope.getEmp = function($event, i) {
      $scope.isEdit=true;
       $scope.editIndex=i;
   var _t = $scope.employees[i];
      $scope.empName=_t.name;
      $scope.empEmail=_t.email;
      $scope.empDepartment=_t.department;
      if(_t.gender=="Male")
          $scope.empGender=$scope.options[0];
      else
          $scope.empGender=$scope.options[1];
      
      $scope.empDOB=_t.dob;
        var date = $scope.empDOB.split("/"); 
   var birthday = new Date(date[2],date[0]-1,date[1]);
   var ageDifMs = Date.now() - birthday.getTime();
       var ageDate = new Date(ageDifMs); 
      $scope.empAge = Math.abs(ageDate.getUTCFullYear() - 1970);
  };

 

  // Update the edited Todo
  $scope.update = function() {
   
      var _t = $scope.employees[$scope.editIndex];
        var date = $scope.empDOB.split("/"); 
   var birthday = new Date(date[2],date[0]-1,date[1]);
   var ageDifMs = Date.now() - birthday.getTime();
       var ageDate = new Date(ageDifMs); 
      employeesFactory.updateEmp({
        _id: _t._id,
         "name": $scope.empName,
           "email": $scope.empEmail,
           "department": $scope.empDepartment,
           "gender": $scope.empGender,
           "dob": $scope.empDOB,
           "age":Math.abs(ageDate.getUTCFullYear() - 1970),
      }).then(function(data) {
              console.log(data);
        if (data.data.updatedExisting) {
          _t.name = $scope.empName;
          _t.email= $scope.empEmail;
          _t.department= $scope.empDepartment;
           _t.gender=$scope.empGender;
           _t.dob=$scope.empDOB;
             _t.age=Math.abs(ageDate.getUTCFullYear() - 1970);
            $scope.empName = '';
      $scope.empEmail = '';
      $scope.empDepartment = '';
      $scope.empGender = 'Male';
      $scope.empDOB = '';
      $scope.empAge = '';
    $scope.isEdit=false;
      $scope.editIndex=-1;
        } else {
          alert('Oops something went wrong!');
        }
      });
    
  };
    
    
    $scope.cancel = function(i) {
        $scope.isEdit=false;
         $scope.empName = '';
      $scope.empEmail = '';
      $scope.empDepartment = '';
      $scope.empGender = 'Male';
      $scope.empDOB = '';
      $scope.empAge = '';
    };

  // Delete a Todo
  $scope.delete = function(i) {
      $scope.isEdit=false;
    employeesFactory.deleteEmp($scope.employees[i]._id).then(function(data) {
      if (data.data) {
        $scope.employees.splice(i, 1);
      }
    });
  };

});
