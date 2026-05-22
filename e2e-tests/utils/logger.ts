/**
 * Logger Utility
 * Provides consistent logging with color coding for better readability
 * 
 * Usage:
 *   Logger.info('Message')
 *   Logger.success('Operation completed')
 *   Logger.warning('Something might be wrong')
 *   Logger.error('Critical issue')
 *   Logger.step(1, 'First step')
 */

export class Logger {
  private static readonly COLORS = {
    RESET: '\x1b[0m',
    BRIGHT_BLUE: '\x1b[94m',
    BRIGHT_GREEN: '\x1b[92m',
    BRIGHT_YELLOW: '\x1b[93m',
    BRIGHT_RED: '\x1b[91m',
  };

  /**
   * Log informational message
   */
  static info(message: string) {
    console.log(`${this.COLORS.BRIGHT_BLUE}[INFO]${this.COLORS.RESET} ${message}`);
  }

  /**
   * Log success message
   */
  static success(message: string) {
    console.log(`${this.COLORS.BRIGHT_GREEN}[SUCCESS]${this.COLORS.RESET} ${message}`);
  }

  /**
   * Log warning message
   */
  static warning(message: string) {
    console.log(`${this.COLORS.BRIGHT_YELLOW}[WARNING]${this.COLORS.RESET} ${message}`);
  }

  /**
   * Log error message
   */
  static error(message: string) {
    console.log(`${this.COLORS.BRIGHT_RED}[ERROR]${this.COLORS.RESET} ${message}`);
  }

  /**
   * Log step in test execution
   */
  static step(step_number: number, description: string) {
    console.log(`${this.COLORS.BRIGHT_BLUE}[STEP ${step_number}]${this.COLORS.RESET} ${description}`);
  }
}
