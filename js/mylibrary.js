(function(globle, $){

    var TransformInputToArray=function(inputval){
        return new TransformInputToArray.init(inputval);
    }

    var operators=['>','<','>=','<=','='];
    function validationString(s){
        if(s.indexOf('(')==-1||s.indexOf(')')==-1||s.indexOf('(')==0||s.indexOf(')')==s.indexOf('(')+1||s.indexOf('(')>s.indexOf(')')){
            return false;
        }
        return true;
    }
    //seperate the query to three parts two operand and one operator
    function separateoperator(s){
        var len = s.length;
        //store the result
        var result=[];
        var index;
        //find the operator's position
        for(let i=0;i<len;i++){
            if(operators.includes(s.charAt(i))){
                
                index=i;
                break;
            }
        
        }
        if(index){
            result.push(s.slice(0,index));
            result.push(s.slice(index,index+1));
            result.push(s.slice(index+1));
        }
        return result;
        
    }
    
    
    //transfer the input sting to array
    function turnStringToArray(s){
        

        var result=[];
        
        if(s==null||s.length==0) return result; 
        
        //get rid off space at the begin, mid and end of the string
        s=s.replace(/^\s+|\s+|$\s/g, '');
       
        if(validationString(s)){

            //get function name as the first element
            var endOfFunctionName=s.indexOf('(');

            result.push(s.slice(0,endOfFunctionName));
           
            //get query
            var end = s.length-1;
            //if no special field needs to display
            if(s.indexOf(',')==-1){
                //get the query section
                var query = s.slice(endOfFunctionName+1, end);
                //seperate query section to operands and operator
                var quaryArray = separateoperator(query);
               
                if(quaryArray.length!=0){
                   result=result.concat(quaryArray);
                    
                    
                }else{
                  result.length=0; 
                   
                } 
                

                
            }else{
                
                //if there is special field needs to display
                
                 //get the query section
                var query = s.slice(endOfFunctionName+1, s.indexOf(','));
                //seperate query section to operands and operator
                var quaryArray = separateoperator(query);
                if(quaryArray.length!=0){
                   
                   result=result.concat(quaryArray);
                    
                }else{
                   result.length=0;  
                  
                } 
                if( result.length!=0){
              
                result.push(s.slice(s.indexOf(',')+1, end)); 
                       console.log(result);
                }
                
            }

        }
       

        return result;

    }
     
    TransformInputToArray.prototype={
       inputArray: function(){
           return turnStringToArray(this.inputval)
       }
//       inputArray:turnStringToArray(this.inputval)
        

    };
    TransformInputToArray.init = function(inputval){
        var self = this;
        self.inputval=inputval||"";
    }
    TransformInputToArray.init.prototype=TransformInputToArray.prototype;
    globle.TransformInputToArray=globle.TA$=TransformInputToArray;



}(window, jQuery))