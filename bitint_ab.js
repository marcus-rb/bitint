/* Bitint.js implemented with the more special data types of JavaScript */

// _ip suffix means function modifies the first parameter on which it was called.
// no suffix returns a new integer.

// vv .... General bitwise operations .... vv
// ALL NUMBERS ARE ASSUMED TO BE OF TYPE {U}Int{num}Array(1)

const rotr = (num, amount) => {
  console.time();
  let processNum = num.slice()[0];
  let amountInitial = parseInt(`${amount}`);
  let temp = 0;
  while (amount > 0) {
    temp += 1 << (amount-1);
    amount--
  }
  let rotatedOut = temp & processNum;
  rotatedOut <<= num.BYTES_PER_ELEMENT * 8 - amountInitial;
  processNum >>>= amountInitial;

  const returnValue = num.constructor === Uint8Array ? new Uint8Array(1) :
                      num.constructor === Int8Array ? new Int8Array(1) :
                      num.constructor === Uint16Array ? new Uint16Array(1) :
                      num.constructor === Int16Array ? new Int16Array(1) :
                      num.constructor === Uint32Array ? new Uint32Array(1) :
                      num.constructor === Int32Array ? new Int32Array(1) : null;

  returnValue[0] = rotatedOut | processNum ;
  console.timeEnd();
  return returnValue;
}
const rotr_ip = (num, amount) => {
  let amountInitial = parseInt(""+amount+"");
  let temp = 0;
  while (amount > 0) {
    temp+= 1 << (amount-1);
    amount--;
  }
  let rotatedOut = temp & num[0];
  rotatedOut <<= num.BYTES_PER_ELEMENT * 8 - amountInitial;
  num[0] >>>= amountInitial;
  num[0] |= rotatedOut;
}

const rotl = (num, amount) => {
  let processVal = num.slice()[0];
  const bitsPerElem = num.BYTES_PER_ELEMENT*8;

  let temp = 0;
  for (let i = 0; i < amount; i++)
    temp+= 1 << (bitsPerElem-1-i);

  let rotatedOut = processVal & temp;
  rotatedOut >>>= bitsPerElem-amount;
  processVal <<= amount;

  const returnValue = num.constructor === Uint8Array ? new Uint8Array(1) :
                      num.constructor === Int8Array ? new Int8Array(1) :
                      num.constructor === Uint16Array ? new Uint16Array(1) :
                      num.constructor === Int16Array ? new Int16Array(1) :
                      num.constructor === Uint32Array ? new Uint32Array(1) :
                      num.constructor === Int32Array ? new Int32Array(1) : null;

  returnValue[0] = rotatedOut | processVal ;
  return returnValue;
}
const rotl_ip = (num, amount) => {
  const bitsPerElem = num.BYTES_PER_ELEMENT*8;
  let temp = 0;
  for (let i = 0; i < amount; i++)
    temp+= 1 << (bitsPerElem-1-i);

  let rotatedOut = num[0] & temp;
  rotatedOut >>>= bitsPerElem-amount;
  num[0] <<= amount;
  num[0] |= rotatedOut;
}

// vv .... 64-bit number processing .... vv
// Assumes 64-bit numbers are stored as a Uint32Array of length 2,
// where each slot is a part of the number

// < Working methods >
const get64 = (int32_1, int32_2) => {

  const returnValue = new Uint32Array(2);
  returnValue[0] = int32_1;
  returnValue[1] = int32_2;

  return returnValue;
}

// < Bitwise logic >
const not64 = (num) => {
  const first = ~num[0];
  const last = ~num[1];

  return get64(first, last);
}
const not64_ip = (num) => {
  num[0] = ~num[0];
  num[1] = ~num[1];
}

const and64 = (num1, num2) => {
  const first = num1[0] & num2[0];
  const last  = num1[1] & num2[1];

  return get64(first, last);
}
const and64_ip = (num1, num2) => {
  num1[0] &= num2[0];
  num1[1] &= num2[1];
}

const or64 = (num1, num2) => {
  const first = num1[0] | num2[0];
  const last = num1[1] | num2[1];

  return get64(first, last);
}
const or64_ip = (num1, num2) => {
  num1[0] |= num2[0];
  num2[1] |= num2[1];
}

