/**
 * Search Test Data Dictionary
 * 
 * Contains all search parameters for different test scenarios:
 * - Valid search parameters
 * - Edge cases (empty, special characters)
 * - Invalid parameters for negative testing
 * 
 * Usage:
 *   const valid_search = SEARCH_DATA.VALID_SEARCH
 *   const edge_case = SEARCH_DATA.EMPTY_CATEGORY
 */

export interface SearchParameters {
  category: string;
  location: string;
  search_limit?: number;
  distance_coverage?: number;
  description: string;
}

export const SEARCH_DATA: Record<string, SearchParameters> = {
  VALID_SEARCH: {
    category: 'Coffee Shops',
    location: 'San Francisco, CA',
    search_limit: 50,
    distance_coverage: 5,
    description: 'Valid search with all parameters',
  },

  POPULAR_CATEGORY_SEARCH: {
    category: 'Restaurants',
    location: 'New York, NY',
    search_limit: 100,
    distance_coverage: 10,
    description: 'Search for popular category',
  },

  SINGLE_LOCATION_SEARCH: {
    category: 'Hospitals',
    location: '10001', // ZIP code
    search_limit: 25,
    distance_coverage: 3,
    description: 'Search using ZIP code',
  },

  EXTENDED_CRITERIA_SEARCH: {
    category: 'Dental Clinics',
    location: 'Austin, TX',
    search_limit: 200,
    distance_coverage: 15,
    description: 'Search with extended search radius',
  },

  MINIMAL_SEARCH: {
    category: 'Banks',
    location: 'Chicago, IL',
    description: 'Search with minimum parameters',
  },

  EMPTY_CATEGORY: {
    category: '',
    location: 'Los Angeles, CA',
    description: 'Search with empty category (should fail)',
  },

  EMPTY_LOCATION: {
    category: 'Pharmacies',
    location: '',
    description: 'Search with empty location (should fail)',
  },

  SPECIAL_CHARACTERS_CATEGORY: {
    category: 'Coffee & Tea <Shops>',
    location: 'Miami, FL',
    description: 'Search with special characters',
  },

  VERY_LARGE_SEARCH_LIMIT: {
    category: 'Gyms',
    location: 'Seattle, WA',
    search_limit: 10000,
    distance_coverage: 50,
    description: 'Search with maximum limit (edge case)',
  },

  ZERO_SEARCH_LIMIT: {
    category: 'Gyms',
    location: 'Seattle, WA',
    search_limit: 0,
    description: 'Search with zero limit (should fail)',
  },

  NEGATIVE_DISTANCE: {
    category: 'Parks',
    location: 'Boston, MA',
    distance_coverage: -5,
    description: 'Search with negative distance (should fail)',
  },
};

/**
 * Get valid search parameters
 */
export const get_valid_search = (): SearchParameters => SEARCH_DATA.VALID_SEARCH;

/**
 * Get search by category name
 */
export const get_search_by_category = (category: string): SearchParameters | undefined => {
  return Object.values(SEARCH_DATA).find(search => search.category === category);
};
