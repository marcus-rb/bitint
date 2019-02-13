/* Bitint.js implemented with the more special data types of JavaScript */

// _ip suffix means function modifies the first parameter on which it was called.
// no suffix returns a new integer.

// vv .... General bitwise operations .... vv
// ALL NUMBERS ARE ASSUMED TO BE OF TYPE {U}Int{num}Array(1)

const rotr = (num, amount) => {

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
// Assumes 64-bit numbers are stored as an
// ArrayBuffer containing two [U]Int32Arrays, each containing a value

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

// < Conversion >

// .... 64-bit number processig complete

// vv .... Integer classes .... vv
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

const p64bitnum = new Uint32Array(2);
      p64bitnum[0] = 0b11110101111101111111010111110111;
      p64bitnum[1] = 0b11111111111101010000000011111000;
