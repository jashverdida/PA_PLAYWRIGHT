/**
 * Test Users Data Dictionary
 * 
 * Contains all user profiles for testing different scenarios:
 * - Admin user with full access
 * - Standard user with limited credits
 * - User with zero credits (for credit depletion tests)
 * - Invalid user for negative testing
 * 
 * Usage:
 *   const admin_user = TEST_USERS.ADMIN_USER
 *   const low_credit_user = TEST_USERS.LOW_CREDIT_USER
 */

export interface TestUser {
  id: number;
  email: string;
  password: string;
  first_name: string;
  last_name: string;
  role: 'admin' | 'user';
  initial_credits: number;
  description: string;
}

export const TEST_USERS: Record<string, TestUser> = {
  ADMIN_USER: {
    id: 1,
    email: 'jashmineverdida9@gmail.com',
    password: 'Jashmine#9',
    first_name: 'Jashmine',
    last_name: 'Verdida',
    role: 'admin',
    initial_credits: 10000,
    description: 'Admin user with full access and high credits',
  },

  STANDARD_USER: {
    id: 2,
    email: 'standard.user@test.com',
    password: 'StandardPass#123',
    first_name: 'Standard',
    last_name: 'User',
    role: 'user',
    initial_credits: 1000,
    description: 'Standard user with moderate credits',
  },

  LOW_CREDIT_USER: {
    id: 3,
    email: 'low.credit@test.com',
    password: 'LowCredit#123',
    first_name: 'Low',
    last_name: 'Credit',
    role: 'user',
    initial_credits: 10,
    description: 'User with very low credits for edge case testing',
  },

  ZERO_CREDIT_USER: {
    id: 4,
    email: 'zero.credit@test.com',
    password: 'ZeroCredit#123',
    first_name: 'Zero',
    last_name: 'Credit',
    role: 'user',
    initial_credits: 0,
    description: 'User with zero credits for credit depletion testing',
  },

  INVALID_USER: {
    id: 999,
    email: 'invalid@test.com',
    password: 'WrongPassword#123',
    first_name: 'Invalid',
    last_name: 'User',
    role: 'user',
    initial_credits: 0,
    description: 'User with wrong credentials for negative testing',
  },
};

/**
 * Get default test user for general tests
 */
export const get_default_user = (): TestUser => TEST_USERS.ADMIN_USER;

/**
 * Get user by email
 */
export const get_user_by_email = (email: string): TestUser | undefined => {
  return Object.values(TEST_USERS).find(user => user.email === email);
};
