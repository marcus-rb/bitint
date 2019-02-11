/* ----- bitint.js ------
 * A JavaScript library/framework for working with integers of various sizes
 * Created: December 28th 2018
 * Last updated: February 8th 2019
 *
 * HUSK: OVERFLOW VED FLIPPING AV INTMIN VED SIGNERTE TALL
 *
 * REMEMBER: ADD VERIFICATION IN THE MATH OPERATIONS
 * CONTENTS
 * 1. Constants
 * 2. Verification & equalization
 * 3. Bitwise logic & operation
 * 4. Comparison operation
 * 5. Arithmetic operation
 * 6. Conversion methods
 * 7. Class system
 */

// ---- vv CONSTANTS vv ----

/* vv -- Zero through nine in binary -- vv */
const global_zeroThroughNine = [
  [false, false], //0
  [false, true], //1
  [true, false], //2
  [true, true], //3
  [true, false, false], //4
  [true, false, true], //5
  [true, true, false], //6
  [true, true, true], //7
  [true, false, false, false], //8
  [true, false, false, true], //9
];

/* vv -- 10 ^ [index] in binary -- vv */
const global_tenPowers = [
  [false, true], // 1
  [true, false, true, false], //10
  [true, true, false, false, true, false, false], //100
  [true, true, true, true, true, false, true, false, false, false], //1000
  [true, false, false, true, true, true, false, false, false, true, false, false, false, false], //10 000
  [true, true, false, false, false, false, true, true, false, true, false, true, false, false, false, false, false], //100 000
  [true, true, true, true, false, true, false, false, false, false, true, false, false, true, false, false, false, false, false, false], //1 000 000
  [true, false, false, true, true, false, false, false, true, false, false, true,
    false, true, true, false, true, false, false, false, false, false, false, false], //10 000 000
  [true, false, true, true, true, true, true, false, true, false, true, true, true,
    true, false, false, false, false, true, false, false, false, false, false, false, false, false], //100 000 000
   [true, true, true, false, true, true, true, false, false, true, true, false, true, false, true,
    true, false, false, true, false, true, false, false, false, false, false, false, false, false, false], //1 000 000 000
  [true, false, false, true, false, true, false, true, false, false, false, false, false, false, true,
    false, true, true, true, true, true, false, false, true, false, false, false, false, false, false,
    false, false, false, false], //10 000 000 000
  [true, false, true, true, true, false, true, false, false, true, false, false, false, false, true,
    true, true, false, true, true, false, true, true, true, false, true, false, false, false, false,
    false, false, false, false, false, false, false], //100 000 000 000
  [true, true, true, false, true, false, false, false, true, true, false, true, false, true, false,
    false, true, false, true, false, false, true, false, true, false, false, false, true, false, false,
    false, false, false, false, false, false, false, false, false, false], //1 000 000 000 000
  [true, false, false, true, false, false, false, true, true, false, false, false, false, true, false,
    false, true, true, true, false, false, true, true, true, false, false, true, false, true, false,
    true, false, false, false, false, false, false, false, false, false, false, false, false, false], //10 000 000 000 000
  [true, false, true, true, false, true, false, true, true, true, true, false, false, true, true,
    false, false, false, true, false, false, false, false, false, true, true, true, true, false,
    true, false, false, true, false, false, false, false, false, false, false, false, false, false,
    false, false, false, false], //100 000 000 000 000
  [true, true, true, false, false, false, true, true, false, true, false, true, true, true, true,
   true, true, false, true, false, true, false, false, true, false, false, true, true, false, false,
   false, true, true, false, true, false, false, false, false, false, false, false, false, false, false,
   false, false, false, false, false], //1 000 000 000 000 000
   [true, false, false, false, true, true, true, false, false, false, false, true, true, false, true, true,
     true, true, false, false, true, false, false, true, true, false, true, true, true, true, true, true, false,
     false, false, false, false, true, false, false, false, false, false, false, false, false, false, false, false,
     false, false, false, false, false], //10 000 000 000 000 000 - 10 ^16
   [true, false, true, true, false, false, false, true, true, false, true, false, false, false, true, false, true,
     false, true, true, true, true, false, false, false, false, true, false, true, true, true, false, true, true,
     false, false, false, true, false, true, false, false, false, false, false, false, false, false, false, false,
     false, false, false, false, false, false, false], //100 000 000 000 000 000 - 10 ^ 17
  [true, true, false, true, true, true, true, false, false, false, false, false, true, false, true, true, false,
    true, true, false, true, false, true, true, false, false, true, true, true, false, true, false, false, true,
    true, true, false, true, true, false, false, true, false, false, false, false, false, false, false, false, false,
    false, false, false, false, false, false, false, false, false], //1 000 000 000 000 000 000 - 10 ^ 18
  [true, false, false, false, true, false, true, false, true, true, false, false, false, true, true, true, false,
    false, true, false, false, false, true, true, false, false, false, false, false, true, false, false, true, false,
    false, false, true, false, false, true, true, true, true, false, true, false, false, false, false, false, false,
    false, false, false, false, false, false, false, false, false, false, false, false, false],
];

