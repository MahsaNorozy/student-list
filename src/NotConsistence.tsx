function calculateTotal(items: any[]) {
  let total = 0;
  for (let i = 0; i < items.length; i++) {
    total += items[i].price;
  }
  return total;
}

export default calculateTotal;

// Not clean (inconsistent styling) From Buch C.C T.S React, Seite 29
// and https://rules.sonarsource.com/typescript/RSPEC-4138/
