angular.module('todoApp')
.service('UtilService',function($localStorage){
		this.setItem=function(key,value){
			$localStorage.key=JSON.stringify(value);
		};
		this.getItem = function(key){
			return $localStorage.key;
		};
		
})