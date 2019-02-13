// vv .... HASH CONSTANTS SETUP .... vv
const hashConstants = {
  sha256: new Uint32Array(8),
  sha224: new Uint32Array(8),
  sha512: new ArrayBuffer(2), //Store 64-Bit integers with their bits in the correct position, being represented as a float.
  sha384: new ArrayBuffer(2),
}

// < SHA-256 >
hashConstants.sha256[0] = 0x6a09e667;
hashConstants.sha256[1] = 0xbb67ae85;
hashConstants.sha256[2] = 0x3c6ef372;
hashConstants.sha256[3] = 0xa54ff53a;
hashConstants.sha256[4] = 0x510e527f;
hashConstants.sha256[5] = 0x9b05688c;
hashConstants.sha256[6] = 0x1f83d9ab;
hashConstants.sha256[7] = 0x5be0cd19;

// < SHA-224 >
hashConstants.sha224[0] = 0xc1059ed8;
hashConstants.sha224[1] = 0x367cd507;
hashConstants.sha224[2] = 0x3070dd17;
hashConstants.sha224[3] = 0xf70e5939;
hashConstants.sha224[4] = 0xffc00b31;
hashConstants.sha224[5] = 0x68581511;
hashConstants.sha224[6] = 0x64f98fa7;
hashConstants.sha224[7] = 0xbefa4fa4;

// < SHA-512 >
// .. Splits constants into two 32-bit numbers.
hashConstants.sha512[0] = new Uint32Array(8);
hashConstants.sha512[1] = new Uint32Array(8);

hashConstants.sha512[0][0] = 0x6a09e667; hashConstants.sha512[1][0] = 0xf3bcc908;
hashConstants.sha512[0][1] = 0xbb67ae85; hashConstants.sha512[1][1] = 0x84caa73b;
hashConstants.sha512[0][2] = 0x3c6ef372; hashConstants.sha512[1][2] = 0xfe94f82b;
hashConstants.sha512[0][3] = 0xa54ff53a; hashConstants.sha512[1][3] = 0x5f1d36f1;
hashConstants.sha512[0][4] = 0x510e527f; hashConstants.sha512[1][4] = 0xade682d1;
hashConstants.sha512[0][5] = 0x9b05688c; hashConstants.sha512[1][5] = 0x2b3e6c1f;
hashConstants.sha512[0][6] = 0x1f83d9ab; hashConstants.sha512[1][6] = 0xfb41bd6b;
hashConstants.sha512[0][7] = 0x5be0cd19; hashConstants.sha512[1][7] = 0x137e2179;

// < SHA-384 >
// .. Splits constants into two 32-bit numbers.
hashConstants.sha384[0] = new Uint32Array(8);
hashConstants.sha384[1] = new Uint32Array(8);

hashConstants.sha384[0][0] = 0xcbbb9d5d; hashConstants.sha384[1][0] = 0xc1059ed8;
hashConstants.sha384[0][1] = 0x629a292a; hashConstants.sha384[1][1] = 0x367cd507;
hashConstants.sha384[0][2] = 0x9159015a; hashConstants.sha384[1][2] = 0x3070dd17;
hashConstants.sha384[0][3] = 0x152fecd8; hashConstants.sha384[1][3] = 0xf70e5939;
hashConstants.sha384[0][4] = 0x67332667; hashConstants.sha384[1][4] = 0xffc00b31;
hashConstants.sha384[0][5] = 0x8eb44a87; hashConstants.sha384[1][5] = 0x68581511;
hashConstants.sha384[0][6] = 0xdb0c2e0d; hashConstants.sha384[1][6] = 0x64f98fa7;
hashConstants.sha384[0][7] = 0x47b5481d; hashConstants.sha384[1][7] = 0xbefa4fa4;

// ... HASH CONSTANTS COMPLETE ...

