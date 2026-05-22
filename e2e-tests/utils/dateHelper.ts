/**
 * Date Helper Utility
 * Handles date/time operations for test data and assertions
 * 
 * Usage:
 *   const formatted_date = DateHelper.format_date(new Date())
 *   const timestamp = DateHelper.get_current_timestamp()
 */

export class DateHelper {
  /**
   * Format date to YYYY-MM-DD string
   */
  static format_date(date: Date): string {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  }

  /**
   * Format date to YYYY-MM-DD HH:mm:ss string
   */
  static format_datetime(date: Date): string {
    const date_part = this.format_date(date);
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');
    const seconds = String(date.getSeconds()).padStart(2, '0');
    return `${date_part} ${hours}:${minutes}:${seconds}`;
  }

  /**
   * Get current date as YYYY-MM-DD string
   */
  static get_today_formatted(): string {
    return this.format_date(new Date());
  }

  /**
   * Get current timestamp in milliseconds
   */
  static get_current_timestamp(): number {
    return Date.now();
  }

  /**
   * Add days to a date
   */
  static add_days(date: Date, days: number): Date {
    const result = new Date(date);
    result.setDate(result.getDate() + days);
    return result;
  }

  /**
   * Calculate days difference between two dates
   */
  static days_between(date1: Date, date2: Date): number {
    const time_diff = Math.abs(date2.getTime() - date1.getTime());
    return Math.ceil(time_diff / (1000 * 60 * 60 * 24));
  }
}
