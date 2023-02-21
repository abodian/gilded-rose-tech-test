require('./item');

class Shop {
  // takes an object of item instances and puts them into this.items
  constructor(items = []) {
    this.items = items;
  }
  updateQuality() {
    // checks for elements not called Aged Brie or Backstage pass
    for (let i = 0; i < this.items.length; i++) {
      if (
        this.items[i].name != 'Aged Brie' &&
        this.items[i].name != 'Backstage passes to a TAFKAL80ETC concert'
      ) {
        /* checks for items with quality above 0
        and items not called sulfuras and hand of ragnaros
        decreases quality by -1 */
        if (this.items[i].quality > 0) {
          if (this.items[i].name != 'Sulfuras, Hand of Ragnaros') {
            this.items[i].quality = this.items[i].quality - 1;
          }
        }
        // for aged brie and backstage passes
      } else {
        // if quality less than max of 50, +1 quality
        if (this.items[i].quality < 50) {
          this.items[i].quality = this.items[i].quality + 1;
          if (
            // if backstage pass
            this.items[i].name == 'Backstage passes to a TAFKAL80ETC concert'
          ) {
            // pass less than 11 days from sellIn and less than 50, +1 quality
            if (this.items[i].sellIn < 11) {
              if (this.items[i].quality < 50) {
                this.items[i].quality = this.items[i].quality + 1;
              }
            }
            // pass less than 6 days from sellIn and less than 50, +1 quality
            if (this.items[i].sellIn < 6) {
              if (this.items[i].quality < 50) {
                this.items[i].quality = this.items[i].quality + 1;
              }
            }
          }
        }
      }
      // if item is not sulfuras or hand of ragnaros, -1 sellIn
      if (this.items[i].name != 'Sulfuras, Hand of Ragnaros') {
        this.items[i].sellIn = this.items[i].sellIn - 1;
      }
      // and sellIn is less than 0, not brie or backstage pass, do nothing
      if (this.items[i].sellIn < 0) {
        if (this.items[i].name != 'Aged Brie') {
          if (
            this.items[i].name != 'Backstage passes to a TAFKAL80ETC concert'
          ) {
            // but if item is greater than 0, not sulf or hand, -1 quality
            if (this.items[i].quality > 0) {
              if (this.items[i].name != 'Sulfuras, Hand of Ragnaros') {
                this.items[i].quality = this.items[i].quality - 1;
              }
            }
          } else {
            // remove all quality from backstage pass when past sellIn 0
            this.items[i].quality =
              this.items[i].quality - this.items[i].quality;
          }
        } else {
          // adds quality to brie if under 50
          if (this.items[i].quality < 50) {
            this.items[i].quality = this.items[i].quality + 1;
          }
        }
      }
    }

    return this.items;
  }
}

module.exports = Shop;
