export type Admin = {
  id: number
  first_name: string
  last_name: string
  cell_phone?: string
  email: string
  password?: string
}

export type ContactPerson = {
  name: string
  email: string
  cell_phone: string
}

export type CompanyItem = {
  id: number
  name: string
  address: string
  metadata?: {
    phone?: string
  }
  created_at: string
  media?: {
    id: number
    url: string
  }
  admin?: Admin
  centers_count: number
}

export interface GetCompaniesResponse {
  count: number
  items: CompanyItem[]
}

export interface GetCompaniesRequest {
  search?: string
  limit?: number
  page?: number
}

export interface CreateCompanyRequest {
  id: number
  name: string
  media_id: number | null
  address: string
  metadata?: {
    phone?: string
  }
}

export interface FilteredCompaniesData extends CompanyItem {
  actions: JSX.Element
}