// vv .... ROUND CONSTANTS SETUP .... vv
const roundConstants = {
  sha32: new Uint32Array(64),
  sha64: new ArrayBuffer(2),
};
// < SHA-2 w/ 32-bit words >
(function(){
  let tempRoundConstants = [
    0x428a2f98, 0x71374491, 0xb5c0fbcf, 0xe9b5dba5, 0x3956c25b, 0x59f111f1, 0x923f82a4, 0xab1c5ed5,
    0xd807aa98, 0x12835b01, 0x243185be, 0x550c7dc3, 0x72be5d74, 0x80deb1fe, 0x9bdc06a7, 0xc19bf174,
    0xe49b69c1, 0xefbe4786, 0x0fc19dc6, 0x240ca1cc, 0x2de92c6f, 0x4a7484aa, 0x5cb0a9dc, 0x76f988da,
    0x983e5152, 0xa831c66d, 0xb00327c8, 0xbf597fc7, 0xc6e00bf3, 0xd5a79147, 0x06ca6351, 0x14292967,
    0x27b70a85, 0x2e1b2138, 0x4d2c6dfc, 0x53380d13, 0x650a7354, 0x766a0abb, 0x81c2c92e, 0x92722c85,
    0xa2bfe8a1, 0xa81a664b, 0xc24b8b70, 0xc76c51a3, 0xd192e819, 0xd6990624, 0xf40e3585, 0x106aa070,
    0x19a4c116, 0x1e376c08, 0x2748774c, 0x34b0bcb5, 0x391c0cb3, 0x4ed8aa4a, 0x5b9cca4f, 0x682e6ff3,
    0x748f82ee, 0x78a5636f, 0x84c87814, 0x8cc70208, 0x90befffa, 0xa4506ceb, 0xbef9a3f7, 0xc67178f2
  ];
  for (let i = 0; i < 64; i++) roundConstants.sha32[i] = tempRoundConstants[i];
})();

// < SHA-2 w/ 64-bit words >
roundConstants.sha64 = new ArrayBuffer(80);

(function(){
  //Each 64-bit constant is two and two 32 bit integers appended
  let roundConstantsTemp = [
    0x428a2f98, 0xd728ae22, 0x71374491, 0x23ef65cd, 0xb5c0fbcf, 0xec4d3b2f, 0xe9b5dba5, 0x8189dbbc, 0x3956c25b, 0xf348b538,
    0x59f111f1, 0xb605d019, 0x923f82a4, 0xaf194f9b, 0xab1c5ed5, 0xda6d8118, 0xd807aa98, 0xa3030242, 0x12835b01, 0x45706fbe,
    0x243185be, 0x4ee4b28c, 0x550c7dc3, 0xd5ffb4e2, 0x72be5d74, 0xf27b896f, 0x80deb1fe, 0x3b1696b1, 0x9bdc06a7, 0x25c71235,
    0xc19bf174, 0xcf692694, 0xe49b69c1, 0x9ef14ad2, 0xefbe4786, 0x384f25e3, 0x0fc19dc6, 0x8b8cd5b5, 0x240ca1cc, 0x77ac9c65,
    0x2de92c6f, 0x592b0275, 0x4a7484aa, 0x6ea6e483, 0x5cb0a9dc, 0xbd41fbd4, 0x76f988da, 0x831153b5, 0x983e5152, 0xee66dfab,
    0xa831c66d, 0x2db43210, 0xb00327c8, 0x98fb213f, 0xbf597fc7, 0xbeef0ee4, 0xc6e00bf3, 0x3da88fc2, 0xd5a79147, 0x930aa725,
    0x06ca6351, 0xe003826f, 0x14292967, 0x0a0e6e70, 0x27b70a85, 0x46d22ffc, 0x2e1b2138, 0x5c26c926, 0x4d2c6dfc, 0x5ac42aed,
    0x53380d13, 0x9d95b3df, 0x650a7354, 0x8baf63de, 0x766a0abb, 0x3c77b2a8, 0x81c2c92e, 0x47edaee6, 0x92722c85, 0x1482353b,
    0xa2bfe8a1, 0x4cf10364, 0xa81a664b, 0xbc423001, 0xc24b8b70, 0xd0f89791, 0xc76c51a3, 0x0654be30, 0xd192e819, 0xd6ef5218,
    0xd6990624, 0x5565a910, 0xf40e3585, 0x5771202a, 0x106aa070, 0x32bbd1b8, 0x19a4c116, 0xb8d2d0c8, 0x1e376c08, 0x5141ab53,
    0x2748774c, 0xdf8eeb99, 0x34b0bcb5, 0xe19b48a8, 0x391c0cb3, 0xc5c95a63, 0x4ed8aa4a, 0xe3418acb, 0x5b9cca4f, 0x7763e373,
    0x682e6ff3, 0xd6b2b8a3, 0x748f82ee, 0x5defb2fc, 0x78a5636f, 0x43172f60, 0x84c87814, 0xa1f0ab72, 0x8cc70208, 0x1a6439ec,
    0x90befffa, 0x23631e28, 0xa4506ceb, 0xde82bde9, 0xbef9a3f7, 0xb2c67915, 0xc67178f2, 0xe372532b, 0xca273ece, 0xea26619c,
    0xd186b8c7, 0x21c0c207, 0xeada7dd6, 0xcde0eb1e, 0xf57d4f7f, 0xee6ed178, 0x06f067aa, 0x72176fba, 0x0a637dc5, 0xa2c898a6,
    0x113f9804, 0xbef90dae, 0x1b710b35, 0x131c471b, 0x28db77f5, 0x23047d84, 0x32caab7b, 0x40c72493, 0x3c9ebe0a, 0x15c9bebc,
    0x431d67c4, 0x9c100d4c, 0x4cc5d4be, 0xcb3e42b6, 0x597f299c, 0xfc657e2a, 0x5fcb6fab, 0x3ad6faec, 0x6c44198c, 0x4a475817
//(----------------------),(---------------------),(---------------------),(---------------------),(----------------------)
  ];
  for (let i = 0; i < 80; i++) {
    roundConstants.sha64[i] = new Uint32Array(2);
    roundConstants.sha64[i][0] = roundConstantsTemp[2*i];
    roundConstants.sha64[i][1] = roundConstantsTemp[2*i+1];
  }
})();
console.log(roundConstants)

