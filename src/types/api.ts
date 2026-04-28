export interface ApiResponse<T> {
  data: T
  message?: string
}

export interface Paginated<T> {
  items: T[]
  total: number
  limit: number
  offset: number
}

export interface ApiError {
  status: number
  message: string
}