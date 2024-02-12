import { object, string } from "yup"

export const environment = object()
  .shape({
    baseUrl: string().required(),
  })
  .validateSync({
    baseUrl: process.env.NEXT_PUBLIC_BASE_URL,
  })
