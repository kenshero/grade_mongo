angular.module('gradeApp', ['gradeApp.service','ngDialog'])
  .controller('Ctrl', ['$scope','Grades','$filter',
   function($scope,Grades,ngDialog,$filter) {

    $scope.grades=[];
    
    //var orderBy = $filter('orderBy');

    Grades.getData(function(data){
      $scope.grades=data;
    });

    

    $scope.addGrade=function(inputSubject,inputCredit,inputGrade)
    {
      Grades.addGrade(inputSubject,inputCredit,inputGrade,function(data){
         Grades.getData(function(data){
            $scope.grades=data;
          });
      });   
    };

    $scope.delete=function(id)
    {
      Grades.deleteGrade(id,function(data){
          Grades.getData(function(data){
            $scope.grades=data;
          });
      });

    };

    $scope.edit=function(grade)
    {
      Grades.edit(grade,function(data){
        Grades.getData(function(data){
            $scope.grades=data; 
        });
      });
    };

  /*  $scope.order=function(predicate,reverse)
    {
      $scope.grades = orderBy($scope.grades, predicate, reverse);
    };
*/
  }]);