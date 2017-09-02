



  
function binToDec(){
  var binum = document.getElementById("binary").value;
  var result=binary(binum);
  document.getElementById("result").innerHTML = result;
}  

function binary(binum)
{
  if(parseInt(binum,2) === 0)
    return "The value is conventionally 0";
  else
  {
  	var sign = binum.substr(0,1);
    var exp = binum.substr(1,8);
    var man = binum.substr(8);
    
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