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

  conjured(item) {
    const isExpired = item.sellIn <= 0;

    if (item.quality > 0) {
      item.quality -= isExpired ? 4 : 2;
      item.quality < 0 ? (item.quality = 0) : item.quality;
    }

    item.sellIn--;

    return item;
  }

  backstagePass(item) {
    const isDoubleQuality = item.sellIn <= 10 && item.sellIn >= 6;
    const isTripleQuality = item.sellIn <= 5 && item.sellIn > 0;

    if (isDoubleQuality) {
      item.quality += 2;
    } else if (isTripleQuality) {
      item.quality += 3;
    } else {
      item.quality++;
    }

    item.sellIn--;
  }
}

module.exports = ItemUpdate;