const xor64 = (num1, num2) => {
  const first = num1[0] ^ num2[0];
  const last = num1[1] ^ num2[1];

  return get64(first, last);
}
const xor64_ip = (num1, num2) => {
  num1[0] ^= num2[0] ;
  num1[1] ^= num2[1]
}

const nor64 = (num1, num2) => not64(or64(num1, num2));
const nor64_ip = (num1, num2) => not64_ip(or64_ip(num1, num2));

const nand64 = (num1, num2) => not64(and64(num1, num2));
const nand64_ip = (num1, num2) => not64_ip(and64_ip(num1, num2));

const xnor64 = (num1, num2) => not64(xor64(num1, num2));
const xnor64_ip = (num1, num2) => not64_ip(xor64_ip(num1, num2));

// < Bitwise operation >
const shiftr64 = (num, amount) => {

  let p1 = num.slice()[0];
  let p2 = num.slice()[0];

  let temp = 0;
  for (let i = 0; i < amount; i++)
    temp+= 1 << i;

  const shiftedOutP1 = temp & p1;
  p2 >>>= amount;
  p2 |= (shiftedOutP1 << (32-amount));
  p1 >>>= amount;
  return get64(p1, p2);
}
const shiftr64_ip = (num, amount) => {
  let temp = 0;
  for (let i = 0; i< amount; i++)
    temp+= 1 << i;

  const shiftedOutP1 = temp & num[0];
  num[1] >>>= amount;
  num[1] |= (shiftedOutP1 << (32-amount));
  num[0] >>>= amount;
}

const shiftl64 = (num, amount) => {
  let p1 = num.slice()[0];
  let p2 = num.slice()[1];

  let temp = 0;
  for (let i = 0; i < amount; i++)
    temp+= 1 << (31 - i);

  let shiftedOut = temp & p2;
  p2 <<= amount;
  p1 <<= amount;
  p1 |= (shiftedOut >>> (32-amount));

  return get64(p1, p2);
}
const shiftl64_ip = (num, amount) => {
  let temp = 0;
  for (let i = 0; i < amount; i++)
    temp+= 1 << (31 - i);

  const shiftedOut = temp & num[1];
  num[1] <<= amount;
  num[0] <<= amount;
  num[0] |= shiftedOut >>> (32-amount);
}

const rotr64 = (num, amount) => {
  let p1 = num.slice()[0];
  let p2 = num.slice()[1];

  let temp = 0;
  for (let i = 0; i < amount; i++)
    temp += 1 << i;

  const rotatedOutP1 = temp & p1;
  const rotatedOutP2 = temp & p2;

  p1 >>>= amount;
  p2 >>>= amount;
  p1 |= rotatedOutP2 << (32-amount);
  p2 |= rotatedOutP1 << (32-amount);

  return get64(p1, p2);
}
const rotr64_ip = (num, amount) => {
  let temp = 0;
  for (let i = 0; i < amount; i++)
    temp+= 1 << i;

  const rotatedOutP1 = temp & num[0];
  const rotatedOutP2 = temp & num[1];

  num[0] >>>= amount;
  num[1] >>>= amount;
  num[0] |= rotatedOutP2 << (32-amount);
  num[1] |= rotatedOutP1 << (32-amount);
}

const rotl64 = (num, amount) => {
  let p1 = num.slice()[0];
  let p2 = num.slice()[1];

  let temp = 0;
  for (let i = 0; i< amount; i++)
    temp += 1 << (31-i);

  const rotOut1 = temp & p1;
  const rotOut2 = temp & p2;

  p1 <<=amount;
  p2 <<=amount;
  p1 |= rotOut2 >>> (32-amount);
  p2 |= rotOut1 >>> (32-amount);

  return get64(p1, p2);
}
const rotl64_ip = (num, amount) => {
  let temp = 0;
  for (let i = 0; i < amount; i++)
    temp += 1 << (31 - i);

  const rotOut1 = temp & num[0];
  const rotOut2 = temp & num[1];

  num[0] <<=amount;
  num[1] <<=amount;
  num[0] |= rotOut2 >>> (32-amount);
  num[1] |= rotOut2 >>> (32-amount);
}

// < Arithmetic >

