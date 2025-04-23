import type { TextFieldVariants } from "@mui/material"
import type { Dispatch, HTMLInputTypeAttribute, ReactElement, SetStateAction } from "react"
import type { ValidationInterface } from "../utils/Validator"

export interface TextInputInterface {
    id: string,
    isRequired: boolean,
    i18n: string,
    type: HTMLInputTypeAttribute,
    variant: TextFieldVariants,
    value: string | ReactElement,
    setValue: Dispatch<SetStateAction<string>>,
    validation?: ValidationInterface[],
    isValid?: Dispatch<SetStateAction<any>>,
    showError?: boolean,
    disabled?: boolean,
    sx?: object
}