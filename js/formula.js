var app = angular.module('strideApp',[]);
//Function factory
app.factory("Formulas", function(){
    var formulas=["sum(@predictive, @revenue)","min(@predictive, @revenue)","count(@quantity>1000)","avg(@predictive, @revenue)" ,"max(@predictive, @revenue)"];

    return formulas;
});

//Data Factory 
app.factory('dataFactory', function($http){
    return {
        get:function(url){

            return $http.get(url).then(function(res){

                return res.data;
            })
        }
    }
});
//controller for computation 
app.controller('myCtrl',function($scope,Formulas,dataFactory,validationService){

    //get the formula list based on the input function
    //GET THE FORMULA LIST from data factory
    $scope.formulas=Formulas;
    //filter the data 
    $scope.myfilter;
    $scope.calculation;

    //sample data
    $scope.data;
    dataFactory.get('dataJson/data.json').then(function(data){
        $scope.data = data;
    })


    //select a list item
    $scope.val=""
    //    $scope.selectedItem=function(){
    //        console.log(`the selected item is ${$scope.val}`);
    //
    //    }
    $scope.calculate = function(){
        if($scope.val==""){
            
               $scope.textColor={
                "color":"red" 
            }
            $scope.calculation="Please input a function";
        }else{
            //create a convert object
            var inputObj = TA$($scope.val);
            //convert the input string to array
            var theArray = inputObj.inputArray();
            if(theArray.length==0){
                $scope.textColor={
                    "color":"red" 
                }
                $scope.calculation="please write a valid function";
            }else{

                if(validationService.valid(theArray)){
                    $scope.calculation=validationService.sum($scope.data,theArray);
                    //create a filter to display the value that satisfied the query only Or say, create a filter according the query
                    $scope.myfilter=function(x){

                        if(eval(x[theArray[1]]+theArray[2]+theArray[3])){
                            return x;
                        }
                    }


                }else{
                    $scope.textColor={
                        "color":"red" 
                    }
                    $scope.calculation="please write a valid function";

                }


            }

        }



    }



});

//Service for validation input field and do calculation
app.service('validationService', function(){
    //service object 
    var obj={};
    //suport fucntions: Use them to validate the input field is supported or not
    var functionlist=['avg', 'sum','count','max','min'];
    var field=['quantity','revenue','create_at'];
    
    //validate input field
    obj.valid=function (arr){
        var len =arr.length;
        if(len==4&&functionlist.includes(arr[0])&&field.includes(arr[1])){
            return true;
        } else if(len==5&&functionlist.includes(arr[0])&&field.includes(arr[1])&&field.includes(arr[4])){
            return true;
        }else{
            return false; 
        }

    }
   //SUM function
    obj.sum = function(data, theArray){
        var sum = 0;

        for(let i in data){
            var query = data[i][theArray[1]]+theArray[2]+theArray[3];


            if(eval(query)){

                sum+=data[i][theArray[4]];
            }  
        }


        return sum;
    }

    return obj;
});

//Create a typeahead dirctive
app.directive('typeahead',function($timeout){

    return {
        restrict:'AEC',
        scope:{

            formulas:"=",
            prompt:"@",
            model:"=",
            select:'&'


        },
        link:function(scope,elem,attr){
            scope.getSelection=function(theItem){
                scope.model=theItem;

                scope.current=0;
                scope.selected=true;
                $timeout(function(){

                    scope.select();
                },200);

            };
            scope.current = 0;
            scope.selected=true;
            scope.isCurrent = function(index){
                return scope.current==index;
            };
            scope.setCurrent=function(index){
                scope.current=index;
            };
        },


        templateUrl:"templates/typeahead.html"
    }

})