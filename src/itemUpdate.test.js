/* eslint-disable max-len */
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

  describe('Normal item', () => {
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

  describe('Aged Brie item', () => {
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

  describe('Sulfuras item', () => {
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

  describe('Conjured Item', () => {
    it('it should degrade in quality by 2', () => {
      item = new Item('Conjured Water', 10, 10);
      itemUpdate.conjured(item);

      expect(item.name).toBe('Conjured Water');
      expect(item.sellIn).toBe(9);
      expect(item.quality).toBe(8);
    });

    it('it should degrade in quality by 4 when sellIn is less than 0', () => {
      item = new Item('Conjured Water', 0, 8);
      itemUpdate.conjured(item);

      expect(item.name).toBe('Conjured Water');
      expect(item.sellIn).toBe(-1);
      expect(item.quality).toBe(4);
    });

    it('does not degrade quality below 0, sellIn below 0', () => {
      item = new Item('Conjured Water', 0, 2);
      itemUpdate.conjured(item);

      expect(item.name).toBe('Conjured Water');
      expect(item.sellIn).toBe(-1);
      expect(item.quality).toBe(0);
    });

    it('does not degrade quality below 0, sellIn above 0', () => {
      item = new Item('Conjured Water', 2, 1);
      itemUpdate.conjured(item);

      expect(item.name).toBe('Conjured Water');
      expect(item.sellIn).toBe(1);
      expect(item.quality).toBe(0);
    });
  });

  describe('Backstage Pass item', () => {
    it('increases in quality by 1 each day', () => {
      item = new Item('Backstage Pass', 20, 10);
      itemUpdate.backstagePass(item);

      expect(item.name).toBe('Backstage Pass');
      expect(item.quality).toBe(11);
    });

    it('decreases sellIn by 1 each day', () => {
      item = new Item('Backstage Pass', 20, 10);
      itemUpdate.backstagePass(item);

      expect(item.name).toBe('Backstage Pass');
      expect(item.sellIn).toBe(19);
      expect(item.quality).toBe(11);
    });

    it('increases in quality by 2 when between 10 and 6 days sellIn', () => {
      item = new Item('Backstage Pass', 10, 10);
      itemUpdate.backstagePass(item);

      expect(item.name).toBe('Backstage Pass');
      expect(item.sellIn).toBe(9);
      expect(item.quality).toBe(12);
    });

    it('increases in quality by 2 when between 10 and 6 days sellIn, full range', () => {
      item = new Item('Backstage Pass', 10, 10);
      for (item.sellIn = 10; item.sellIn >= 6; ) {
        itemUpdate.backstagePass(item);
      }

      expect(item.name).toBe('Backstage Pass');
      expect(item.sellIn).toBe(5);
      expect(item.quality).toBe(20);
    });

    it('increases in quality by 3 when between 5 and 0 days sellIn', () => {
      item = new Item('Backstage Pass', 5, 10);
      itemUpdate.backstagePass(item);

      expect(item.name).toBe('Backstage Pass');
      expect(item.sellIn).toBe(4);
      expect(item.quality).toBe(13);
    });

    it('increases in quality by 3 when between 5 and 0 days sellIn, full range', () => {
      item = new Item('Backstage Pass', 5, 10);
      for (item.sellIn = 5; item.sellIn > 0; ) {
        itemUpdate.backstagePass(item);
      }

      expect(item.name).toBe('Backstage Pass');
      expect(item.sellIn).toBe(0);
      expect(item.quality).toBe(25);
    });

    it.skip('sets quality to 0 when sellIn is set at 0', () => {
      item = new Item('Backstage Pass', 0, 10);
      itemUpdate.backstagePass(item);

      expect(item.name).toBe('Backstage Pass');
      expect(item.sellIn).toBe(-1);
      expect(item.quality).toBe(0);
    });

    it.skip('quality remains at 0 once set at that', () => {
      item = new Item('Backstage Pass', -1, 0);
      itemUpdate.backstagePass(item);

      expect(item.name).toBe('Backstage Pass');
      expect(item.sellIn).toBe(-2);
      expect(item.quality).toBe(0);
    });
  });
});
