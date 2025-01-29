export const DEFAULT_PAGE = 1;
export const DEFAULT_PER_PAGE = 12;
export const DEFAULT_ORDER_DIRECTION = 'ASC';
export const DEFAULT_ORDER_OPERATOR = 'OR';
export const DEFAULT_QUERY_TYPE = 'ILIKE';

export const PAGE_SIZE_STEP = DEFAULT_PER_PAGE;

export const PAGE_SIZES = [
  DEFAULT_PER_PAGE,
  DEFAULT_PER_PAGE + PAGE_SIZE_STEP,
  DEFAULT_PER_PAGE + PAGE_SIZE_STEP * 2,
  DEFAULT_PER_PAGE + PAGE_SIZE_STEP * 3,
];

export const TOKEN_TYPE = 'Bearer';
export const REFRESH_TOKEN_PATH = 'auth/refresh';
export const REQUEST_TIMEOUT = 60000;
export const CHECK_DEVICE_INTERVAL = 15000;
export const MAX_FAILED_REQUEST = 3;
export const PRESENTATION_MODE = 'presentation-mode';

export const API_URL = import.meta.env.VITE_API_URL;
