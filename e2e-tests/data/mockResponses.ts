/**
 * Mock Responses Dictionary
 * 
 * Contains mock API responses for intercepting and testing error scenarios:
 * - Success responses
 * - Error responses (400, 401, 500, etc.)
 * - Empty/null responses
 * - Malformed payloads
 * 
 * Usage:
 *   const success_response = MOCK_RESPONSES.SEARCH_SUCCESS
 *   const error_response = MOCK_RESPONSES.GOOGLE_500_ERROR
 */

export interface MockResponse {
  status: number;
  headers?: Record<string, string>;
  body: any;
  description: string;
}

export const MOCK_RESPONSES: Record<string, MockResponse> = {
  // Search endpoint responses
  SEARCH_SUCCESS: {
    status: 200,
    headers: { 'Content-Type': 'application/json' },
    body: {
      success: true,
      results: [
        { id: 1, name: 'Business 1', location: 'San Francisco, CA' },
        { id: 2, name: 'Business 2', location: 'San Francisco, CA' },
      ],
      total_count: 2,
    },
    description: 'Successful search response',
  },

  SEARCH_EMPTY_RESULTS: {
    status: 200,
    headers: { 'Content-Type': 'application/json' },
    body: {
      success: true,
      results: [],
      total_count: 0,
    },
    description: 'Search with no results',
  },

  // Error responses
  BAD_REQUEST: {
    status: 400,
    headers: { 'Content-Type': 'application/json' },
    body: {
      success: false,
      error: 'Invalid request parameters',
      message: 'Missing required field: location',
    },
    description: 'Bad request error',
  },

  UNAUTHORIZED: {
    status: 401,
    headers: { 'Content-Type': 'application/json' },
    body: {
      success: false,
      error: 'Unauthorized',
      message: 'Invalid or expired authentication token',
    },
    description: 'Unauthorized access',
  },

  INSUFFICIENT_CREDITS: {
    status: 402,
    headers: { 'Content-Type': 'application/json' },
    body: {
      success: false,
      error: 'Insufficient Credits',
      message: 'You do not have enough credits to perform this search',
      credits_required: 50,
      credits_available: 10,
    },
    description: 'User has insufficient credits',
  },

  FORBIDDEN: {
    status: 403,
    headers: { 'Content-Type': 'application/json' },
    body: {
      success: false,
      error: 'Forbidden',
      message: 'You do not have permission to access this resource',
    },
    description: 'Access forbidden',
  },

  NOT_FOUND: {
    status: 404,
    headers: { 'Content-Type': 'application/json' },
    body: {
      success: false,
      error: 'Not Found',
      message: 'The requested resource was not found',
    },
    description: 'Resource not found',
  },

  INTERNAL_SERVER_ERROR: {
    status: 500,
    headers: { 'Content-Type': 'application/json' },
    body: {
      success: false,
      error: 'Internal Server Error',
      message: 'An unexpected error occurred',
    },
    description: 'Server error (500)',
  },

  GOOGLE_API_ERROR: {
    status: 500,
    headers: { 'Content-Type': 'application/json' },
    body: {
      success: false,
      error: 'External Service Error',
      message: 'Google Maps API failed: Invalid request',
    },
    description: 'External API (Google) error',
  },

  // Login responses
  LOGIN_SUCCESS: {
    status: 200,
    headers: { 'Content-Type': 'application/json' },
    body: {
      success: true,
      user: {
        id: 1,
        email: 'user@test.com',
        first_name: 'Test',
        last_name: 'User',
      },
      token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...',
      credits: 1000,
    },
    description: 'Successful login',
  },

  LOGIN_INVALID_CREDENTIALS: {
    status: 401,
    headers: { 'Content-Type': 'application/json' },
    body: {
      success: false,
      error: 'Invalid Credentials',
      message: 'Email or password is incorrect',
    },
    description: 'Login with invalid credentials',
  },

  // Malformed responses
  MALFORMED_JSON: {
    status: 200,
    headers: { 'Content-Type': 'application/json' },
    body: 'This is not valid JSON{[}',
    description: 'Malformed JSON response',
  },

  NULL_RESPONSE: {
    status: 200,
    headers: { 'Content-Type': 'application/json' },
    body: null,
    description: 'Null response body',
  },
};

/**
 * Get mock response by key
 */
export const get_mock_response = (key: string): MockResponse | undefined => {
  return MOCK_RESPONSES[key];
};

/**
 * Get all error responses
 */
export const get_all_error_responses = (): MockResponse[] => {
  return Object.values(MOCK_RESPONSES).filter(response => response.status >= 400);
};
