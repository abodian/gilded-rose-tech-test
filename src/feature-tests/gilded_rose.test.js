const Shop = require('../shop');
const Item = require('../item');

describe('Gilded Rose', function() {
  it('should foo', function() {
    const gildedRose = new Shop([new Item('foo', 0, 0)]);
    const items = gildedRose.updateQuality();
    expect(items[0].name).toBe('foo');
  });
});
