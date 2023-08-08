export interface GetLinksResponse {
  count: number
  settings: Settings
  items: LinkItems[]
}

export interface Settings {
  bg_color?: string
  text_color?: string
}

export interface LinkItems {
  id: number
  title: string
  link: string
  ordering: number
  created_at: string
}

export interface CreateLinkRequest {
  center_id: number
  title: string
  link: string
}

export interface CreateLinkResponse {
  id: number
  center_id: number
  title: string
  link: string
  ordering: number
  create_at: string
}

export interface DeleteLinkRequest {
  link_id?: number
  center_id?: number
}

export interface UpdateLinkRequest {
  link_id: number
  center_id: number
  title: string
  link: string
}

export interface UpdateLinkSettingsRequest extends Settings {
  center_id?: number
}

export type GetLinkSettingsRequest = {
  center_id: number
}

export interface GetLinkSettingsResponse {
  center_id: number
  bg_color: string
  text_color: string
}

export interface UpdateLinksOrderItem {
  id?: number
  ordering?: number
}

export interface UpdateItem {
  id: number
  ordering: number
}

export interface UpdateLinkOrderRequest {
  center_id: number
  items?: UpdateItem[]
}