/* vv -- Returns 1 as a binary array equal in size to num-- vv */
const one = (num) => {
  let returnVal = num.map(()=>false);
  returnVal[returnVal.length-1] = true;
  return returnVal;
}

/* vv -- Returns 0 as a binary array equal in size to num-- vv */
const zero = (num) => num.map(()=>false);

// - - - - -

// ---- vv VERIFICATION & EQUALIZATION vv ----

/* -- < Bitint operation verification > -- */
const verifyBitArrays = (...bitarrs) => {
  for (let bitarr of bitarrs) {
    for (let bool of bitarr) {
      if (typeof(bool) !== "boolean") throw "TypeError: All data points must be of type boolean. Found:" + typeof(bool);
    }
  }
  return true;
}

const verifyLength = (num1, num2) => {
  if (num1.length !== num2.length) throw "TypeError: Operands must be of equal size to complete operation";
}

/* -- < Convert two bitarrays to same size > -- */
const equalizeTwo = (num1, num2, signed = false) => {
  verifyBitArrays(num1,num2);
  const longest = num1.length >= num2.length ? num1.slice() : num2.slice() ;
  const shortest = num1.length < num2.length ? num1.slice() : num2.slice() ;

  const lengthDifference = longest.length - shortest.length;

  if (signed) {
    if (shortest[0] === true) {
      let trues = [];
      for (let i = 0; i < lengthDifference; i++) trues.push(true);
      return [longest, trues.concat(shortest)];
    } else {
      return equalizeTwo(longest, shortest);
    }
  } else {
    let falseArray = [];
    for (let i = 0; i < lengthDifference; i++) {
      falseArray.push(false);
    }

    return [longest, falseArray.concat(shortest)];
  }
}

/* -- < Return unsigned operands > -- */

const unsignedOps = (num1, num2) => num1.length > num2.length ? equalizeTwo(num1, num2) :
                                      num1.length < num2.length ? equalizeTwo(num1, num2).reverse() : [num1.slice(), num2.slice()];

/* -- < Return signed operands > -- */

const signedOps = (num1, num2) => num1.length > num2.length ? equalizeTwo(num1, num2, true) :
                                    num1.length < num2.length ? equalizeTwo(num1, num2, true).reverse() : [num1.slice(), num2.slice()];

// - - - - -

// ---- vv BITWISE LOGIC & OPERATION ----

/* -- < bitwise logic > -- */
const or = (num1, num2) => num1.map((bool, index) => bool || num2[index] ? true : false);

const and = (num1, num2) => num1.map((bool, index) => bool && num2[index] ? true : false);

const xor = (num1, num2) => num1.map((bool, index) => bool !== num2[index] ? true : false);

const not = (num) => num.map(bool => bool ? false : true);

const nor = (num1, num2) => not(or(num1,num2));

const nand = (num1, num2) => not(and(num1,num2));

const xnor = (num1, num2) => not(xor(num1,num2));

/* -- < bitwise operation > -- */
const shift = (num, amount, arithmetic = false) => {
  let operand = num.slice();
  if (amount > 0) {
    if (arithmetic) {
      //Keep significant bit
      const bigEnd = operand.slice(0, 1);

      for (let i = 0; i < amount; i++) {
        operand.pop();
        operand.unshift(bigEnd[0]);
      }
      return operand;
    } else {
      //Ignore significant bit
      for (let i = 0; i < amount; i++) {
        operand.pop();
        operand.unshift(false);
      }
      return operand;
    }
  } else {
    if (arithmetic) console.warn("Warning: Logical and Arithmetic left shifts are equal, ignoring third parameter");

    for (let i = 0; i > amount; i--) {
      operand.shift();
      operand = operand.concat([false]);
    }
    return operand;


  }
}

const shiftr = (num, amount, arithmetic = false) => shift(num, amount, arithmetic);
const shiftl = (num, amount, arithmetic) => shift(num, -amount, arithmetic);

