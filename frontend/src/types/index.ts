export type UserRole = 'admin' | 'user';

// --- ENTITIES (Refletem o banco de dados/retorno da API) ---

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
}

export interface Category {
  id: string;
  name: string;
}

export interface Event {
  id: string;
  title: string;
  date: string; 
  location: string;
  description: string;
  userId: string;
  categoryId: string;
  category?: Category; 
  user?: User;         
}

export interface LoginDTO {
  email: string;
  password: string;
}

export interface RegisterDTO {
  name: string;
  email: string;
  password: string;
}

export interface CreateEventDTO {
  title: string;
  date: string;
  location: string;
  description: string;
  categoryId: string;
}

export interface UpdateEventDTO extends Partial<CreateEventDTO> {}

export interface UpdateProfileDTO {
  name: string;
  email: string;
  password?: string;
}

export interface PaginatedResponse<T> {
  data: T[];
  total: number;
  page: number;
  lastPage: number;
}

export interface ApiErrorResponse {
  message: string;
  errors?: { field: string; message: string }[];
}