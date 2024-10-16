// let myName: string = "Kingsuk";

// No type annotation needed -- 'myName' inferred as type 'string'
let myName = "Alice";

// Parameter type annotation
function greet(name: string): number {
  console.log("Hello, " + name.toUpperCase() + "!!");
  return 26;
}

greet(myName);

// async function getFavoriteNumber(): Promise<number> {
//   return 26;
// }

const names = ["Alice", "Bob", "Eve"];

// Contextual typing for function - parameter s inferred to have type string
names.forEach(function (s) {
  console.log(s.toUpperCase());
});

// Contextual typing also applies to arrow functions
names.forEach((s) => {
  console.log(s.toUpperCase());
});

function printCoord(pr: { x: number; y: number }) {
  console.log(`x value is ${pr.x}`);
  console.log(`y value is ${pr.y}`);
}

printCoord({ x: 3, y: 4 });

function Name(obj: { firstName: string; lastName?: string }) {
  console.log(
    `My name is ${obj.firstName} ${obj.lastName ? obj.lastName : ""}`
  );
}

Name({ firstName: "kingsuk" });
Name({ firstName: "Kingsuk", lastName: "bera" });

// *****************Union Types*****************
function printId(id: number | string) {
  if (typeof id === "string") {
    // In this branch, id is of type 'string'
    console.log(id.toUpperCase());
  } else {
    // Here, id is of type 'number'
    console.log(id);
  }
}

printId(22);
printId("22");
// printId({MyId:22}) ===> this throw an error

function welcomePeople(x: string[] | string) {
  if (Array.isArray(x)) {
    // Here: 'x' is 'string[]'
    console.log("Hello, " + x.join(" and "));
  } else {
    // Here: 'x' is 'string'
    console.log("Welcome lone traveler " + x);
  }
}

// Return type is inferred as number[] | string
function getFirstThree(x: number[] | string) {
  return x.slice(0, 3);
}

// *****************Type Aliases*****************

type points = {
  x: number;
  y: number;
};

function printcod(pt: points) {
  console.log("The coordinate's x value is " + pt.x);
  console.log("The coordinate's y value is " + pt.y);
}

printcod({ x: 600, y: 200 });

type ID = number | string;

// *****************Interfaces*****************
interface point3 {
  x: number;
  y: number;
}

function printcood(pt: point3) {
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

const changingString = "Hello world";

changingString;

let x: "Hello" = "Hello";

// x = "dogy"; -->This throw an type error

// *****************Literal Types*****************

function printText(s: string, alignment: "left" | "right" | "center") {
  // ...
}
printText("Hello, world", "left");
// printText("G'day, mate", "centre"); --> Throw an error

function compare(a: string, b: string): -1 | 0 | 1 {
  // return a === b ? 3: a > b ? 2 : -4; --> if you don't return 1,0 or -1 this throw a type error
  return 0;
}

interface Options {
  width: number;
}
function configure(x: Options | "auto") {
  // ...
}
configure({ width: 100 });
configure("auto");
// configure("automatic"); --->Throw an error

// *****************Literal Inference*****************
const obj = { counter: 0 };
if (true) {
  obj.counter = 1;
}

console.log(obj);

declare function handleRequest(url: string, method: "GET" | "POST"): void;

// const req = { url: "https://example.com", method: "GET" };
// handleRequest(req.url, req.method);----> this throw error because req.method give string not "GET"

// Change 1:
// const req = { url: "https://example.com", method: "GET" as "GET" };
// Change 2
// handleRequest(req.url, req.method as "GET");

const req = { url: "https://example.com", method: "GET" } as const;

handleRequest(req.url, req.method);

// *****************Null Check*****************
function doSomething(x: string | null) {
  if (x === null) {
    // do nothing
  } else {
    console.log("Hello, " + x.toUpperCase());
  }
}

// *****************Non-null Assertion Operator (Postfix !)*****************
function liveDangerously(x?: number | null) {
  // No error
  console.log(x!.toFixed());
}

// *****************bigint;*****************
// Creating a bigint via the BigInt function
const oneHundred: bigint = BigInt(100);

// Creating a BigInt via the literal syntax
const anotherHundred: bigint = 100n;

// *****************Symbol*****************
const firstName = Symbol("name");
const secondName = Symbol("name");

// if (firstName === secondName) {
// This comparison appears to be unintentional because the types 'typeof firstName' and 'typeof secondName' have no overlap.

//   // Can't ever happen
// }
