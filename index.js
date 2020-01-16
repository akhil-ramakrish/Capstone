var displayValue="";
var operator="";
var result = 0;
var count=0;
var flag=true;
var newResult="";
var continueCalc="";

function getResult(){
    return document.getElementById('result').innerText;
}

function printResult(value){
    document.getElementById('result').innerText=value;
}

function getSubResult(){
  return document.getElementById('sub-result').innerText;
}

function printSubResult(value){
   document.getElementById('sub-result').innerText=value;
}

function getInput(inputValue){
  
  if(inputValue==='='||inputValue==='+'||inputValue==='-'||inputValue==='x'|| inputValue==='\xf7' || inputValue==='\x25' ){
            //process accordingly
            if(inputValue==='=')
            { 
              printResult(result);
              printSubResult("");
              displayValue="";
              result=0;
              flag=true;
            }
            else{ 
                  operator = inputValue;
                  printResult(getResult()+inputValue);
                  displayValue=getResult();
                }
  
  }
 else if(inputValue==='C'||inputValue==='CE'){
      //process accordingly
      Clear(inputValue);
  }
  else{
    //process accordingly
      displayValue=displayValue+inputValue;
      printResult(displayValue);
      if(result!=0){
         continueCalc = result+operator+inputValue;
        var values=continueCalc.split(operator);
        if(values[0]&&values[1]){
           newResult=compute(operator,false);
        }
        printSubResult(newResult);
      }
      if(operator&&flag){
        var values=getResult().split(operator);
        if(values[0]&&values[1]){
          printSubResult(compute(operator,true));
          flag=false;
        }
      }
    
      
      
  }
  
}

function Clear(value){
  if(value==='C'){
      printResult("");
      printSubResult("");
      displayValue="";
      result=0;
  }
  else{
        var presentText=getResult(); 
        var newText = presentText.substr(0,presentText.length-1);
        printResult(newText);
        displayValue=getResult();
        var values=getResult().split(operator);
        if(values[0]&&values[1]){printSubResult(compute(operator));}
        var lastchar =newText.substr(newText.length-1,1);
        if(lastchar=="+"||lastchar=="-"||lastchar=="x"||lastchar=="\xf7"||lastchar=="\x25"){
          printSubResult("");
        }
        result=0;
        flag = true;
  }

}
 function compute(operator,first){
   if(first){
            console.log(operator);
            var num1=0;
            var num2=0;
            var getValues = getResult().split(operator); 
        
            if(getValues[0].includes(".")){ num1 = parseFloat(getValues[0]);}
            else{num1 = parseInt(getValues[0]);}
        
            if(getValues[1].includes(".")){ num2=parseFloat(getValues[1]);}
            else{num2 = parseInt(getValues[1]);}
            
            
            switch(operator){
              case '+': result = num1 + num2;
                        break;
              case '-':result = num1 - num2;
                      break;
              case 'x':result = num1 * num2;
                        break;
              case '\xf7':result = num1/num2;
                          break;
        
              case '\x25':result=(num1/100)*num2;
                          break;
                default: console.log("error");
            }
          displayValue=getResult();
  
   }
   else{
          console.log(operator);
          var num1=0;
          var num2=0;
          var getValues = continueCalc.split(operator); 
      
          if(getValues[0].includes(".")){ num1 = parseFloat(getValues[0]);}
          else{num1 = parseInt(getValues[0]);}
      
          if(getValues[1].includes(".")){ num2=parseFloat(getValues[1]);}
          else{num2 = parseInt(getValues[1]);}
          
          
          switch(operator){
            case '+': result = num1 + num2;
                      break;
            case '-':result = num1 - num2;
                    break;
            case 'x':result = num1 * num2;
                      break;
            case '\xf7':result = num1/num2;
                        break;
      
            case '\x25':result=(num1/100)*num2;
                        break;
              default: console.log("error");
          }
        displayValue=getResult();

   }
   return result;
 }


