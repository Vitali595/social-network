import React from "react";
import styles from "./FormsControls.module.css";
import {Field} from "redux-form";

const FormControl: React.FC<any> = ({meta: {touched, error}, children}) => {

    const hasError = touched && error

    return (
        <div className={styles.formControl + " " + (hasError ? styles.error : "")}>
            <div>
                {children}
            </div>
            {hasError && <span>{error}</span>}
        </div>
    )
}

export const Textarea: React.FC<any> = (props) => {
    const {input, meta, child, ...restProps} = props
    return <FormControl {...props}><textarea {...input} {...restProps}/></FormControl>
}

export const Input: React.FC<any> = (props) => {
    const {input, meta, child, ...restProps} = props
    return <FormControl {...props}><input {...input} {...restProps}/></FormControl>
}

export const createField =
    (placeholder: string | null, name: string, component: any, validators: any, props: any = {}, text: string = "") => (
        <div>
            <Field placeholder={placeholder} name={name} component={component}
                   validate={validators} {...props}/> {text}
        </div>
    )