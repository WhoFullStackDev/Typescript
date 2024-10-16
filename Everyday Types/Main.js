// let myName: string = "Kingsuk";
// No type annotation needed -- 'myName' inferred as type 'string'
var myName = "Alice";
// Parameter type annotation
function greet(name) {
    console.log("Hello, " + name.toUpperCase() + "!!");
    return 26;
}
greet(myName);
// async function getFavoriteNumber(): Promise<number> {
//   return 26;
// }
var names = ["Alice", "Bob", "Eve"];
// Contextual typing for function - parameter s inferred to have type string
names.forEach(function (s) {
    console.log(s.toUpperCase());
});
// Contextual typing also applies to arrow functions
names.forEach(function (s) {
    console.log(s.toUpperCase());
});
function printCoord(pr) {
    console.log("x value is ".concat(pr.x));
    console.log("y value is ".concat(pr.y));
}
printCoord({ x: 3, y: 4 });
function Name(obj) {
    console.log("My name is ".concat(obj.firstName, " ").concat(obj.lastName ? obj.lastName : ""));
}
Name({ firstName: "kingsuk" });
Name({ firstName: "Kingsuk", lastName: "bera" });
// *****************Union Types*****************
function printId(id) {
    if (typeof id === "string") {
        // In this branch, id is of type 'string'
        console.log(id.toUpperCase());
    }
    else {
        // Here, id is of type 'number'
        console.log(id);
    }
}
printId(22);
printId("22");
// printId({MyId:22}) ===> this throw an error
function welcomePeople(x) {
    if (Array.isArray(x)) {
        // Here: 'x' is 'string[]'
        console.log("Hello, " + x.join(" and "));
    }
    else {
        // Here: 'x' is 'string'
        console.log("Welcome lone traveler " + x);
    }
}
// Return type is inferred as number[] | string
function getFirstThree(x) {
    return x.slice(0, 3);
}
function printcod(pt) {
    console.log("The coordinate's x value is " + pt.x);
    console.log("The coordinate's y value is " + pt.y);
}
printcod({ x: 600, y: 200 });
function printcood(pt) {
    console.log("The coordinate's x value is " + pt.x);
    console.log("The coordinate's y value is " + pt.y);
}
printcood({ x: 200, y: 300 });
// *****************Interfaces*****************
// Extending an interface
// interface Animal {
//   name: string;
// }
// interface Bear extends Animal {
//   honey: boolean;
// }
// const bear = getBear();
// bear.name;
// bear.honey;
// Adding new fields to an existing interface
// interface Window {
//   title: string;
// }
// interface Window {
//   ts: TypeScriptAPI;
// }
// const src = 'const a = "Hello World"';
// window.ts.transpileModule(src, {});
// *****************Type*****************
// Extending a type via intersections
// type Animal = {
//   name: string;
// };
// type Bear = Animal & {
//   honey: boolean;
// };
// const bear = getBear();
// bear.name;
// bear.honey;
// A type cannot be changed after being created
// type Window = {
//   title: string;
// };
// type Window = {
//   ts: TypeScriptAPI;
// };
// const myCanvas = document.getElementById("my-canvas") as HTMLCanvasElement;
// const myCanvasDoublicate = <HTMLCanvasElement>(
//   document.getElementById("my-canvas")
// );
// const x = "hello" as number;
// const a = expr as any as T;
// let changingString = "Hello World";
// changingString = "Olá Mundo";
// changingString;
var changingString = "Hello world";
changingString;
var x = "Hello";
// x = "dogy"; -->This throw an type error
// *****************Literal Types*****************
function printText(s, alignment) {
    // ...
}
printText("Hello, world", "left");
// printText("G'day, mate", "centre"); --> Throw an error
function compare(a, b) {
    // return a === b ? 3: a > b ? 2 : -4; --> if you don't return 1,0 or -1 this throw a type error
    return 0;
}
function configure(x) {
    // ...
}
configure({ width: 100 });
configure("auto");
// configure("automatic"); --->Throw an error
var obj = { counter: 0 };
if (true) {
    obj.counter = 1;
}
console.log(obj);
