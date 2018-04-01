"use strict";
//Anton Björkman
//Construktor function
function Calculator(){

}
// Checks if the input from the parameters 
// really are numbers.
// This i done by using the "typeof" method.
// Returns true if both the inputs are numbers else
// the method returns false.
Calculator.prototype.checkIfNumbers = function(a,b){
    if(typeof a == "number" && typeof b == "number"){
        return true;
    }
    else{
        return false;
    }
}
// Adds the the input together and 
// returns the sum. If some of the input are not 
// a number, then the method returns 0.
Calculator.prototype.add = function(a,b){
    if(this.checkIfNumbers(a,b)){
        return a + b;
    }
    return 0;
        
}
// Subtracts the the input and 
// returns the sum. If some of the input are not 
// a number, then the method returns 0.
Calculator.prototype.subtract = function(a,b){
    if(this.checkIfNumbers(a,b)){
        return a - b;
    }
    return 0;
}
// Multiplies the the input together and 
// returns the sum. If some of the input are not 
// a number, then the method returns 0.
Calculator.prototype.multiply = function(a,b){
    if(this.checkIfNumbers(a,b)){
        return a * b;
    }
    return 0;
}
// Divides the the input and 
// returns the sum. If some of the input are not 
// a number, then the method returns 0.
Calculator.prototype.divide = function(a, b){
    if(this.checkIfNumbers(a,b)){
        if(a !== 0 && b !== 0){
            return a / b;
        }
            
    }
    return 0;
    
}
// Calculate takes an input of an array.
// The objects in the array must have a Value1, Value2 and the 
// the choosen operation.
// If the array matchtes this object then it will loop throw the 
// array and out put the result. 
// If there is an error the method will retun 0.
Calculator.prototype.calculate = function(input){
    if(Array.isArray(input)){
        for(var i = 0; i < input.length;i++){
            var operations = input[i];
            switch(operations.operator){
                case "add":
                console.log(this.add(operations.val1,operations.val2));
                break;
                case "divide":
                console.log(this.divide(operations.val1,operations.val2));
                break;
                case "subtract":
                console.log(this.subtract(operations.val1,operations.val2));
                break;
                case "multiply":
                console.log(this.multiply(operations.val1,operations.val2));
                break;
                default:
                return 0;
                break;
            }
        }
    }
    else{
        console.log(0);
    }

}

var cal = new Calculator();
var array = 
[
    {val1:1,val2:2,operator:"add"},
    {val1:100,val2:90,operator:"divide"},
    {val1:14,val2:1,operator:"subtract"},
    {val1:26,val2:83,operator:"multiply"}
];

cal.calculate(array);