const add64_2 = (num1, num2) => {
  //console.time("Add 1:");
  let results = new Uint32Array(2);
  let workingVariables = new Uint32Array(4);
      workingVariables[0] = num1[1]; //First number rear bits
      workingVariables[1] = num2[1]; //Second number rear bits
      workingVariables[2] = num1[0]; //First number forward bits
      workingVariables[3] = num2[0]; //Second number forward bits;

  results[1] = workingVariables[0] + workingVariables[1];
  results[0] = results[1] < workingVariables[0] || results[1] < workingVariables[1] ?
                workingVariables[2] + 1 + workingVariables[3] :
                workingVariables[2] + workingVariables[3];
  //console.timeEnd("Add 1:");
  return results;
}

//Not sure which one of these is faster yet
const add64 = (num1, num2) => {
  //console.time("Add 2:");
  const processNums = new Uint32Array(5);
        processNums[0] = num1[1]; //First number rear bits
        processNums[1] = num2[1]; //Last number rear bits
        processNums[2] = num1[0]; //First number front bits
        processNums[3] = num2[0]; //Last number front bits
        processNums[4] = 1;

  const results = new Uint32Array(2);
        results[1] = processNums[0] + processNums[1];
        results[0] = results[1] < processNums[0] || results[1] < processNums[1] ?
                      processNums[4] + processNums[2] + processNums[3] :
                      processNums[2] + processNums[3] ;

  //console.timeEnd("Add 2:")
  return results;
}

const add64_ip = (num1, num2) => {
  const copy1 = num1.slice()[1];
  const copy2 = num2.slice()[1];

  num1[1] += num2[1];
  num1[0] += num1[1] < copy1 || num1[0] < copy2 ? 1 + num2[0] : num2[0] ;
}
// < Conversion >
const tenToNto64 = (n) => {
  // Returns 10 ^ n in binary;
  const base = new Uint32Array(2);
        base[0] = 0;
        base[1] = 1;

  while( n > 0 ) {
    let temp1 = shiftl64_ip(base, 3);
    let temp2 = shiftr64_ip(base, 1);
    base = add64(temp1, temp2);
    n--
  }
  return base;
}

// .... 64-bit number processig complete

// vv ... 128-bit number processing ... vv
// < General >
const get128 = (int32_1, int32_2, int32_3, int32_4) => {
  const returnValue = new Uint32Array(4);
        returnValue[0] = int32_1;
        returnValue[1] = int32_2;
        returnValue[2] = int32_3;
        returnvalue[3] = int32_4;

  return returnValue;
}

// vv .... Integer classes .... vv
/*
const byte = (num) => {
  const temp = new Int8Array(1);
  temp[0] = num;
  return temp;
}

const u_byte = (num) => {
  const temp = new Uint8Array(1);
  temp[0] = num;
  return temp;
}

const short = (num) => {
  const temp = new Int16Array(1);
  temp[0] = num;
  return temp;
}

const u_short = (num) => {
  const temp = new Uint16Array(1);
  temp[0] = num;
  return temp;
}

const int = (num) => {
  const temp = new Int32Array(1);
  temp[0] = num;
  return temp;
}

const u_int = (num) => {
  const temp = new Uint32Array(1);
  temp[0] = num;
  return temp;
}

const long = (num) => {
  const temp = ArrayBuffer(2);

}

// .... Integer classes compete ....

// vv .... TEST VARIABLES AND METHODS .... vv
const plus56 = u_byte(56);

const plus255 = u_byte(255);
*/
const p128bitnum = new Uint32Array(4);
      p128bitnum[0] = 0b00000000000000000000000000000000;
      p128bitnum[1] = 0b00000000000000000000000000000000;
      p128bitnum[2] = 0b00000000000000000000000000000000;
      p128bitnum[3] = 0b00000000000000000000000000000000;

const p64bitnum = new Uint32Array(2);
      p64bitnum[0] = 0b11110101111101111111010111110111;
      p64bitnum[1] = 0b11111111111101010000000011111000;

const p64bitnum2 = new Uint32Array(2);
      p64bitnum2[0] = 0b00000000000000000000000101011111;
      p64bitnum2[1] = 0b11110000000001001011111111111111;

const p64_1 = new Uint32Array(2);
      p64_1[0] = 0b00000000000000000000000000000000;
      p64_1[1] = 0b00000000000000000000000000000001;

const p64_max = new Uint32Array(2);
      p64_max[0] = 0b11111111111111111111111111111111;
      p64_max[1] = 0b11111111111111111111111111111111;
