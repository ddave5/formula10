import { ValidationInterface } from "../utils/Validator";

export interface PasswordInputInterface {
    password: string,
    setPassword: Function,
    label: string,
    validation?: ValidationInterface[],
    isValid?: Function
}