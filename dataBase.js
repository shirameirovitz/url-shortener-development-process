const fs = require("fs").promises;
const shortid = require("shortid");

class Item {
  constructor(originalUrl) {
    this.originalUrl = originalUrl;
    this.shortUrl = shortid.generate();
    this.count = 0;
    this.date = new Date().toISOString().slice(0, 19).replace("T", " ");
  }
}

class DataBase {
  static items = [];

  static async readAllData() {
    const data = await fs.readFile(
      "./dataBase/dataBase.json",
      "utf8",
      (err) => {
        if (err) return;
      }
    );
    this.items = JSON.parse(data);
    return this.items;
  }
  static async addUrl(url) {
    const items = await this.readAllData();
    for (let item of items) {
      if (item.originalUrl === url) {
        return item.shortUrl;
      }
    }
    let newItem = new Item(url);
    this.items.push(newItem);
    fs.writeFile(
      "./dataBase/dataBase.json",
      JSON.stringify(this.items, null, 4)
    );
    return newItem.shortUrl;
  }
  static deleteUrl(originalUrl) {
    for (let i = 0; i < this.urls.length; i++) {
      if (this.urls[i].originalUrl === originalUrl) {
        this.urls.splice(i, 1);
      }
    }
  }

  static async findOriginalUrl(shortUrl) {
    const items = await this.readAllData();

    for (let item of items) {
      if (item.shortUrl === shortUrl) {
        item.count += 1;
        fs.writeFile(
          "./dataBase/dataBase.json",
          JSON.stringify(this.items, null, 4)
        );
        return item.originalUrl;
      }
    }
    return false;
  }
}

module.exports = DataBase;
