const getRandom = (min, max) => Math.floor(Math.random() * (max - min) + min);

class Bag {
  constructor(maxBagSize) {
    this.maxBagSize = maxBagSize;
    this.bagSize = maxBagSize;
    this.items = [];
  }

  addItemsInBag(data) {
    for (const item of data) {
      // many item fit in bag;
      const fillBag = Math.floor(this.bagSize / item.size);

      this.bagSize = this.bagSize - fillBag * item.size;
      this.items.push({
        amountItems: fillBag,
        weight: item.weight,
        size: item.size
      });
    }
  }

  getItemsInBag() {
    return this.items;
  }

  getBagValue() {
    return this.items.reduce(
      (acc, itemBag) => acc + itemBag.amountItems * itemBag.weight,
      0
    );
  }

  getBagSize() {
    return this.items.reduce(
      (acc, itemBag) => acc + itemBag.amountItems * itemBag.size,
      0
    );
  }
}

const BAG_SIZE = 19;
const minRandom = 2;
const max = 10;

const data = [
  { weight: getRandom(max, max + 10), size: getRandom(minRandom, max), pi: 0 },
  { weight: getRandom(max, max + 10), size: getRandom(minRandom, max), pi: 0 },
  { weight: getRandom(max, max + 10), size: getRandom(minRandom, max), pi: 0 }
];

/**
 * PASSO 1
 * 1.1 Defina πi da seguinte forma:
 */
for (const item of data) {
  item.pi = Math.floor(item.weight / item.size);
}

/**
 * PASSO 1
 * 1.2 Ordenar pi do maior para o menor
 */
data.sort((a, b) => a.pi < b.pi);

/**
 * PASSO 1
 * 1.3 Defina G = 0, o melhor valor para o objetivo da mochila encontrado.
 */
let bestItem = 0;

console.log("\n Dados ordenados por π");
console.table(data);

/**
 * PASSO 2
 * 2.1 Determine a solução X = (x1, x2, . . . , xn)
 * Encontrar quantos items cabem na mochila
 */
const bag = new Bag(BAG_SIZE);

/**
 * PASSO 3
 * Avaliação da Solução corrente e armazenamento da mais valiosa
 */
bag.addItemsInBag(data);

console.log("\n Itens na mochila");
console.table(bag.getItemsInBag());

console.log(`Valor da mochila:  ${bag.getBagValue()}`);
console.log(`Tamanho da mochila:  ${bag.getBagSize()}`);
console.log(`Tamanho Maximo da mochila: ${BAG_SIZE}`);
