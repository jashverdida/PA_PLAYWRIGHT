/**
 * Math Helper Utility
 * Handles mathematical operations and calculations for test data
 * 
 * Usage (e.g., for the 48,000% fix mentioned):
 *   const percentage = MathHelper.calculate_percentage(300, 1)
 *   const rounded = MathHelper.round_to_decimal(123.456, 2)
 */

export class MathHelper {
  /**
   * Calculate percentage: (part / total) * 100
   */
  static calculate_percentage(part: number, total: number): number {
    if (total === 0) return 0;
    return (part / total) * 100;
  }

  /**
   * Round number to specified decimal places
   */
  static round_to_decimal(value: number, decimal_places: number): number {
    const multiplier = Math.pow(10, decimal_places);
    return Math.round(value * multiplier) / multiplier;
  }

  /**
   * Calculate deduction: baseline - actual
   * For "zero-baseline logic" mentioned in requirements
   */
  static calculate_deduction(baseline: number, actual: number): number {
    return Math.max(0, baseline - actual);
  }

  /**
   * Calculate percentage change
   */
  static calculate_percentage_change(old_value: number, new_value: number): number {
    if (old_value === 0) return 0;
    return ((new_value - old_value) / old_value) * 100;
  }

  /**
   * Sum array of numbers
   */
  static sum_array(numbers: number[]): number {
    return numbers.reduce((acc, val) => acc + val, 0);
  }

  /**
   * Calculate average of array
   */
  static calculate_average(numbers: number[]): number {
    if (numbers.length === 0) return 0;
    return this.sum_array(numbers) / numbers.length;
  }

  /**
   * Check if value is within range (inclusive)
   */
  static is_within_range(value: number, min: number, max: number): boolean {
    return value >= min && value <= max;
  }
}
