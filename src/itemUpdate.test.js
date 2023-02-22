const ItemUpdate = require('./itemUpdate');
const Item = require('./item');

describe('ItemUpdate class', () => {
  jest.mock('./item', () => {
    return jest.fn().mockImplementation((name, sellIn, quality) => {
      return {
        name,
        sellIn,
        quality,
      };
    });
  });

  const consoleSpy = jest.spyOn(console, 'log');

  beforeEach(() => {
    itemUpdate = new ItemUpdate();
  });

  describe('Normal Item', () => {
    it('reduces quality and sellin value of a normal item by one', () => {
      item = new Item('Wool Cloth', 10, 10);
      itemUpdate.normalItem(item);

      expect(item.name).toBe('Wool Cloth');
      expect(item.sellIn).toBe(9);
      expect(item.quality).toBe(9);
    });

    it('does not reduce quality below 0', () => {
      item = new Item('Wool Cloth', 6, 0);
      itemUpdate.normalItem(item);

      expect(item.name).toBe('Wool Cloth');
      expect(item.sellIn).toBe(5);
      expect(item.quality).toBe(0);
    });

    it('quality reduces by two after sellIn date passes', () => {
      item = new Item('Wool Cloth', 0, 10);
      itemUpdate.normalItem(item);

      expect(item.name).toBe('Wool Cloth');
      expect(item.sellIn).toBe(-1);
      expect(item.quality).toBe(8);
    });
  });

  describe('Aged Brie', () => {
    it('reduces sellin value by 1 each day', () => {
      item = new Item('Aged Brie', 10, 10);
      itemUpdate.agedBrie(item);

      expect(item.name).toBe('Aged Brie');
      expect(item.sellIn).toBe(9);
    });

    it('increases in quality each day', () => {
      item = new Item('Aged Brie', 10, 10);
      itemUpdate.agedBrie(item);

      expect(item.name).toBe('Aged Brie');
      expect(item.sellIn).toBe(9);
      expect(item.quality).toBe(11);
    });
  });

  describe('Sulfuras', () => {
    it('returns sulfuras item unaltered', () => {
      item = new Item('Sulfuras', 0, 50);
      itemUpdate.sulfuras(item);

      expect(item.name).toBe('Sulfuras');
      expect(item.sellIn).toBe(0);
      expect(item.quality).toBe(50);
    });

    it('returns error if sulfuras is anything other than lvl 50', () => {
      item = new Item('Sulfuras', 0, 30);
      itemUpdate.sulfuras(item);
      expect(consoleSpy).toHaveBeenCalledWith(
          'Something has gone wrong, Sulfuras be lvl 50!',
      );
    });
  });
});
