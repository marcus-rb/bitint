# bitint.js

A JavaScript library for working with integers of sizes 8, 16, 32 and 64, signed and unsigned.

## Important notes
> this is still under development

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

### Some JavaScript:
```JavaScript
const plus5738 = new u_short("5739");
