import { pool } from '../plugins/pg'

export default abstract class BaseRepository<T> {
  protected tableName: string

  constructor(tableName: string) {
    this.tableName = tableName
  }

  /**
   * Find a element by id
   * @param id
   * @returns A element or null
   */
  async findOne(id: string): Promise<T | null> {
    const element = await pool.query(`SELECT * FROM ${this.tableName} WHERE id = $1`, [id])

    return element.rowCount === 1 ? element.rows[0] : null
  }
}
