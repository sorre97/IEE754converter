//DECIMAL TO BINARY
function decToBin() { //richiamata converte da decimale a binario
  var number = document.getElementById('decimal').value;
  var result = decimal(number)[0];
  document.getElementById('resultdec').innerHTML = result;
}
function decimal(number) {
  number = number.toLowerCase();
  var sign, exp, man; //Variables

  if (number.replace(/\+/g, '').replace(/\-/g, '') === 'infinity') {
    sign = '0';
    exp = (+'255').toString(2); //255 in binary
    man = '0'.repeat(23); //23 zeros for mantissa
  } else if (number == 'nan') {
    sign = '0';
    exp = (+'255').toString(2); //255 in binary
    man = '1'.repeat(23);
  } else if (number == 0) {
    sign = number[0] === '-' ? '1' : '0';
    exp = '0'.repeat(8);
    man = '0'.repeat(23);
  } else {
    try {
      number = number.replace(",",".");
      console.log(number);
      number = parseFloat(number); //Converting to float
      if (isNaN(number)) throw Error;
    } catch (Error) {
      return ['Wrong value'];
    }
    sign = number < 0 ? '1' : '0'; //Sign assignment
    number = Math.abs(number); //Absolute value

    var integer = Math.floor(number); //Extracting integer
    var decimal = number - integer; //Extracting decimal part

    var integerbin = integer.toString(2); //Integer part binary conversion
    var decimalbin = binaryMantissa(decimal); //Decimal part binary conversion
    var binaryNum = integerbin + '.' + decimalbin; //binary composition

    /*
    normalizer() function returns an array of two elements, the first is the mantissa value with 1.* and the second is the exponent in excess 127 converted in binary
    */
    man = normalizer(binaryNum)[0];
    exp = normalizer(binaryNum)[1];

    man = man.substring(2, 25); //Conventionally deleting 1. from mantissa and taking 23 digits
  }

  var IEE754 = sign + exp + man;
  console.log(IEE754);
  return [IEE754, sign, exp, man];
}

function binaryMantissa(decimal) {
  var binary = '';
  for (var i = 0; i < 50; i++) {
    if (decimal * 2 >= 1) {
      binary += '1';
      decimal = (decimal * 2 - 1).toFixed(8);
    } else {
      binary += '0';
      decimal *= 2;
    }
  }
  return binary;
}
//0.0010100101...
function normalizer(binaryNum) {
  var string = '';
  var exp = 0;
  //0.0010100101...
  if (binaryNum[0] == '0') {
    string = '1.' + binaryNum.substring(binaryNum.indexOf('1') + 1);
    exp = -(binaryNum.indexOf('1') - 1);
  } else {
    //110101.0010101
    string = '1.' + binaryNum.substring(1).replace('.', '');
    exp = binaryNum.indexOf('.') - 1;
  }
  exp = (exp + 127).toString(2);
  exp = zfill(exp, 8);
  return [string, exp];
}

function zfill(str, max) {
  str = str.toString();
  return str.length < max ? zfill('0' + str, max) : str;
}


//BINARY TO DECIMAL
function binToDec() {
  var binum = document.getElementById('binary').value;
  var result = binary(binum);
  document.getElementById('resultbin').innerHTML = result;
}

function binary(binum) {
  if (parseInt(binum, 2) === 0) return 'The value is conventionally 0';
  else {
    var sign = binum[0];
    var exp = binum.substr(1, 8);
    var man = binum.substring(9, 32);

    if (
      parseInt(exp, 2) === 255 &&
      parseInt(man, 2) === 0 //control if the number is infinity
    )
      return 'Infinity';
    else if (
      parseInt(exp, 2) === 255 &&
      parseInt(man, 2) !== 0 //control if the number is NaN
    )
      return 'NaN';
    else {
      var number = binary_conversion(sign, exp, man);
      var rounded_number = number.toFixed(8);
        
      return number + ' ≈ ' + parseFloat(rounded_number);
    }
  }
}

function binary_conversion(sign, exp, man) {
  sign = sign === '1' ? -1 : 1; //Assegnamento segno binario
  exp = parseInt(exp, 2) - 127; //Exponent excess 127
  man = 1 + binary_man_unpacker(man);
  number = sign * man * Math.pow(2, exp);
  return number;
}

function binary_man_unpacker(man) {
  var count = 0;
  for (
    var i = 0;
    i < man.length;
    i++ //calculate the value of the mantissa
  ) {
    if (man[i] === '1') count = count + Math.pow(2, -(i + 1)); //somma gli elevamenti progressivi di -2 quando incontra 1
  }
  return count;
}
