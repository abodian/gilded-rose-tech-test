const Item = require('./item');

describe('Item class', () => {
  it('creates a new item with the correct properties', () => {
    const name = 'Frosty Soul';
    const sellIn = 20;
    const quality = 10;
    const item = new Item(name, sellIn, quality);
    expect(item.name).toBe(name);
    expect(item.sellIn).toBe(sellIn);
    expect(item.quality).toBe(quality);
  });
});
