





//BINARY TO DECIMAL  
function binToDec(){
  var binum = document.getElementById("binary").value;
  var result=binary(binum);
  document.getElementById("result").innerHTML = result;
}  

//DECIMAL TO BINARY
function decToBin()	//richiamata converte da decimale a binario
{
	var number = document.getElementById("decimal").value;
	var result=decimal(number);
	document.getElementById("result").innerHTML = result;
} 

function decimal(number)	//trasforma il numero in binario
{
  	var sign, exp, man;
	var string = "";
    sign=(number[0] === "-" ? "1" : "0");	//se il numero inizia con - mette 1 altrimenti 0
  
    if (number.toLowerCase() === "infinity")	//caso infinito
    {
		exp = (+("255")).toString(2);	//converte 255 nel corrispondente binario
      	man = "0".repeat(23);
    }
  	else if(number.toLowerCase() === "nan")
    	return "00000000011111111111111111111111";
  	else if(number == 0)
    {
    	return sign + "0".repeat(31);
    }
  	else
    {
      	if (number[0] === "-")
  			number = number.substring(1); //elimina il -
      	var integer, decimal;
      	if (number.indexOf(".") === -1)
        {
          	integer = number;
      		decimal = 0;
    	}
        else
        {
      		integer = number.substring(0,number.indexOf("."));	//intero è dall inizio fino al . 000.001	1.000
          	decimal = "0" + number.substring(number.indexOf("."));	//decimle è dal .+1 alla fine
    	}

      	var integerbin = (+integer).toString(2);
      	console.log("Integerbin " + integerbin);
        var decimalbin = calculateBinaryMantissa(decimal);
      	console.log("decimalbin " + decimalbin);
      	var binaryNum = integerbin + "." + decimalbin.substring(2);
      
      	console.log("normalizer " + normalizer(binaryNum));
		man = normalizer(binaryNum)[0];
      	exp = normalizer(binaryNum)[1];
      	
      	man = man.substring(2,25);
      	
    }
  
  	var IEE754 = sign+exp+man;
  	return [IEE754,sign,exp,man];
}

function calculateBinaryMantissa(decimal)	//calcola la mantissa binaria da un numero intero decimale
{
	var binary = "";
  
	for(var i = 0; i < 50; i++)
    {
    	if((decimal * 2) >= 1)	//se la somma è maggiore di 1 aggiungo 1
        {
      		binary = binary + "1";
          	decimal = (decimal * 2) - 1;
        }
      	else	//altrimento aggiungo 0
        {
        	binary = binary + "0";
          	decimal = decimal * 2;
        }
    }
  
  	return binary;
}
  
function normalizer(binaryNum){	//normalizza il numero portando la virgola dopo il primo 1 incontrato
	var mantissa = "";
	if(binaryNum[0] === "0")	//se il numero inizia con 0
    {
    	mantissa = "1." + binaryNum.substring(binaryNum.indexOf("1")+1);	//inizia la mantissa dal primo 1
        exp = -(binaryNum.indexOf(".") - binaryNum.indexOf("1"));	//calcola l esponente in base agli spostamenti a destra (esp -)
    }
  	else	//se non inizia con 0 l esponente non puo essere negativo
    {
      	exp = binaryNum.indexOf(".") - 1;
      	mantissa = "1." + binaryNum.substring(1).replace(".","");
    }
  	
  	exp = (exp + 127).toString(2);
  	if (exp.length < 8)
    {
    	var lung = 8 - exp.length;
      	exp = ("0".repeat(lung)) + exp; 
    }
	 /*
     var arr=[];
     arr[]=mantissa;
     arr[]=exp;
     return arr;
     */
  	return [mantissa,exp];
}

function binary(binum)
{
  if(parseInt(binum,2) === 0)
    return "The value is conventionally 0";
  else
  {
  	var sign = binum[0];
    var exp = binum.substr(1,8);
    var man = binum.substring(9,32); 
    console.log(sign + " " + exp + " " + man);
    console.log(sign+exp+man === "00111111000011001100110011001101")
    
    if (parseInt(exp,2) === 255 && parseInt(man,2) === 0)	//control if the number is infinity
      return "Infinity";
    else if(parseInt(exp,2) === 255 && parseInt(man,2) !== 0)	//control if the number is NaN
      return "NaN";
    else
    {
    	var number = binary_conversion(sign, exp, man);
      var rounded_number = number.toFixed(3);
      return number + " ≈ " + rounded_number;
    }
  }
}

function binary_conversion(sign, exp, man)
{
  
	sign = (sign === "1" ? -1 : 1); //Assegnamento segno binario
  exp = parseInt(exp,2) - 127; //Exponent excess 127
  console.log(binary_man_unpacker(man));
  man = 1 + binary_man_unpacker(man);
 console.log(man);
  number = sign * man * Math.pow(2,exp);
  return number;
}



function binary_man_unpacker(man)
{
	var count = 0;
	for(var i = 0; i < man.length; i++)	//calculate the value of the mantissa
  {
		if(man[i] === "1")
			count = count + Math.pow(2, -(i + 1));	//somma gli elevamenti progressivi di -2 quando incontra 1
  }
  return count;
}