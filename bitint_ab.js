/* Bitint.js implemented with the more special data types of JavaScript */

// vv .... General bitwise operations .... vv
// ALL NUMBERS ARE ASSUMED TO BE OF TYPE UInt{num}Array(1)

const rotr = (num, amount) => {
  const processNum = num.slice();
  console.log(processNum);
}

// vv .... 64-bit number processing .... vv
// Assumes 64-bit numbers are stored as an ArrayBuffer containing two [U]Int32Arrays, each containing a value

// < Working methods >
const get64 = (int32_1, int32_2) => {
  const returnValue = new ArrayBuffer(2);
  returnValue[0] = new Uint32Array(1);
  returnValue[1] = new Uint32Array(1);
  returnValue[0][0] = int32_1;
  returnValue[1][0] = int32_2;
  return returnValue;
}

// < Bitwise logic >
// _ip suffix means function modifies the first parameter on which it was called.
// no suffix returns a new 64-bit integer.
const not64 = (num) => {
  const first = ~num[0][0];
  const last = ~num[1][0];

  return get64(first, last);
}
const not64_ip = (num) => {
  num[0][0] = ~num[0][0];
  num[1][0] = ~num[1][0];
}

const and64 = (num1, num2) => {
  const first = num1[0][0] & num2[0][0];
  const last  = num1[1][0] & num2[1][0];

  return get64(first, last);
}
const and64_ip = (num1, num2) => {
  num1[0][0] &= num2[0][0];
  num1[1][0] &= num2[1][0];
}

const or64 = (num1, num2) => {
  const first = num1[0][0] | num2[0][0];
  const last = num1[1][0] | num2[1][0];

  return get64(first, last);
}
const or64_ip = (num1, num2) => {
  num1[0][0] |= num2[0][0];
  num2[1][0] |= num2[1][0];
}

const xor64 = (num1, num2) => {
  const first = num1[0][0] ^ num2[0][0];
  const last = num1[1][0] ^ num2[1][0];

  return get64(first, last);
}
const xor64_ip = (num1, num2) => {
  num1[0][0] ^= num2[0][0] ;
  num1[1][0] ^= num2[1][0]
}

const nor64 = (num1, num2) => not64(or64(num1, num2));
const nor64_ip = (num1, num2) => not64_ip(or64_ip(num1, num2));

const nand64 = (num1, num2) => not64(and64(num1, num2));
const nand64_ip = (num1, num2) => not64_ip(and64_ip(num1, num2));

const xnor64 = (num1, num2) => not64(xor64(num1, num2));
const xnor64_ip = (num1, num2) => not64_ip(xor64_ip(num1, num2));

// < Arithmetic >

// < Conversion >

// .... 64-bit number processig complete

// vv .... TEST VARIABLES AND METHODS .... vv
const plus56 = new Uint8Array(1);
      plus56[0] = 56;
