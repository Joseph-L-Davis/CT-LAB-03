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

    static async findById(id) {
      const { rows } = await pool.query(
        `SELECT * FROM entrees
            WHERE id = $1`,
        [id]
      );
      return new Entree(rows[0]);
    }

    static async findAllItems() {
      const { rows } = await pool.query(
        'SELECT * FROM entrees'
      );
      return rows.map(entree => new Entree(entree));
    }

    static async updateItem(id, { name, price, isGood }) {
      const { rows } = await pool.query(
        `UPDATE entrees
            SET name = $1, price = $2, is_good = $3
            WHERE id = $4
            RETURNING *`,
        [name, price, isGood, id]
      );
      return new Entree(rows[0]);
    }

    static async deleteItem(id) {
      const { rows } = await pool.query(
        `DELETE FROM entrees
            WHERE id = $1
            RETURNING *`,
        [id]
      );
      return new Entree(rows[0]);
    }
}

module.exports = Entree;
