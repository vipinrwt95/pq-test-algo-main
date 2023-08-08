export type FormLinkProps = {
  centerId: number
}

export interface EditLinkFormProps {
  openForm?: boolean
  noLinks: boolean
  link_id: number
  title?: string
  link?: string
}

export interface LinkSettings {
  bgColor?: string
  textColor?: string
}
