import { TextFieldVariants } from "@mui/material"
import { HTMLInputTypeAttribute } from "react"
import { ValidationInterface } from "../utils/Validator"

export interface TextInputInterface {
    id: string,
    isRequired: boolean,
    i18n: string,
    type: HTMLInputTypeAttribute,
    variant: TextFieldVariants,
    value: any,
    setValue: Function,
    validation?: ValidationInterface[],
    isValid?: Function,
    showError?: boolean,
    disabled?: boolean,
    sx?: object
}