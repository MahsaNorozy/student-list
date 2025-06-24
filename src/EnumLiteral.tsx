function EnumMixValues() {
  const hello = "Hello";
  enum Foo {
    NUMBER = hello.length + 1, // Expression
    OBJECT = { hello }.hello.length, // Object
    SET = new Set([hello, "world"]).size, // Constructor
    STRING = hello, // Variable
    TEMPLATE = `${hello}, World`, // Template literal
  }

  return <div>{Foo.NUMBER}</div>;
}

export default EnumMixValues;
