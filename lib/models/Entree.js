const pool = require('../utils/pool');

class Entree {
    id;
    name;
    price;
    isGood;

    constructor(row) {
      this.id = row.id;
      this.name = row.name;
      this.price = row.price;
      this.isGood = row.is_good;
    }

    static async insert({ name, price, isGood }) {
      const { rows } = await pool.query(
        `INSERT INTO entrees (name, price, is_good)
            VALUES ($1, $2, $3)
            RETURNING *`,
        [name, price, isGood]
      );
      return new Entree(rows[0]);
    }
}

module.exports = Entree;
