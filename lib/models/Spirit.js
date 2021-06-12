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
}

module.exports = Spirit;
