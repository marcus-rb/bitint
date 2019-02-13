# bitint.js

A JavaScript framework for working with integers of sizes 8, 16, 32- and 64 bits, signed and unsigned.

## Important notes
> this is still under development
> updates are rolled out as soon as the implemented improvement is properly functional

## Current state
Use this list to follow the development progress
- [x] Computing constants and methods
- [x] Basic QA e.g. verifcation in methods and proper size casting
- [x] Bitwise logic and operation
- [x] Comparison logic
- [ ] Artitmetic
  - [x] Addition
  - [x] Multiplication
  - [x] Subtraction
  - [x] Division
  - [x] Modulus
  - [x] Modulo addition
  - [ ] Incrementation
  - [ ] Decrementation
- [x] Number to bitint conversion
- [x] bitint to number conversion
- [ ] Class system
  - [ ] Parent class
    - [x] Conversion
    - [x] Overflow detection at conversion
    - [ ] Implement arithmetic
  - [x] Subclasses
- [ ] Larger than 64-bit numbers

## How it works
A set of methods and functions are defined and will soon be tied up to integer classes.
As the class system has not yet been integrated, use the numToBitint function
and feed the number in as a string. Support for mathematical expressions is not yet implemented.
numToBitint takes 1-3 arguments, where arg 1 is the number you want to convert, arg 2 is the size of the integer. Specify arg 3
as true if you are converting a negative number. (this enables signed conversion, using twos complement).

Example:

const minus57348 = numToBitint("-57348", 32, true);
> [true, true, true, true, true, true, true, true, true, true, true, true, true,
> true, true, true, false, false, false, true, true, true, true, true, true, true,
> true, true, false, false, true, false];

To convert a bitint back to a number, us tonum(*bitint*) for unsigned integers, and tosignum(*bitint*) for signed integers.

tosignum(minus57348);
> -57348

### List of data types

Class Name | Size | Signed | Range
-----------|------|--------|------
long | 64 | yes | -9,223,372,036,854,775,808 to 9,223,372,036,854,775,807
u_long | 64 | no | 0 to 18,446,744,073,709,551,615
int | 32 | yes | −2,147,483,648 to 2,147,483,647 to 2,147,483,648 to 2,147,483,646
u_int | 32 | no | 0 to 4,294,967,295
short | 16 | yes | -32,768 to 32,767
u_short | 16 | no | 0 to 65,535
byte | 8 | yes | -128 to 127
u_byte | 8 | no | 0 to 255

### List of methods (non-class, bitint value specific)

**Method** | **Does what:**
---------- | --------------
**Bitwise operation** |
and(num1, num2); | Bitwise and ( & )
or(num1, num2); | Bitwise or ( \| )
xor(num1, num2); | Bitwise exclusive or ( ^ )
not(num) | Bitwise not ( ~ )
nand(num1, num2) | Bitwise not and (! ( x & y) )
nor(num1, num2) | Bitwise not or (! (x \| y) )
xnor(num1, num2) | Bitwise not excluse or (! (x ^ y))
-- | --
shift(num, amount, arithmetic = false) | Returns *num* shifted *amount* (to left when amount < 0) bits. Arithmetic specifies carry or non-carry shifts
shiftr(num, amount, arithmetic = false) | Returns *num* shifted *amount* times to the right. Specify arithmetic as true if you want a carry shift.  
shiftl(num, amount, arithmetic = false) | Returns *num* shifted *amount* times to the left. Arithmetic is ignored.
rot(num, amount) | Returns *num* rotated *amount* times (to left when amount < 0) bits.
rotr(num, amount) | Returns *num* rotated *amount* times to the right.
rotl(num, amount) | Returns *num* rotated *amount* times to the left.
**Arithmetic** |
add(num1, num2, signed = false) | Returns sum of *num1* and *num2*. *signed* should be set to true if numbers are signed. Defaults to false.
minus(num1, num2, signed = false) | Returns differnce of *num1* and *num2*. *signed* should be set to true if numbers are signed. Defaults to false.
multiply(num1, num2, signed = false) | Returns product of *num1* and *num2*. *signed* should be set to true if numbers are signed. Defaults to false.
divide(num1, num2, signed = false) | not implemented
modulo(num1, moduloFactors, signed = false) | not implemented
moduloAdd( ? ) | not implemented
**Conversion** |
numToBitint(num, size = 32, signed = false) | Returns a number passed in a string as a bitint. Signed must be specified as true if number is negative.
tonum(bitint) | Returns a bitint converted to a number. Only works accurately for numbers up to Number.MAX_SAFE_INTEGER. (approx 2**53)
tosignum(bitint) | Returns a bitint converted to a number, but treats bitint as a signed numbers. Limit is the same as with tonum.
