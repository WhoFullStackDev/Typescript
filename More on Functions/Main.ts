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

// optional parameters
function f(n: number, x?: number) {
  console.log(n.toFixed());
  console.log(n.toFixed(3));
}

f(3);
f(3, 1);

// Optional Parameters in Callbacks
function myForEach(arr: any[], callback: (arg: any, index?: number) => void) {
  for (let i = 0; i < arr.length; i++) {
    callback(arr[i], i);
  }
}

myForEach([1, 2, 3], (a) => console.log(a));
myForEach([1, 2, 3], (a, i) => console.log(a, i));

// Function overloads
function makeDate(timestamp): Date;
function makeDate(m: number, d: number, y: number): Date;
function makeDate(mOrTimestamp: number, d?: number, y?: number): Date {
  if (d !== undefined && y !== undefined) {
    return new Date(d, mOrTimestamp, y);
  } else {
    return new Date(mOrTimestamp);
  }
}

const d1 = makeDate(12345678);
const d2 = makeDate(5, 5, 5);
const d3 = makeDate(1, 3);

// Overload Signatures and the Implementation Signature
function overSing(x: string): void;
function overSing(x: boolean): void;
function overSing(x: string) {}

function overSing1(x: string): string;
// Return type isn't right
function overSing1(x: number): boolean;
function overSing1(x: string | number) {
  return "oops";
}

// Writing Good Overloads
function len(s: string): number;
function len(arr: any[]): number;
function len(x: any[] | string) {
  return x.length;
}

// Declaring this in a Function
const user = {
  id: 123,
  admin: false,
  becomeAdmin: function () {
    this.admin = true;
  },
};

interface DB {
  filterUsers(filter: (this: User) => boolean): User[];
}

const db = getDB();
const admins = db.filterUsers(function (this: User) {
  return this.admin;
});

// Other Types to Know AboutS
function noop() {
  return;
}

function f1(a: any) {
  a.b();
}

function f2(a: unknown) {
  a.b();
}

function fail(msg: string): never {
  throw new Error(msg);
}

function fn2(x: string | number) {
  if (typeof x === "string") {
    // do something
  } else if (typeof x === "number") {
    // do something else
  } else {
    x; // has type 'never'!
  }
}

function doSomethings1(f: Function) {
  return f(1, 2, 3);
}

// Rest Parameters and Arguments
function multiply(n: number, ...m: number[]) {
  return m.map((x) => n * x);
}
// 'er' gets value [10, 20, 30, 40]
const er = multiply(10, 1, 2, 3, 4);

const arr1 = [1, 2, 3];
const arr2 = [4, 5, 6];
arr1.push(...arr2);

const args = [8, 5] as const;
const angle = Math.atan2(...args);

// Parameter Destructuring
// function sum({ a, b, c }) {
//   console.log(a + b + c);
// }
// sum({ a: 10, b: 3, c: 9 });

// Same as prior example
// function sum({ a, b, c }: { a: number; b: number; c: number }) {
//   console.log(a + b + c);
// }

type ABC = { a: number; b: number; c: number };
function sum({ a, b, c }: ABC) {
  console.log(a + b + c);
}

// Assignability of Functions
type voidFunc = () => void;

const f5: voidFunc = () => {
  return true;
};

const f4: voidFunc = () => true;

const f3: voidFunc = function () {
  return true;
};

const v1 = f4();

const v2 = f5();

const v3 = f3();

const src = [1, 2, 3];
const dst = [0];

src.forEach((el) => dst.push(el));

function f7(): void {
  // @ts-expect-error
  return true;
}

const f6 = function (): void {
  // @ts-expect-error
  return true;
};
