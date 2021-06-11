const pool = require('../utils/pool');

class Headband {
    id;
    color;
    size;

    constructor(row) {
      this.id = row.id;
      this.color = row.color;
      this.size = row.size;
    }

    static async insert({ color, size }) {
      const { rows } = await pool.query(
        `INSERT INTO headbands (color, size)
            VALUES ($1, $2)
            RETURNING *`,
        [color, size]
      );
      return new Headband(rows[0]);
    }
}

module.exports = Headband;
