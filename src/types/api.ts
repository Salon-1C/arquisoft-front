export interface ApiResponse<T> {
  data: T
  message?: string
}

export interface Paginated<T> {
  items: T[]
  total: number
}

export interface ApiError {
  status: number
  message: string
}