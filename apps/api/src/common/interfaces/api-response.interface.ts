export interface MetaResponse {
  requestId: string;
  executionTime: string;
  timestamp: string;
  [key: string]: any; // Mở rộng thêm cho pagination như page, limit, total nếu có
}

export interface ApiSuccessResponse<T> {
  ok: true;
  code: string;
  message: string;
  data: T;
  meta: MetaResponse;
}