const rot = (num, amount) => {
  const front = num.slice(num.length - amount);
  const rear = num.slice(0, num.length - amount);

  if (amount < 0) return num.slice(-amount).concat(num.slice(0, -amount));
  return front.concat(rear);
}

const rotr = (num, amount) => rot(num, amount);
const rotl = (num, amount) => rot(num, -amount);

// - - - - -

// ---- vv COMPARISON OPERATION vv ----

const equals = (num1, num2) => {
  for (let i = 0; i < num1.length; i++) {
    if (num1[i] !== num2[i]) return false;
  }
  return true;
}

const greater = (num1, num2, signed = false) => {
  if (signed) { //Dependency : equalizeTwo(signed) -> minus(signed)
    const operands = signedOps(num1, num2);
    const signedness = operands[0][0] === operands[1][0] ? operands[0][0] ? 1 : 0 :
                          operands[0][0] && !operands[1][0] ? false : true ;

    if (typeof(signedness)!== "number") return signedness;
    if (signedness === 0) return greater(operands[0], operands[1]);
    if (signedness === 1) return greater(toPositive(operands[0]), toPositive(operands[1]));

  } else {
    const operands = unsignedOps(num1, num2);
    for (let i = 0; i < operands[0].length; i++) {
      if (operands[0][i] !== operands[1][i]) {
        return operands[0][i] ? true : false ;
      }
    }
    return false;
  }
}

const greaterOrEqual = (num1, num2, signed = false) => signed ? greater(num1, num2, true) || equals(num1, num2) ? true : false :
                                                                  greater(num1, num2) || equals(num1, num2) ? true : false;

const less = (num1, num2, signed = false) => signed ? greaterOrEqual(num1, num2, true) ? false : true :
                                              greaterOrEqual(num1, num2) ? false : true;

const lessOrEqual = (num1, num2, signed = false) => signed ? greater(num1, num2, true) ? false : true :
                                                      greater(num1, num2) ? false : true;

// - - - - -

// ---- vv MATH / ARITHMETIC vv ----

const add2 = (num1, num2, signed = false) => { //OBSOLETE
  verifyBitArrays(num1, num2);
  if (signed) {
    const operands = signedOps(num1, num2);

  } else {
    const operands = unsignedOps(num1, num2);
    let operand1 = operands[0].slice();
    let operand2 = operands[1].slice();

    while (operand2.indexOf(true)>-1) {
      const carry = and(operand1, operand2);
      operand1 = xor(operand1, operand2);
      operand2 = shiftl(carry, 1);
    }
    return operand1;
  }
}

const add = (num1, num2, signed = false) => {
  verifyBitArrays(num1, num2);
  const operands = signed ? signedOps(num1, num2) : unsignedOps(num1, num2);
  let operand1 = operands[0].slice();
  let operand2 = operands[1].slice();

  while(operand2.includes(true)) {
    const carry = and(operand1, operand2);
    operand1 = xor(operand1, operand2);
    operand2 = shiftl(carry, 1);
  }
  return operand1;
}

const multiply = (num1, num2, signed = false) => {
  verifyBitArrays(num1, num2);
  let operands;
  if (signed) {
    operands = signedOps(num1, num2);

    let operand1 = operands[0].slice();
    let operand2 = operands[1].slice();

    const signedness = operand1[0] === operand2[0] ? operand1[0] ? true : false :
      operand1[0] ? "first" : "last";

    if (signedness === true) {
      return multiply(toPositve(operand1), toPositve(operand1));
    } else if (signedness === false) {
      return multiply(operand1, operand2);
    } else if (signedness === "first") {
      return toNegative(multiply(toPositive(operand1),operand2));
    } else return toNegative(multiply(operand1, toPositive(operand2)));

  } else {
    operands = unsignedOps(num1, num2);

    let operand1 = operands[0].slice();
    let operand2 = operands[1].slice();

    let result = zero(operand1);
    const juan = one(operand1);

    while (operand2.includes(true)) {
      if (and(operand2, juan).includes(true)) result = add(result, operand1);
      operand1 = shiftl(operand1, 1);
      operand2 = shiftr(operand2, 1);
    }

    return result;
  }
}

const minus = (num1, num2, signed = false) => {
  verifyBitArrays(num1, num2);

  const operands = signed ? signedOps(num1, num2) : unsignedOps(num1, num2);
  let operand1 = operands[0].slice();
  let operand2 = operands[1].slice();

  while(operand2.includes(true)) {
    const borrow = and(not(operand1), operand2);
    operand1 = xor(operand1, operand2);
    operand2 = shiftl(borrow, 1);
  }
  return operand1;
}