// ... ROUND CONSTANTS COMPLETE ...

// vv .... HASH FUNCTION .... vv
const SHA_2 = (message, digestSize, charsetSize = 8) => {
  console.time("Hash completed in");
  // Obtain correct hash- and roundconstants
  const hashConstantsLocal = hashConstants[`sha${digestSize}`];

  const wordSize = digestSize < 257 ? 32 : 64 ;
  const roundConstantsLocal = roundConstants[`sha${wordSize}`];
  //---
  // Determine calculation parameters
  const calculationParameters = wordSize === 32 ?
        [512, 64, 64, [7, 18, 3, 17, 19, 10, 6, 11, 25, 2, 13, 22]] :
        [1024, 80, 128, [1, 8, 7, 19, 61, 6, 14, 18, 41, 28, 32, 39]] ;

  const chunkSize = calculationParameters[0];
  const cycles = calculationParameters[1];
  const messageLengthSuffixSize = calculationParameters[2];
  const rotationAndShiftAmounts = calculationParameters[3];

  //---
  //Convert input to to array of chars
  message = message.split("")
                   .map(char => char.charCodeAt());

  const initialMessageLength = message.length;
  let preProcessedMessage = charsetSize === 8 ?
                              new Uint8Array(initialMessageLength) : //UTF-8 / ASCII
                            charsetSize === 16 ?
                              new Uint16Array(initialMessageLength) : // UTF-16
                              new Uint32Array(initialMessageLength) ; // UTF-32

  for(let i = 0; i < initialMessageLength; i++)
    preProcessedMessage[i] = message[i];

  const preProcessedMessageTargetLength = charsetSize * message.length;
  const postProcessedMessageTargetLength =
    (Math.floor(preProcessedMessageTargetLength / chunkSize) + 1) * chunkSize ;

  let bitsToAdd = postProcessedMessageTargetLength - 65 - preProcessedMessageTargetLength;

  const onBitToAppend = charsetSize === 8 ? new Uint8Array(1) :
                          charsetSize === 16 ? new Uint16Array(1) :
                                               new Uint32Array(1) ;
      onBitToAppend[0] = 1 << ((onBitToAppend.BYTES_PER_ELEMENT * 8)-1);

  console.log(onBitToAppend);

  bitsToAdd -= onBitToAppend.BYTES_PER_ELEMENT * 8 - 1;
  console.log(bitsToAdd);
  console.timeEnd("Hash completed in");
  //console.log(preProcessedMessageTargetLength);
  //console.log(hashConstantsLocal);
  console.log("Target length: "+postProcessedMessageTargetLength);
  console.log(preProcessedMessage);
  console.log("Number of bits to append: "+bitsToAdd);
  console.log("Length of message: "+ preProcessedMessageTargetLength );
  console.log("")
  return;
}

const SHA256 = (message, charsetSize = 8) => SHA_2(message, 256, charsetSize);
const SHA224 = (message, charsetSize = 8) => SHA_2(message, 224, charsetSize);
const SHA512 = (message, charsetSize = 8) => SHA_2(message, 512, charsetSize);
const SHA384 = (message, charsetSize = 8) => SHA_2(message, 384, charsetSize);
