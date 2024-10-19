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