const divide = (num1, num2, signed = false) => { //SOMETHINGS IS WRONG WITH THIS FUCKER
  // Figure out the sign
  // Convert both numbers to positive
  // Do the math
  // Convert to negative if sign
  if (signed) {
    const operands = signedOps(num1, num2);
    let operand1 = operands[0].slice();
    let operand2 = operands[1].slice();

    const sign = operand1[0] === operand2[0] ? false : true ;

    operand1 = operand1[0] ? toPositive(operand1) : operand1 ;
    operand2 = operand2[0] ? toPositive(operand2) : operand2 ;

    return sign ? toNegative(divide(operand1, operand2)) : divide(operand1, operand2) ;
  } else {
    const operands = unsignedOps(num1, num2);
    let operand1 = operands[0].slice();
    let operand2 = operands[1].slice();

    let quotient = zero(operand1);
    let juan = one(quotient);

    while(greaterOrEqual(operand1, operand2)) {
      operand1 = minus(operand1, operand2);
      quotient = add(quotient, juan);
    }

    return quotient;
  }
}

const divide2 = (num1, num2, signed = false) => {
  console.time();
  if (JSON.stringify(num2) === JSON.stringify(zero(num2))) throw "Error: Division by 0";
  if (JSON.stringify(num1) === JSON.stringify(zero(num1))) return zero(num1);
  if (signed) {
    const operands = signedOps(num1, num2);

    const sign = !(operands[0][0] === operands[1][0]);
    const signOfFirst = operands[0][0];
    //console.log("sign: \n"+ sign);

    return sign ? signOfFirst ? divide2(toPositive(operands[0]), operands[1]) : divide2(operands[0], toPositve(operands[1])) :
      signOfFirst ? divide2(toPositive(operands[0]), toPositive(operands[1])) : divide2(operands[0], operands[1]) ;
  } else {
    const operands = unsignedOps(num1, num2);
    let dividend = operands[0].slice();
    let divisor = operands[1].slice();

    let result = zero(dividend);
    const _one = one(dividend);

    while (greaterOrEqual(dividend, divisor, true)) {
      //console.log("Nåværende rest:"+tonum(dividend));
      dividend = minus(dividend, divisor, true);
      result = add(result, _one);
    }
    console.timeEnd();
    return result;
  }
}

const div = (num1, num2, signed = false) => {
  if (signed) {

  } else {
    console.time();
    const operands = unsignedOps(num1, num2);
    let dividend = operands[0].slice();
    let divisor = operands[1].slice();


    let rest = dividend.slice();
    let result = zero(dividend);
    let currentFactor = 0;
    let divisionCount = 0;

    while(greaterOrEqual(rest, divisor)) {
      currentFactor = 0;
      let divisorCopy = divisor.slice();
      do {
        divisorCopy = shiftl(divisorCopy, 1);
        currentFactor++;
      } while (greater(rest, divisorCopy))
      let divisorCopyCopy = divisor.slice();
      // Rest - divosor << (currentFactor-1)
      rest = minus(rest, shiftl(divisorCopyCopy, currentFactor-1));
      divisionCount+= 2**(currentFactor-1);
    }


    console.timeEnd();
    return numToBitint(`${divisionCount}`, num1.length)
  }
}

const modulo = (num, modfactor, signed = false) => { //THIS IS ALMOST USELESS: SOMETIMES WORKS; SOMETIMES DONT
  const modActual = typeof(modfactor) === "number" ? numToBitint(`${modfactor}`, num.length, signed ? true : false) : modfactor ;

  return and(num, modActual);
}

const moduloAdd = (num1, num2, signed = false) => {

}

// - - - - -

// ---- vv CONVERSION METHODS vv ----
const toNegative = (num) => add(not(num),one(num));

const toPositive = (num) => not(minus(num, one(num)));

const snapToSize = (num, size) => num.slice(num.length-size);

const to64 = (num) => {
  let falseArr = [];
  for (let i = 0;  i < 64 - num.length; i++) falseArr.push(false);
  return falseArr.concat(num);
}

