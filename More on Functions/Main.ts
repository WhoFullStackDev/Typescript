// Function Type Expressions
function greeter(fn: (a: string) => void) {
  fn("Hello world");
}

function printToConsole(s: string) {
  console.log(s);
}

greeter(printToConsole);

// Call Signatures
type DescribableFunction = {
  description: string;
  (sameArg: number): boolean;
};

function doSomethings(fn: DescribableFunction) {
  console.log(fn.description + " return " + fn(6));
}

function myFunc(sameArg: number) {
  return sameArg > 3;
}

myFunc.description = "Default Description";

doSomethings(myFunc);

// Construct Signatures

type SomeObjects = {
  new (s: string): SomeObjects;
};

function fn(ctor: SomeObjects) {
  return new ctor("hello");
}

interface CallOrConstruct {
  (n?: number): string;
  new (s: string): Date;
}

function call(ctor: CallOrConstruct) {
  console.log(ctor(10));
  console.log(new ctor("10"));
}

call(Date);

// Generic Functions

function firstElement<Type>(arr: Type[]): Type | undefined {
  return arr[0];
}

// s is of type 'string'
const s = firstElement(["a", "b", "c"]);
// n is of type 'number'
const n = firstElement([1, 2, 3]);
// u is of type undefined
const u = firstElement([]);

//Inference
function map<Input, Output>(
  arr: Input[],
  func: (arg: Input) => Output
): Output[] {
  return arr.map(func);
}

// Parameter 'n' is of type 'string'
// 'parsed' is of type 'number[]'
const parsed = map(["1", "2", "3"], (n) => parseInt(n));

// Constraints
function longest<Type extends { length: number }>(a: Type, b: Type) {
  if (a.length <= b.length) {
    return a;
  } else {
    return b;
  }
}

// longerArray is of type 'number[]'
const longerArray = longest([1, 2], [1, 2, 3]);
// longerString is of type 'alice' | 'bob'
const longerString = longest("alice", "bob");
// Error! Numbers don't have a 'length' property
// const notOK = longest(10, 100);

function minimumLength<Type extends { length: number }>(
  arr: Type,
  minimum: number
): Type {
  if (arr.length <= minimum) {
    return arr;
  } else return { length: minimum };
}

const arr = minimumLength([1, 2, 3], 6);
// and crashes here because arrays have
// a 'slice' method, but not the returned object!
console.log(arr.slice(0));

function combine<Type>(arr1: Type[], arr2: Type[]): Type[] {
  return arr1.concat(arr2);
}

combine<number | string>([1, 2, 3], ["Hello"]);

function firstElement1<Type>(arr: Type[]) {
  return arr[0];
}

function firstElement2<Type extends any[]>(arr: Type) {
  return arr[0];
}

// a: number (good)
const a = firstElement1([1, 2, 3]);
// b: any (bad)
const b = firstElement2([1, 2, 3]);

function filter1<Type>(arr: Type[], func: (arg: Type) => boolean): Type[] {
  return arr.filter(func);
}

function filter2<Type, Func extends (arg: Type) => boolean>(
  arr: Type[],
  func: Func
): Type[] {
  return arr.filter(func);
}

// function greet<Str extends string>(s: Str) {
//   console.log("Hello, " + s);
// }

// greet("world");

function greet(s: String) {
  console.log(s);
}
