angular.module('todoApp')

.directive('contenteditable', function() {
        return {
            require: 'ngModel',
            link: function(scope, elm, attrs, ctrl) {
                // view -> model
                elm.bind('blur', function() {
                    scope.$apply(function() {
                        ctrl.$setViewValue(elm.html());
                    });
                });

                // model -> view
                ctrl.$render = function() {
                    elm.html(ctrl.$viewValue);
                };

            }
        };
    })

.directive('textOnly',function(){
    return {
            require: 'ngModel',
            link: function(scope, elm, attrs, ctrl) {
                ctrl.$parsers.push(function(inputVal){
                    var viewVal;
                    if(!inputVal){
                        return ''
                    }
                    else{
                       viewVal =  inputVal.replace(/[^a-zA-Z ]/, '')
                    }
                    if(viewVal!=inputVal){
                    ctrl.$setViewValue(viewVal);
                    ctrl.$render();
                }
                    return viewVal;
                });


            }
        };
})