const numToBitint = (num, size = 32, signed = false) => {
  if (signed) {
    const isNegative = num[0] === "-" ? true : false ;

    const positive = isNegative ? num.slice(1) : num.slice();

    return isNegative ? toNegative(numToBitint(positive, size)) : numToBitint(positive, size) ;

  } else {
    if (num === "0") return to64([false, false]);
    num = num.split("").reverse();
    const value = num.map((val, index) => [parseInt(val), index])
                    .map(subarr => multiply(to64(global_zeroThroughNine[subarr[0]]), to64(global_tenPowers[subarr[1]])))
                    .reduce((acc,next)=>add(acc,next));

    if (value.indexOf(true) < value.length - size ) throw "OverflowError: Input exceeds range of data type";
    return snapToSize(value, size);
  }
}

// - - - - -

// ---- vv CLASS SYSTEM vv ----

/* < Superclass > */
class bitint {
  constructor(num, size, isSigned) {
    this.input = num;
    this.size = size;
    this.signed = isSigned;

    //vv Processing value vv
    this.proval = numToBitint(num, this.size, this.signed);

    this.max = (function(){
      if (isSigned) {
        switch(size) {
          case 8:
            return "127";
          case 16:
            return "32 767";
          case 32:
            return "2 147 483 647";
          case 64:
            return "9 223 372 036 854 775 807";
          default:
            throw "Construction Error: Size of integer cannot exceed 64";
        }
      } else {
        switch(size) {
          case 8: return "255";
          case 16: return "65 535";
          case 32: return "4 294 967 295";
          case 64: return "18 446 744 073 709 551 615";
          default: throw "Construction error: Size of integer cannot exceed 64";
        }
      }
    })();
    this.min = (function(){
      if (isSigned) {
        switch(size) {
          case 8: return "-128";
          case 16: return "-32 768";
          case 32: return "-2 147 483 648";
          case 64: return "-9 223 372 036 854 775 808";
          default: throw "Construction Error: Size of integer cannot exceed 64";
        }
      } else {
        return "0";
      }
    })();
  }
  toNumber() {
    return this.signed ? tosignum(this.proval) : tonum(this.proval) ;
  }
}

/* < 64-bit signed integer > */
class long extends bitint {
  constructor(num) {
    super(num, 64, true);
    this.subtype = "long";
  }
}

/* < 64-bit unsigned integer > */
class u_long extends bitint {
  constructor(num) {
    super(num, 64, false);
    this.subtype = "u_long";
  }
}

/* < 32-bit signed integer > */
class int extends bitint {
  constructor(num) {
    super(num, 32, true);
    this.subtype = "int";
  }
}

/* < 32-bit unsigned integer > */
class u_int extends bitint {
  constructor(num) {
    super(num, 32, false);
    this.subtype = "u_int";
  }
}

/* < 16-bit signed integer > */
class short extends bitint {
  constructor(num) {
    super(num, 16, true);
    this.subtype = "short";
  }
}

/* < 16-bit unsigned integer > */
class u_short extends bitint {
  constructor(num) {
    super(num, 16, false);
    this.subtype = "u_short";
  }
}

/* < 8-bit signed integer > */
class byte extends bitint {
  constructor(num) {
    super(num, 8, true);
    this.subtype = "byte";
  }
}

/* < 8-bit unsigned integer > */
class u_byte extends bitint {
  constructor(num) {
    super(num, 8, false);
    this.subtype = "u_byte";
  }
}

// ---- vv EXTERNAL DEV METHODS vv ----

const four = numToBitint("4",8);
const two = numToBitint("2",8);
const juan = numToBitint("1", 8);
const eight = numToBitint("8", 8);
const three = numToBitint("3", 8);
const maxnumJS = numToBitint(`${Number.MAX_SAFE_INTEGER}`, 64);
const maxInt = numToBitint("18446744073709551615", 64);

const fourbit = [true, false, false, true];
const fourbit2 = [false, false, true, true];
const eightbit = [false, false, true, true, false, true, false, true];
const eightbit2 = [false, true, false, true, true, false, false, false];

const test = [true, true, true, true, true, true, true, true];
const test2 = [true, false, true, false, true, false, true, false];

const binaryToBitArray = (num) => {
  num = num.split("");
  return num.map(digit => digit === "1" ? true : false);
}

const binaryArrayToString = (num) => num.map(bool => bool ? "1" : "0").join("");

const tonum = (num) => parseInt(binaryArrayToString(num), 2);

const tosignum = (num) => {
  const negative = parseInt(binaryArrayToString(one(num).reverse()),2);
  const rest = parseInt(binaryArrayToString(num.slice(1)),2);

  return num[0] ? rest - negative : rest;
}

console.log("bitint initialized");
