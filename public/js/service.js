angular.module('gradeApp.service', [])
  .factory('Grades', ['$http', function($http) {

    return {

    	addGrade : function(inputSubject,inputCredit,inputGrade,callback){
    		
    	var tmp = {
          name: inputSubject,
          grade: inputGrade,
          credit: inputCredit
        };

    		$http.get('/addGrade',{params:tmp})
    		.success(function(data, status, headers, config){
    			callback(data);
    		}).
    		error(function(data, status, headers, config){
    			console.log(status);
    		});
    	},
    	getData : function(callback)
    	{
    		$http.get('/getData')
    			.success(function(data, status, headers, config){
    				callback(data);
    			}).
    			error(function(data, status, headers, config){
    				 callback({error: 1});	
    			});

    	},
    	deleteGrade : function(id,callback)
    	{
    		$http.get('/deleteGrade/'+id)
    			.success(function(data, status, headers, config){
    				callback(data);
    			}).
    			error(function(data, status, headers, config){
    				 callback({error: 1});	
    			});
    	},
    	edit : function(grade,callback)
    	{
    		$http.get('/editGrade/'+grade._id,{params:grade})
    		  .success(function(data,status,headers,config){
    		  	callback(data);
    		  }).
    		  error(function(data,status,headers,config){
    		  	callback({error: 1});	
    		  });
    	},
    	// searchSubject : function(index,grade,callback)
    	// {
    	// 	$http.get('/getData'+index,{params:grade})
    	// 		.success(function(data,status,headers,config)){
    	// 			callback(data);
    	// 		}.
    	// 		error(function(data,status,headers,config){
    	// 			callback({error:1});
    	// 		});
    	// }
   

    }

  }]);