function padLeft(padding: number | string, input: string): string {
  if (typeof padding === "number") {
    // return " ".repeat(padding) + input;
  }
  return padding + input;
}

// typeof type guards

function printAll(str: string | string[] | null) {
  if (str && typeof str === "object") {
    for (const s of str) {
      console.log(s);
    }
  } else if (typeof str === "string") {
    console.log(str);
  } else {
    // do nothing
  }
}

// Truthiness narrowing
function getUsersOnlineMessage(numUsersOnline: number) {
  if (numUsersOnline) {
    return `There are ${numUsersOnline} online now!`;
  }
  return "Nobody's here. :(";
}

Boolean("hello"); // type: boolean, value: true
// !!"world";

function multiplyAll(
  values: number[] | undefined,
  factor: number
): number[] | undefined {
  if (!values) {
    return values;
  } else {
    return values.map((x) => x * factor);
  }
}
const value = [2, 3, 4];
const factor = 2;

multiplyAll(value, factor);

// Equality narrowing
function example(x: string | number, y: string | boolean) {
  if (x === y) {
    console.log(x);
    console.log(y);
  } else {
    console.log(x);
    console.log(y);
  }
}

interface Container {
  value: null | number | undefined;
}

function multiplyValue(container: Container, factor: number) {
  // Remove both 'null' and 'undefined' from the type.
  if (container.value != null) {
    console.log(container.value);

    // Now we can safely multiply 'container.value'.
    container.value *= factor;
  }
}

// The in operator narrowing

type Fish = { swim: () => void };
type Bird = { fly: () => void };
type Human = { swim?: () => void; fly?: () => void };

function move(animal: Fish | Bird | Human) {
  if ("swim" in animal) {
    animal;
  } else {
    animal;
  }
}

// instanceof narrowing
function logValue(x: Date | string) {
  if (x instanceof Date) {
    console.log(x.toUTCString());
  } else {
    console.log(x.toUpperCase());
  }
}

// Assignments

let d = Math.random() < 0.5 ? 10 : "hello world!";

d = 1;

console.log(d);

d = "goodbye!";

console.log(d);

// d=true this throw a error
console.log(d);

// Control flow analysis
function examples() {
  let x: string | number | boolean;

  x = Math.random() < 0.5;

  console.log(x);

  if (Math.random() < 0.5) {
    x = "hello";
    console.log(x);
  } else {
    x = 100;
    console.log(x);
  }

  return x;
}

// Using type predicates

function isFish(pet: Fish | Bird): pet is Fish {
  return (pet as Fish).swim !== undefined;
}

// const zoo: (Fish | Bird)[] = [getSmallPet(), getSmallPet(), getSmallPet()];
// const underWater1: Fish[] = zoo.filter(isFish);
// // or, equivalently
// const underWater2: Fish[] = zoo.filter(isFish) as Fish[];

// The predicate may need repeating for more complex examples
// const underWater3: Fish[] = zoo.filter((pet): pet is Fish => {
//   if (pet.name === "sharkey") return false;
//   return isFish(pet);
// });

// Discriminated unions
interface Circle {
  kind: "circle";
  radius: number;
}

interface Square {
  kind: "square";
  sideLength: number;
}

interface Triangle {
  kind: "triangle";
  sideLength: number;
}

type Shape = Circle | Square | Triangle;

function getArea(shape: Shape) {
  switch (shape.kind) {
    case "circle":
      return Math.PI * shape.radius ** 2;
    case "square":
      return shape.sideLength ** 2;
    default:
      // Exhaustiveness checking
      const _exhaustiveCheck: never = shape;
      return _exhaustiveCheck;
  }
}
