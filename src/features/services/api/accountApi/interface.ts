export interface GetAccountResponse {
  id: number
  first_name: string
  last_name: string
  cell_phone: string
  email: string
  username: string
  is_active: boolean
  created_at: string
  role: {
    id: number
    name: string
  }
  is_admin_in_company: boolean
  is_admin_in_center: boolean
  centers: unknown[]
  companies: unknown[]
  authors: unknown[]
}

export interface UpdateAccountReqPayload {
  first_name: string
  last_name: string
  username: string
  email: string
  cell_phone: string
}
