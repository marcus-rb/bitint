# bitint.js

A JavaScript framework for working with integers of sizes 8, 16, 32- and 64 bits, signed and unsigned.
Developed with the intention of

## Important notes
> this is still under development
> updates are rolled out as soon as the implemented improvement is properly functional

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

### List of methods

**Method** | **Does what:**
---------- | --------------
Bitwise operation |
