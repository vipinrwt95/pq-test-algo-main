export interface Role {
  id: number
  name: string
}

export interface Media {
  dark_id: number
  light_id: number
}

export interface CenterAdmin {
  id: number
  name: string
  media: Media
}

export interface LoginResponse {
  id: number
  first_name: string
  last_name: string
  cell_phone?: string
  email: string
  username?: string
  is_active: boolean
  created_at: string
  role: Role
  company_admin?: string
  center_admin?: CenterAdmin
  centers: any[]
  companies: any[]
  authors: any[]
}

export interface User {
  first_name: string
  last_name: string
  email: string
  is_active: boolean
  role: Role
  is_authenticated?: boolean
}

export interface LoginRequest {
  username: string
  password: string
}

export interface LoginError {
  error: {
    type: string
    description: string
    fields: any[]
  }
}

export interface IsAuthenticatedError {
  error: {
    type: string
    description: string
    fields: []
  }
}

export interface PasswordChange {
  email: string
  code: string
  password: string
  confirmPassword: string
}
