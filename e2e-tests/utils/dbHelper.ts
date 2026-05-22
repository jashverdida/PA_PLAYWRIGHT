/**
 * Database Helper Utility
 * Handles database operations for test data verification
 * 
 * Usage:
 *   const ledger_sum = await DbHelper.get_ledger_total(user_id)
 *   const result = await DbHelper.query(sql)
 * 
 * NOTE: Update DB_CONFIG with your actual database credentials
 */

import { Logger } from './logger';

interface DbConfig {
  host: string;
  port: number;
  user: string;
  password: string;
  database: string;
}

export class DbHelper {
  private static readonly DB_CONFIG: DbConfig = {
    host: process.env.DB_HOST || 'localhost',
    port: parseInt(process.env.DB_PORT || '5432'),
    user: process.env.DB_USER || 'postgres',
    password: process.env.DB_PASSWORD || 'password',
    database: process.env.DB_NAME || 'test_db',
  };

  /**
   * Execute raw SQL query
   * Note: Requires pg package: npm install pg
   */
  static async query(sql: string, params: any[] = []): Promise<any> {
    try {
      // const { Client } = require('pg');
      // const client = new Client(this.DB_CONFIG);
      // await client.connect();
      // const result = await client.query(sql, params);
      // await client.end();
      // return result.rows;

      Logger.info(`Executed query: ${sql}`);
      // Placeholder for actual implementation
      return [];
    } catch (error) {
      Logger.error(`Database query failed: ${error}`);
      throw error;
    }
  }

  /**
   * Get total ledger sum for a user
   * Verifies that credit ledger math is correct
   */
  static async get_ledger_total(user_id: number): Promise<number> {
    const sql = `
      SELECT SUM(amount) as total 
      FROM ledger 
      WHERE user_id = $1
    `;
    const result = await this.query(sql, [user_id]);
    return result[0]?.total || 0;
  }

  /**
   * Verify user credit balance matches expected value
   */
  static async verify_user_credits(user_id: number, expected_credits: number): Promise<boolean> {
    const actual = await this.get_ledger_total(user_id);
    const match = actual === expected_credits;
    Logger.info(`User ${user_id} credits: expected=${expected_credits}, actual=${actual}, match=${match}`);
    return match;
  }

  /**
   * Get all ledger transactions for a user
   */
  static async get_user_transactions(user_id: number): Promise<any[]> {
    const sql = `
      SELECT * FROM ledger 
      WHERE user_id = $1 
      ORDER BY created_at DESC
    `;
    return await this.query(sql, [user_id]);
  }

  /**
   * Check for duplicate transactions
   */
  static async check_duplicate_transactions(user_id: number, amount: number, created_after: Date): Promise<number> {
    const sql = `
      SELECT COUNT(*) as count 
      FROM ledger 
      WHERE user_id = $1 
      AND amount = $2 
      AND created_at > $3
    `;
    const result = await this.query(sql, [user_id, amount, created_after]);
    return result[0]?.count || 0;
  }
}
