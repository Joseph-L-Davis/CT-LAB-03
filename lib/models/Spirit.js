const pool = require('../utils/pool');

class Spirit {
    id;
    name;
    region;
    abv;

    constructor(row) {
      this.id = row.id;
      this.name = row.name;
      this.region = row.region;
      this.abv = row.abv;
    }

    static async insert({ name, region, abv }) {
      const { rows } = await pool.query(
        `INSERT INTO spirits (name, region, abv)
           VALUES ($1, $2, $3)
           RETURNING *`,
        [name, region, abv] 
      );
      return new Spirit(rows[0]);
    }

    static async findById(id) {
      const { rows } = await pool.query(
        `SELECT * FROM spirits
            WHERE id = $1`,
        [id]
      );
      return new Spirit(rows[0]);
    }

    static async findAllItems() {
      const { rows } = await pool.query(
        'SELECT * FROM spirits'
      );
      return rows.map(spirit => new Spirit(spirit));
    }

    static async updateItem(id, { name, region, abv }) {
      const { rows } = await pool.query(
        `UPDATE spirits
            SET name = $1, region = $2, abv = $3
            WHERE id = $4
            RETURNING *`,
        [name, region, abv, id]
      );
      return new Spirit(rows[0]);
    }

    static async deleteItem(id) {
      const { rows } = await pool.query(
        `DELETE FROM spirits
            WHERE id = $1
            RETURNING *`,
        [id]
      );
      return new Spirit(rows[0]);
    }
}

module.exports = Spirit;
