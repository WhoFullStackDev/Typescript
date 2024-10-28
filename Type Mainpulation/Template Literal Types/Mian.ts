type World = "world";

type Greeting = `hello ${World}`;

type EmailLocaleIDs = "welcome_email" | "email_heading";
type FooterLocaleIDs = "footer_title" | "footer_sendoff";

type AllLocaleIDs = `${EmailLocaleIDs | FooterLocaleIDs}_id`;
type Lang = "en" | "ja" | "pt";

type LocaleMessageIDs = `${Lang}_${AllLocaleIDs}`;

// String Unions in Types
const passedObject = {
  firstName: "Saoirse",
  lastName: "Ronan",
  age: 26,
};

const person = makeWatchedObject({
  firstName: "Saoirse",
  lastName: "Ronan",
  age: 26,
});

// makeWatchedObject has added `on` to the anonymous Object

person.on("firstNameChanged", (newValue) => {
  console.log(`firstName was changed to ${newValue}!`);
});

type PropEventSource<Type> = {
  on(
    eventName: `${string & keyof Type}Changed`,
    callback: (newValue: any) => void
  ): void;
};

/// Create a "watched object" with an `on` method
/// so that you can watch for changes to properties.
declare function makeWatchedObject<Type>(
  obj: Type
): Type & PropEventSource<Type>;

type PropEventSource1<Type> = {
  on<Key extends string & keyof Type>(
    eventName: `${Key}Changed`,
    callback: (newValue: Type[Key]) => void
  ): void;
};

declare function makeWatchedObject<Type>(
  obj: Type
): Type & PropEventSource1<Type>;

const person1 = makeWatchedObject({
  firstName: "Saoirse",
  lastName: "Ronan",
  age: 26,
});

person1.on("firstNameChanged", (newName) => {
  console.log(`new name is ${newName.toUpperCase()}`);
});

person1.on("ageChanged", (newAge) => {
  if (newAge < 0) {
    console.warn("warning! negative age");
  }
});

type ShoutyGreeting = Uppercase<Greeting>;

// type ASCIICacheKey<Str extends string> = `ID-${Uppercase<Str>}`;
// type MainID = ASCIICacheKey<"my_app">;

type QuietGreeting = Lowercase<Greeting>;

type ASCIICacheKey<Str extends string> = `id-${Lowercase<Str>}`;
type MainID = ASCIICacheKey<"MY_APP">;

type LowercaseGreeting = "hello, world";
type GreetingS = Capitalize<LowercaseGreeting>;

type UppercaseGreeting = "HELLO WORLD";
type UncomfortableGreeting = Uncapitalize<UppercaseGreeting>;
