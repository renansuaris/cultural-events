export interface ApiValidationError {
  field: string;
  message: string;
}

export interface ApiResponseError {
  message: string;
  errors?: ApiValidationError[]; 
}