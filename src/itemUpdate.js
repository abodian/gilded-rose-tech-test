class ItemUpdate {
  constructor() {}
  // this class makes necessary changes at the end of a day for each item type
  normalItem(item) {
    const isExpired = item.sellIn <= 0;

    if (item.quality > 0) {
      item.quality -= isExpired ? 2 : 1;
    }

    item.sellIn--;

    return item;
  }

  agedBrie(item) {
    item.sellIn--;
    item.quality++;

    return item;
  }

  sulfuras(item) {
    const error = 'Something has gone wrong, Sulfuras be lvl 50!';

    item.quality === 50 ? item.quality : console.log(error);
  }

  conjured(item) {}

  backstagePass(item) {}
}

module.exports = ItemUpdate;
