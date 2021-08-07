export const sayHello = () => {
  console.log('hi');
};

export const sayGoodbye = () => {
  console.log('goodbye');
};

export const sum = (a: number, b: number) => {
  if ('development' === process.env.NODE_ENV) {
    console.log('boop');
  }
  return a + b;
};
