/**
 * @paymentflow/shared-types — API response types
 *
 * Standard envelope shapes for REST API responses, aligned with RFC 7807.
 */

export interface ApiSuccess<T> {
  data: T;
  meta?: Record<string, unknown>;
}

export interface PaginatedResponse<T> {
  data: T[];
  meta: {
    page: number;
    pageSize: number;
    totalCount: number;
    totalPages: number;
  };
}

/**
 * RFC 7807 Problem Details response.
 * Used for all 4xx/5xx error responses.
 */
export interface ApiError {
  type: string;
  title: string;
  status: number;
  detail?: string;
  instance?: string;
  errors?: Array<{
    field: string;
    message: string;
    code: string;
  }>;
}
