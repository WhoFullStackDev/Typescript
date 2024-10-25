// Prints "string"
console.log(typeof "Hello world");

let s = "hello";
let n: typeof s;

type Predicate = (x: unknown) => boolean;
type K = ReturnType<Predicate>;


function f() {
  return { x: 10, y: 3 };
}
type P = ReturnType<typeof f>;

let shouldContinue: typeof msgbox("Are you sure you want to continue?");