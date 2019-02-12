/* SHA-2 */
/*
const hashVals = [
  [false, true, true, false, true, false, true, false,
    false, false, false, false, true, false, false, true,
    true, true, true, false, false, true, true, false,
    false, true, true, false, false, true, true, true],
  [true, false, true, true, true, false, true, true,
    false, true, true, false, false, true, true, true,
    true, false, true, false, true, true, true, false,
    true, false, false, false, false, true, false, true],
  [false, false, true, true, true, true, false, false,
    false, true, true, false, true, true, true, false,
    true, true, true, true, false, false, true, true,
    false, true, true, true, false, false, true, false],
  [true, false, true, false, false, true, false, true,
    false, true, false, false, true, true, true, true,
    true, true, true, true, false, true, false, true,
    false, false, true, true, true, false, true, false],
  [false, true, false, true, false, false, false, true,
    false, false, false, false, true, true, true, false,
    false, true, false, true, false, false, true, false,
    false, true, true, true, true, true, true, true],
  [true, false, false, true, true, false, true, true,
    false, false, false, false, false, true, false, true,
    false, true, true, false, true, false, false, false,
    true, false, false, false, true, true, false, false],
  [false, false, false, true, true, true, true, true,
    true, false, false, false, false, false, true, true,
    true, true, false, true, true, false, false, true,
    true, false, true, false, true, false, true, true],
  [false, true, false, true, true, false, true, true,
    true, true, true, false, false, false, false, false,
    true, true, false, false, true, true, false, true,
    false, false, false, true, true, false, false, true],
];

const roundConstants = [
  [false,true,false,false,false,false,true,false,true,false,false,false,true,false,true,false,false,false,true,false,true,true,true,true,true,false,false,true,true,false,false,false],
  [false,true,true,true,false,false,false,true,false,false,true,true,false,true,true,true,false,true,false,false,false,true,false,false,true,false,false,true,false,false,false,true],
  [true,false,true,true,false,true,false,true,true,true,false,false,false,false,false,false,true,true,true,true,true,false,true,true,true,true,false,false,true,true,true,true],
  [true,true,true,false,true,false,false,true,true,false,true,true,false,true,false,true,true,true,false,true,true,false,true,true,true,false,true,false,false,true,false,true],
  [false,false,true,true,true,false,false,true,false,true,false,true,false,true,true,false,true,true,false,false,false,false,true,false,false,true,false,true,true,false,true,true],
  [false,true,false,true,true,false,false,true,true,true,true,true,false,false,false,true,false,false,false,true,false,false,false,true,true,true,true,true,false,false,false,true],
  [true,false,false,true,false,false,true,false,false,false,true,true,true,true,true,true,true,false,false,false,false,false,true,false,true,false,true,false,false,true,false,false],
  [true,false,true,false,true,false,true,true,false,false,false,true,true,true,false,false,false,true,false,true,true,true,true,false,true,true,false,true,false,true,false,true],
  [true,true,false,true,true,false,false,false,false,false,false,false,false,true,true,true,true,false,true,false,true,false,true,false,true,false,false,true,true,false,false,false],
  [false,false,false,true,false,false,true,false,true,false,false,false,false,false,true,true,false,true,false,true,true,false,true,true,false,false,false,false,false,false,false,true],
  [false,false,true,false,false,true,false,false,false,false,true,true,false,false,false,true,true,false,false,false,false,true,false,true,true,false,true,true,true,true,true,false],
  [false,true,false,true,false,true,false,true,false,false,false,false,true,true,false,false,false,true,true,true,true,true,false,true,true,true,false,false,false,false,true,true],
  [false,true,true,true,false,false,true,false,true,false,true,true,true,true,true,false,false,true,false,true,true,true,false,true,false,true,true,true,false,true,false,false],
  [true,false,false,false,false,false,false,false,true,true,false,true,true,true,true,false,true,false,true,true,false,false,false,true,true,true,true,true,true,true,true,false],
  [true,false,false,true,true,false,true,true,true,true,false,true,true,true,false,false,false,false,false,false,false,true,true,false,true,false,true,false,false,true,true,true],
  [true,true,false,false,false,false,false,true,true,false,false,true,true,false,true,true,true,true,true,true,false,false,false,true,false,true,true,true,false,true,false,false],
  [true,true,true,false,false,true,false,false,true,false,false,true,true,false,true,true,false,true,true,false,true,false,false,true,true,true,false,false,false,false,false,true],
  [true,true,true,false,true,true,true,true,true,false,true,true,true,true,true,false,false,true,false,false,false,true,true,true,true,false,false,false,false,true,true,false],
  [false,false,false,false,true,true,true,true,true,true,false,false,false,false,false,true,true,false,false,true,true,true,false,true,true,true,false,false,false,true,true,false],
  [false,false,true,false,false,true,false,false,false,false,false,false,true,true,false,false,true,false,true,false,false,false,false,true,true,true,false,false,true,true,false,false],
  [false,false,true,false,true,true,false,true,true,true,true,false,true,false,false,true,false,false,true,false,true,true,false,false,false,true,true,false,true,true,true,true],
  [false,true,false,false,true,false,true,false,false,true,true,true,false,true,false,false,true,false,false,false,false,true,false,false,true,false,true,false,true,false,true,false],
  [false,true,false,true,true,true,false,false,true,false,true,true,false,false,false,false,true,false,true,false,true,false,false,true,true,true,false,true,true,true,false,false],
  [false,true,true,true,false,true,true,false,true,true,true,true,true,false,false,true,true,false,false,false,true,false,false,false,true,true,false,true,true,false,true,false],
  [true,false,false,true,true,false,false,false,false,false,true,true,true,true,true,false,false,true,false,true,false,false,false,true,false,true,false,true,false,false,true,false],
  [true,false,true,false,true,false,false,false,false,false,true,true,false,false,false,true,true,true,false,false,false,true,true,false,false,true,true,false,true,true,false,true],
  [true,false,true,true,false,false,false,false,false,false,false,false,false,false,true,true,false,false,true,false,false,true,true,true,true,true,false,false,true,false,false,false],
  [true,false,true,true,true,true,true,true,false,true,false,true,true,false,false,true,false,true,true,true,true,true,true,true,true,true,false,false,false,true,true,true],
  [true,true,false,false,false,true,true,false,true,true,true,false,false,false,false,false,false,false,false,false,true,false,true,true,true,true,true,true,false,false,true,true],
  [true,true,false,true,false,true,false,true,true,false,true,false,false,true,true,true,true,false,false,true,false,false,false,true,false,true,false,false,false,true,true,true],
  [false,false,false,false,false,true,true,false,true,true,false,false,true,false,true,false,false,true,true,false,false,false,true,true,false,true,false,true,false,false,false,true],
  [false,false,false,true,false,true,false,false,false,false,true,false,true,false,false,true,false,false,true,false,true,false,false,true,false,true,true,false,false,true,true,true],
  [false,false,true,false,false,true,true,true,true,false,true,true,false,true,true,true,false,false,false,false,true,false,true,false,true,false,false,false,false,true,false,true],
  [false,false,true,false,true,true,true,false,false,false,false,true,true,false,true,true,false,false,true,false,false,false,false,true,false,false,true,true,true,false,false,false],
  [false,true,false,false,true,true,false,true,false,false,true,false,true,true,false,false,false,true,true,false,true,true,false,true,true,true,true,true,true,true,false,false],
  [false,true,false,true,false,false,true,true,false,false,true,true,true,false,false,false,false,false,false,false,true,true,false,true,false,false,false,true,false,false,true,true],
  [false,true,true,false,false,true,false,true,false,false,false,false,true,false,true,false,false,true,true,true,false,false,true,true,false,true,false,true,false,true,false,false],
  [false,true,true,true,false,true,true,false,false,true,true,false,true,false,true,false,false,false,false,false,true,false,true,false,true,false,true,true,true,false,true,true],
  [true,false,false,false,false,false,false,true,true,true,false,false,false,false,true,false,true,true,false,false,true,false,false,true,false,false,true,false,true,true,true,false],
  [true,false,false,true,false,false,true,false,false,true,true,true,false,false,true,false,false,false,true,false,true,true,false,false,true,false,false,false,false,true,false,true],
  [true,false,true,false,false,false,true,false,true,false,true,true,true,true,true,true,true,true,true,false,true,false,false,false,true,false,true,false,false,false,false,true],
  [true,false,true,false,true,false,false,false,false,false,false,true,true,false,true,false,false,true,true,false,false,true,true,false,false,true,false,false,true,false,true,true],
  [true,true,false,false,false,false,true,false,false,true,false,false,true,false,true,true,true,false,false,false,true,false,true,true,false,true,true,true,false,false,false,false],
  [true,true,false,false,false,true,true,true,false,true,true,false,true,true,false,false,false,true,false,true,false,false,false,true,true,false,true,false,false,false,true,true],
  [true,true,false,true,false,false,false,true,true,false,false,true,false,false,true,false,true,true,true,false,true,false,false,false,false,false,false,true,true,false,false,true],
  [true,true,false,true,false,true,true,false,true,false,false,true,true,false,false,true,false,false,false,false,false,true,true,false,false,false,true,false,false,true,false,false],
  [true,true,true,true,false,true,false,false,false,false,false,false,true,true,true,false,false,false,true,true,false,true,false,true,true,false,false,false,false,true,false,true],
  [false,false,false,true,false,false,false,false,false,true,true,false,true,false,true,false,true,false,true,false,false,false,false,false,false,true,true,true,false,false,false,false],
  [false,false,false,true,true,false,false,true,true,false,true,false,false,true,false,false,true,true,false,false,false,false,false,true,false,false,false,true,false,true,true,false],
  [false,false,false,true,true,true,true,false,false,false,true,true,false,true,true,true,false,true,true,false,true,true,false,false,false,false,false,false,true,false,false,false],
  [false,false,true,false,false,true,true,true,false,true,false,false,true,false,false,false,false,true,true,true,false,true,true,true,false,true,false,false,true,true,false,false],
  [false,false,true,true,false,true,false,false,true,false,true,true,false,false,false,false,true,false,true,true,true,true,false,false,true,false,true,true,false,true,false,true],
  [false,false,true,true,true,false,false,true,false,false,false,true,true,true,false,false,false,false,false,false,true,true,false,false,true,false,true,true,false,false,true,true],
  [false,true,false,false,true,true,true,false,true,true,false,true,true,false,false,false,true,false,true,false,true,false,true,false,false,true,false,false,true,false,true,false],
  [false,true,false,true,true,false,true,true,true,false,false,true,true,true,false,false,true,true,false,false,true,false,true,false,false,true,false,false,true,true,true,true],
  [false,true,true,false,true,false,false,false,false,false,true,false,true,true,true,false,false,true,true,false,true,true,true,true,true,true,true,true,false,false,true,true],
  [false,true,true,true,false,true,false,false,true,false,false,false,true,true,true,true,true,false,false,false,false,false,true,false,true,true,true,false,true,true,true,false],
  [false,true,true,true,true,false,false,false,true,false,true,false,false,true,false,true,false,true,true,false,false,false,true,true,false,true,true,false,true,true,true,true],
  [true,false,false,false,false,true,false,false,true,true,false,false,true,false,false,false,false,true,true,true,true,false,false,false,false,false,false,true,false,true,false,false],
  [true,false,false,false,true,true,false,false,true,true,false,false,false,true,true,true,false,false,false,false,false,false,true,false,false,false,false,false,true,false,false,false],
  [true,false,false,true,false,false,false,false,true,false,true,true,true,true,true,false,true,true,true,true,true,true,true,true,true,true,true,true,true,false,true,false],
  [true,false,true,false,false,true,false,false,false,true,false,true,false,false,false,false,false,true,true,false,true,true,false,false,true,true,true,false,true,false,true,true],
  [true,false,true,true,true,true,true,false,true,true,true,true,true,false,false,true,true,false,true,false,false,false,true,true,true,true,true,true,false,true,true,true],
  [true,true,false,false,false,true,true,false,false,true,true,true,false,false,false,true,false,true,true,true,true,false,false,false,true,true,true,true,false,false,true,false],
];

const sha256 = (inputString, charSize = 8) => {
  console.time();

  const hashVals = [
    [false, true, true, false, true, false, true, false,
      false, false, false, false, true, false, false, true,
      true, true, true, false, false, true, true, false,
      false, true, true, false, false, true, true, true],
    [true, false, true, true, true, false, true, true,
      false, true, true, false, false, true, true, true,
      true, false, true, false, true, true, true, false,
      true, false, false, false, false, true, false, true],
    [false, false, true, true, true, true, false, false,
      false, true, true, false, true, true, true, false,
      true, true, true, true, false, false, true, true,
      false, true, true, true, false, false, true, false],
    [true, false, true, false, false, true, false, true,
      false, true, false, false, true, true, true, true,
      true, true, true, true, false, true, false, true,
      false, false, true, true, true, false, true, false],
    [false, true, false, true, false, false, false, true,
      false, false, false, false, true, true, true, false,
      false, true, false, true, false, false, true, false,
      false, true, true, true, true, true, true, true],
    [true, false, false, true, true, false, true, true,
      false, false, false, false, false, true, false, true,
      false, true, true, false, true, false, false, false,
      true, false, false, false, true, true, false, false],
    [false, false, false, true, true, true, true, true,
      true, false, false, false, false, false, true, true,
      true, true, false, true, true, false, false, true,
      true, false, true, false, true, false, true, true],
    [false, true, false, true, true, false, true, true,
      true, true, true, false, false, false, false, false,
      true, true, false, false, true, true, false, true,
      false, false, false, true, true, false, false, true],
  ];
  const roundConstants = [
    [false,true,false,false,false,false,true,false,true,false,false,false,true,false,true,false,false,false,true,false,true,true,true,true,true,false,false,true,true,false,false,false],
    [false,true,true,true,false,false,false,true,false,false,true,true,false,true,true,true,false,true,false,false,false,true,false,false,true,false,false,true,false,false,false,true],
    [true,false,true,true,false,true,false,true,true,true,false,false,false,false,false,false,true,true,true,true,true,false,true,true,true,true,false,false,true,true,true,true],
    [true,true,true,false,true,false,false,true,true,false,true,true,false,true,false,true,true,true,false,true,true,false,true,true,true,false,true,false,false,true,false,true],
    [false,false,true,true,true,false,false,true,false,true,false,true,false,true,true,false,true,true,false,false,false,false,true,false,false,true,false,true,true,false,true,true],
    [false,true,false,true,true,false,false,true,true,true,true,true,false,false,false,true,false,false,false,true,false,false,false,true,true,true,true,true,false,false,false,true],
    [true,false,false,true,false,false,true,false,false,false,true,true,true,true,true,true,true,false,false,false,false,false,true,false,true,false,true,false,false,true,false,false],
    [true,false,true,false,true,false,true,true,false,false,false,true,true,true,false,false,false,true,false,true,true,true,true,false,true,true,false,true,false,true,false,true],
    [true,true,false,true,true,false,false,false,false,false,false,false,false,true,true,true,true,false,true,false,true,false,true,false,true,false,false,true,true,false,false,false],
    [false,false,false,true,false,false,true,false,true,false,false,false,false,false,true,true,false,true,false,true,true,false,true,true,false,false,false,false,false,false,false,true],
    [false,false,true,false,false,true,false,false,false,false,true,true,false,false,false,true,true,false,false,false,false,true,false,true,true,false,true,true,true,true,true,false],
    [false,true,false,true,false,true,false,true,false,false,false,false,true,true,false,false,false,true,true,true,true,true,false,true,true,true,false,false,false,false,true,true],
    [false,true,true,true,false,false,true,false,true,false,true,true,true,true,true,false,false,true,false,true,true,true,false,true,false,true,true,true,false,true,false,false],
    [true,false,false,false,false,false,false,false,true,true,false,true,true,true,true,false,true,false,true,true,false,false,false,true,true,true,true,true,true,true,true,false],
    [true,false,false,true,true,false,true,true,true,true,false,true,true,true,false,false,false,false,false,false,false,true,true,false,true,false,true,false,false,true,true,true],
    [true,true,false,false,false,false,false,true,true,false,false,true,true,false,true,true,true,true,true,true,false,false,false,true,false,true,true,true,false,true,false,false],
    [true,true,true,false,false,true,false,false,true,false,false,true,true,false,true,true,false,true,true,false,true,false,false,true,true,true,false,false,false,false,false,true],
    [true,true,true,false,true,true,true,true,true,false,true,true,true,true,true,false,false,true,false,false,false,true,true,true,true,false,false,false,false,true,true,false],
    [false,false,false,false,true,true,true,true,true,true,false,false,false,false,false,true,true,false,false,true,true,true,false,true,true,true,false,false,false,true,true,false],
    [false,false,true,false,false,true,false,false,false,false,false,false,true,true,false,false,true,false,true,false,false,false,false,true,true,true,false,false,true,true,false,false],
    [false,false,true,false,true,true,false,true,true,true,true,false,true,false,false,true,false,false,true,false,true,true,false,false,false,true,true,false,true,true,true,true],
    [false,true,false,false,true,false,true,false,false,true,true,true,false,true,false,false,true,false,false,false,false,true,false,false,true,false,true,false,true,false,true,false],
    [false,true,false,true,true,true,false,false,true,false,true,true,false,false,false,false,true,false,true,false,true,false,false,true,true,true,false,true,true,true,false,false],
    [false,true,true,true,false,true,true,false,true,true,true,true,true,false,false,true,true,false,false,false,true,false,false,false,true,true,false,true,true,false,true,false],
    [true,false,false,true,true,false,false,false,false,false,true,true,true,true,true,false,false,true,false,true,false,false,false,true,false,true,false,true,false,false,true,false],
    [true,false,true,false,true,false,false,false,false,false,true,true,false,false,false,true,true,true,false,false,false,true,true,false,false,true,true,false,true,true,false,true],
    [true,false,true,true,false,false,false,false,false,false,false,false,false,false,true,true,false,false,true,false,false,true,true,true,true,true,false,false,true,false,false,false],
    [true,false,true,true,true,true,true,true,false,true,false,true,true,false,false,true,false,true,true,true,true,true,true,true,true,true,false,false,false,true,true,true],
    [true,true,false,false,false,true,true,false,true,true,true,false,false,false,false,false,false,false,false,false,true,false,true,true,true,true,true,true,false,false,true,true],
    [true,true,false,true,false,true,false,true,true,false,true,false,false,true,true,true,true,false,false,true,false,false,false,true,false,true,false,false,false,true,true,true],
    [false,false,false,false,false,true,true,false,true,true,false,false,true,false,true,false,false,true,true,false,false,false,true,true,false,true,false,true,false,false,false,true],
    [false,false,false,true,false,true,false,false,false,false,true,false,true,false,false,true,false,false,true,false,true,false,false,true,false,true,true,false,false,true,true,true],
    [false,false,true,false,false,true,true,true,true,false,true,true,false,true,true,true,false,false,false,false,true,false,true,false,true,false,false,false,false,true,false,true],
    [false,false,true,false,true,true,true,false,false,false,false,true,true,false,true,true,false,false,true,false,false,false,false,true,false,false,true,true,true,false,false,false],
    [false,true,false,false,true,true,false,true,false,false,true,false,true,true,false,false,false,true,true,false,true,true,false,true,true,true,true,true,true,true,false,false],
    [false,true,false,true,false,false,true,true,false,false,true,true,true,false,false,false,false,false,false,false,true,true,false,true,false,false,false,true,false,false,true,true],
    [false,true,true,false,false,true,false,true,false,false,false,false,true,false,true,false,false,true,true,true,false,false,true,true,false,true,false,true,false,true,false,false],
    [false,true,true,true,false,true,true,false,false,true,true,false,true,false,true,false,false,false,false,false,true,false,true,false,true,false,true,true,true,false,true,true],
    [true,false,false,false,false,false,false,true,true,true,false,false,false,false,true,false,true,true,false,false,true,false,false,true,false,false,true,false,true,true,true,false],
    [true,false,false,true,false,false,true,false,false,true,true,true,false,false,true,false,false,false,true,false,true,true,false,false,true,false,false,false,false,true,false,true],
    [true,false,true,false,false,false,true,false,true,false,true,true,true,true,true,true,true,true,true,false,true,false,false,false,true,false,true,false,false,false,false,true],
    [true,false,true,false,true,false,false,false,false,false,false,true,true,false,true,false,false,true,true,false,false,true,true,false,false,true,false,false,true,false,true,true],
    [true,true,false,false,false,false,true,false,false,true,false,false,true,false,true,true,true,false,false,false,true,false,true,true,false,true,true,true,false,false,false,false],
    [true,true,false,false,false,true,true,true,false,true,true,false,true,true,false,false,false,true,false,true,false,false,false,true,true,false,true,false,false,false,true,true],
    [true,true,false,true,false,false,false,true,true,false,false,true,false,false,true,false,true,true,true,false,true,false,false,false,false,false,false,true,true,false,false,true],
    [true,true,false,true,false,true,true,false,true,false,false,true,true,false,false,true,false,false,false,false,false,true,true,false,false,false,true,false,false,true,false,false],
    [true,true,true,true,false,true,false,false,false,false,false,false,true,true,true,false,false,false,true,true,false,true,false,true,true,false,false,false,false,true,false,true],
    [false,false,false,true,false,false,false,false,false,true,true,false,true,false,true,false,true,false,true,false,false,false,false,false,false,true,true,true,false,false,false,false],
    [false,false,false,true,true,false,false,true,true,false,true,false,false,true,false,false,true,true,false,false,false,false,false,true,false,false,false,true,false,true,true,false],
    [false,false,false,true,true,true,true,false,false,false,true,true,false,true,true,true,false,true,true,false,true,true,false,false,false,false,false,false,true,false,false,false],
    [false,false,true,false,false,true,true,true,false,true,false,false,true,false,false,false,false,true,true,true,false,true,true,true,false,true,false,false,true,true,false,false],
    [false,false,true,true,false,true,false,false,true,false,true,true,false,false,false,false,true,false,true,true,true,true,false,false,true,false,true,true,false,true,false,true],
    [false,false,true,true,true,false,false,true,false,false,false,true,true,true,false,false,false,false,false,false,true,true,false,false,true,false,true,true,false,false,true,true],
    [false,true,false,false,true,true,true,false,true,true,false,true,true,false,false,false,true,false,true,false,true,false,true,false,false,true,false,false,true,false,true,false],
    [false,true,false,true,true,false,true,true,true,false,false,true,true,true,false,false,true,true,false,false,true,false,true,false,false,true,false,false,true,true,true,true],
    [false,true,true,false,true,false,false,false,false,false,true,false,true,true,true,false,false,true,true,false,true,true,true,true,true,true,true,true,false,false,true,true],
    [false,true,true,true,false,true,false,false,true,false,false,false,true,true,true,true,true,false,false,false,false,false,true,false,true,true,true,false,true,true,true,false],
    [false,true,true,true,true,false,false,false,true,false,true,false,false,true,false,true,false,true,true,false,false,false,true,true,false,true,true,false,true,true,true,true],
    [true,false,false,false,false,true,false,false,true,true,false,false,true,false,false,false,false,true,true,true,true,false,false,false,false,false,false,true,false,true,false,false],
    [true,false,false,false,true,true,false,false,true,true,false,false,false,true,true,true,false,false,false,false,false,false,true,false,false,false,false,false,true,false,false,false],
    [true,false,false,true,false,false,false,false,true,false,true,true,true,true,true,false,true,true,true,true,true,true,true,true,true,true,true,true,true,false,true,false],
    [true,false,true,false,false,true,false,false,false,true,false,true,false,false,false,false,false,true,true,false,true,true,false,false,true,true,true,false,true,false,true,true],
    [true,false,true,true,true,true,true,false,true,true,true,true,true,false,false,true,true,false,true,false,false,false,true,true,true,true,true,true,false,true,true,true],
    [true,true,false,false,false,true,true,false,false,true,true,true,false,false,false,true,false,true,true,true,true,false,false,false,true,true,true,true,false,false,true,false],
  ];

  let values = inputString.split("").map(char => char.charCodeAt())
                                    .map(val => numToBitint(`${val}`, charSize))
                                    .reduce((acc, next) => acc.concat(next))
                                    .concat([true]);

  // vv .... PADDING .... vv

  const plus512 = numToBitint("512", 16);
  const plus64 = numToBitint("64", 8);

  const lengthInitial = numToBitint(`${values.length}`, 64);
  const totalLength = multiply(add(divide(lengthInitial, plus512), [false, true]), plus512);
  let bitsToAdd = minus(minus(totalLength, lengthInitial), plus64);

  while(greater(bitsToAdd, zero(bitsToAdd))) {
    values.push(false);
    bitsToAdd = minus(bitsToAdd, [true]);
  }

  const L = minus(lengthInitial, [true]);

  const twoPower32 = power(numToBitint("2", 64), 32);
  //console.log(tonum(twoPower32));

  values = values.concat(L);

  // ------- PADDING COMPLETE --------
  //console.log(values.length % 512);
  // vv .... BREAK MESSAGE INTO 512-Bit chunks .... vv
  let chunks = [];
  for (let i = 0; i < values.length; i+=512) chunks.push(values.slice(i, i+512));

  const zero0 = zero(numToBitint("1")); //console.log(zero0);
  for (let chunk of chunks) {
    //console.log("chunk: "+binaryArrayToString(chunk));

    let workingArray = [];
    for (let i = 0; i < 64; i++) workingArray.push(zero0);

    for (let i = 0; i < 16; i++) {
      workingArray[i] = chunk.slice(32*i, 32*(i+1));
    }
    for (let i = 16; i < 64; i++) {
      const s0 = xor(xor(rotr(workingArray[i-15],7) , rotr(workingArray[i-15], 7)), shiftr(workingArray[i-15], 3));
      //console.log("s0 at cycle " + (i-15) + ": " + binaryArrayToString(s0));
      const s1 = xor(xor( rotr(workingArray[i-2], 17) , rotr(workingArray[i-2], 19)) , shiftr(workingArray[i-2], 10) );
      //console.log("s1 at cycle " + (i-15) + ": " + binaryArrayToString(s1));

      //workingArray[i] = moduloAdd(moduloAdd(moduloAdd(workingArray[i-16],s0, twoPower32), workingArray[i-7], twoPower32), s1, twoPower32).slice(32);

      workingArray[i] = add(add(add(workingArray[i-16], s0), workingArray[i-7]), s1);
      //console.log("w["+i+"] at cycle " + (i-15) + ": " + binaryArrayToString(workingArray[i]));
    }

    //console.log(workingArray);

    // .... working variables ....
    let a = hashVals[0].slice();
    let b = hashVals[1].slice();
    let c = hashVals[2].slice();
    let d = hashVals[3].slice();
    let e = hashVals[4].slice();
    let f = hashVals[5].slice();
    let g = hashVals[6].slice();
    let h = hashVals[7].slice();

    for (let i = 0; i < 64; i++) {
      const S1 = xor(xor(rotr(e,6), rotr(e, 11)), rotr(e, 23));
      const ch = xor(and(e, f), and(not(e), g));
      const temp1 = add(add(add(add(h, S1), ch), roundConstants[i]), workingArray[i]);

      const S0 = xor(xor(rotr(a, 2), rotr(a, 13)), rotr(a, 22));
      const maj = xor(xor(and(a, b), and(a, c)), and(b, c));
      const temp2 = add(S0, maj);

      h = g.slice();
      g = f.slice();
      f = e.slice();
      e = add(d, temp1);
      d = c.slice();
      c = b.slice();
      b = a.slice();
      a = add(temp1, temp2);

    }

    hashVals[0] = add(hashVals[0], a);
    hashVals[1] = add(hashVals[1], b);
    hashVals[2] = add(hashVals[2], c);
    hashVals[3] = add(hashVals[3], d);
    hashVals[4] = add(hashVals[4], e);
    hashVals[5] = add(hashVals[5], f);
    hashVals[6] = add(hashVals[6], g);
    hashVals[7] = add(hashVals[7], h);
  }
  const returnValue = binaryArrayToHexNum(hashVals.reduce((acc, next) => acc.concat(next)));
  console.timeEnd();
  //console.log(hashVals.reduce((acc,next) => acc.concat(next)));
  return returnValue;
}
*/
