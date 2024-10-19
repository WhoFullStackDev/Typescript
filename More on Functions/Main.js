// Function Type Expressions
function greeter(fn) {
    fn("Hello world");
}
function printToConsole(s) {
    console.log(s);
}
greeter(printToConsole);
function doSomethings(fn) {
    console.log(fn.description + " return " + fn(6));
}
function myFunc(sameArg) {
    return sameArg > 3;
}
myFunc.description = "Default Description";
doSomethings(myFunc);
function fn(ctor) {
    return new ctor("hello");
}
function call(ctor) {
    console.log(ctor(10));
    console.log(new ctor("10"));
}
call(Date);
