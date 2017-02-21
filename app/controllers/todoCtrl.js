'use strict';

/**
 * @ngdoc function
 * @name portfolioApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the portfolioApp
 */
angular.module('todoApp')
  .controller('AppCtrl',['$scope','UtilService', function ($scope, UtilService) {
  	$scope.showaddcatdiv=false; // hide add new list div at inital stage
  	$scope.todoformObj={};
  	if(UtilService.getItem('TodoList')){
  	$scope.categoryList=JSON.parse(UtilService.getItem('TodoList')); // get category list from local storage
   }
   else{
   	$scope.categoryList=[];
   }

// the following method is to add a new todo
    $scope.todoAdd = function(category,todoObj,formObj) { 

    	var insertTodo=todoObj;
    	if(!$scope.FindItem(category.todoList,insertTodo.title)){
        category.todoList.push(insertTodo);
       // UtilService.setItem('TodoItems',category.todoList);
       UtilService.setItem('TodoList',$scope.categoryList); // update local storage category list
        formObj.todoInput='';
        }
        else{
        	alert('you alrady have a todo with that name');
        }
    };
// the following method is to add a new list
    $scope.todoCatAdd = function(catTitle){
	var categoryListObj={
		title:catTitle,
  		todoList:[]
	};
		if((!$scope.FindItem($scope.categoryList,catTitle))){
		$scope.categoryList.push(categoryListObj);
		UtilService.setItem('TodoList',$scope.categoryList); // update local storage category list
		$scope.todoCatTitle='';
		$scope.showaddcatdiv=false;
		}
		else{
			//console.log(($scope.FindItem($scope.categoryList,catTitle)));
			alert('you already have a category with that name');
		}
	};

	// the following method is used to find whether a todo item or todo list already there or not
$scope.FindItem=function(obj,item){
if(obj.length){	
 var res=obj.some(function ( Iobj ) {
    return Iobj.title === item;   
});
 return res;
}
};

// the following method is used to delete an item from the collection
$scope.deleteItem=function(list,item){
		list.find(function(listObj,index){
			if (listObj && listObj.title==item.title){
				list.splice(index,1);
			}
		});
		return list;
}

// the following method is used to delete todo
$scope.deleteTodo = function(todoList,todoItem){
		$scope.deleteItem(todoList,todoItem);
		UtilService.setItem('TodoList',$scope.categoryList); // update local storage category list
};

//the following method is used to delete entire todo list
$scope.deleteTodoCategory = function(categoryList,category){
		$scope.deleteItem(categoryList,category);
		UtilService.setItem('TodoList',$scope.categoryList); // update local storage category list
};

//the following method is used to mark complete a todo list
$scope.completeTodo = function(item){
	item.done=true;
	UtilService.setItem('TodoList',$scope.categoryList); // update local storage category list
}
}])


