import { TextFieldVariants } from "@mui/material"
import { HTMLInputTypeAttribute } from "react"

export interface TextInputInterface {
    id: string,
    isRequired: boolean,
    i18n: string,
    type: HTMLInputTypeAttribute,
    variant: TextFieldVariants,
    value: any,
    setValue: Function,
    error: boolean,
    errori18n: string
}
