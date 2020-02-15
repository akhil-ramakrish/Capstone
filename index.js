 var operator="";
 var currentValue="";
 var  num ="";
 var calcList=[];
 var count=0;
 var formatNumber="";
 var flag;
 var currentOperator="";
 var operatorCount=0;

 function disableOperatorButtons(){
      var operatorButtons = document.getElementsByClassName("grid-item operator");
      for(var i=0;i<operatorButtons.length;i++){
            operatorButtons[i].disabled =true;
      } 
 }

 function enableOperatorButtons(){
       var operatorButtons = document.getElementsByClassName("grid-item operator");
       for(var i=0;i<operatorButtons.length;i++){
             operatorButtons[i].disabled = false;
       }
 }

function getResult(){
  return document.getElementById('result').innerText;
}

function printResult(value){
document.getElementById('result').innerText = value;
}

function toggleOpButtons(){
      if(currentValue==""){
            disableOperatorButtons();
            console.log(currentValue);
            return false;
        }
      else{
             enableOperatorButtons();
             console.log(currentValue);
             return true;
            }
}


function getInput(inputValue){
 var active=toggleOpButtons();
if(inputValue==='='||inputValue==='+'||inputValue==='-'||inputValue==='x'|| inputValue==='\xf7' || inputValue==='\x25' ){
      count=0;
      operatorCount++;
      formatNumber="";
      operator=inputValue;
      currentOperator=operator;
    if(active){
                 if(operatorCount>1){
                   console.log(operatorCount);
                   currentValue = currentValue + "";
                   operatorCount--;
                 }
                 else{
                       currentValue = currentValue+inputValue;
                    }
               
                 printResult(currentValue); 
           }
      if(inputValue==="="){
            processInput(currentValue.replace(/,/g,''));
            console.log(calcList);
            printResult(compute(calcList).toLocaleString("en"));
            operatorCount=0;
            calcList=[];
            currentValue=getResult();
             
      }
}
else if(inputValue==='C'||inputValue==='CE'){
   count=0;
   formatNumber="";
   clear(inputValue);
}
else{ 
       count++;
       operatorCount=0;
        formatNumber=formatNumber+inputValue;
       if(count>3){
            var csNum = Number(formatNumber);
            if(currentOperator){
                          
                          var getIndex = currentValue.indexOf(currentOperator);
                          var newValue=currentValue.slice(0,getIndex+1);
                          currentValue = newValue+csNum.toLocaleString("en");
            } 
            else{
                  currentValue = csNum.toLocaleString("en");
            }
       }
       else{
            if(flag){

                  if(currentOperator){
                        var getIndex=currentValue.indexOf(currentOperator);
                        var preValue = currentValue.slice(0,getIndex+1); 
                        var alteredVal=currentValue.slice(getIndex+1);
                        if(alteredVal){
                              var newVal = alteredVal.replace(/,/g,'');
                              currentValue = preValue+Number(newVal+inputValue).toLocaleString("en");
                        }
                        
                  }
                  else{
                        var newNum = currentValue.replace(/,/g,'');
                        currentValue=Number(newNum+inputValue).toLocaleString("en"); 
                  }
                  flag=false;
          }
          else{currentValue = currentValue+inputValue;}
            
       }
      
      printResult(currentValue);
      enableOperatorButtons();

}

}

function clear(inputValue){
  if(inputValue==='C'){
      currentValue="";
      operator="";
      currentOperator="";
      printResult(currentValue);
      calcList=[];
  }
  else{
         var deleteLastChar = currentValue.substr(0,currentValue.length-1);
         currentValue = deleteLastChar;
         //trace current operator in reverse to find current operator
         for(i=currentValue.length;i>0;i--){
                if(currentValue[i]==='+'||currentValue[i]==='-'||currentValue[i]==='x'|| currentValue[i]==='\xf7' || currentValue[i]==='\x25'){
                   currentOperator=currentValue[i]; 
                   break;
                }
                else{currentOperator='';}
         }

         if(currentOperator){
            var indexOfOperator = currentValue.indexOf(currentOperator);
            var preValue = currentValue.slice(0,indexOfOperator+1);
            var alteredValue = currentValue.slice(indexOfOperator+1);
            if(alteredValue){
                  var displayCorrectFormat = alteredValue.replace(/,/g,'');
                  var format_To_Num = Number(displayCorrectFormat).toLocaleString("en");
                  currentValue=preValue+format_To_Num;
            }

            
         }
         else{    
                 var newNum = currentValue.replace(/,/g,'');
                 currentValue=Number(newNum).toLocaleString("en");
         }
         printResult(currentValue);
         flag=true;
         calcList=[];
  }
}


function processInput(processValue){
   for(var i=0;i<processValue.length;i++){
         if(processValue[i]==='='||processValue[i]==='+'||processValue[i]==='-'||processValue[i]==='x'|| processValue[i]==='\xf7' ||processValue[i]==='\x25'){
               operator=processValue[i];
               if(num){
                   calcList.push(Number(num));
                   calcList.push(operator);
                   num="";
               }

         }
         else{
                num = num + processValue[i];
         }
   }
}


function compute(calcdata){
      var calc_operator="";
      var num1 =0;
      var num2=0;
      var result=0;
      var index=0;
    for(var i=0;i<calcdata.length;i++){
          if(calcdata[i]==="="){
                return result;
          }
          if(calcdata[i]==='+'||calcdata[i]==='-'||calcdata[i]==='x'|| calcdata[i]==='\xf7' ||calcdata[i]==='\x25'){
                calc_operator = calcdata[i];
                num1 = calcdata[i-1];
                num2 = calcdata[i+1];
                index = i+1;
                switch(calc_operator){
                  case '+':result=num1+num2;
                           break;
                  case '-':result=num1-num2;
                            break;
                  case 'x': result = num1*num2;
                            break;
                  case '\xf7':result = num1/num2;
                               break;
                  case '\x25':result=(num1/100)*num2;
                              break;
                  default: console.log("error");
                }
                calcdata[index]=result;
          }
         
          

    }
}