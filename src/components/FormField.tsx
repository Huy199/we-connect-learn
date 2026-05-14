import React from 'react'
import { Controller, type FieldError } from 'react-hook-form';

type FormFieldProps = {
    label: string;
    name: string;
    control: any;
    placeholder?: string;
    error?: FieldError;
    Component: React.ComponentType<any>;
    type?: string;
}

const FormField = ({ label, name, control, placeholder, error, type, Component }: FormFieldProps) => {
    return (
        <div>
            <label htmlFor={name}>{label}</label>
            <Controller
                name={name}
                control={control}
                render={({ field: { onChange, value, name } }) => (
                    <Component
                        placeholder={placeholder}
                        onChange={onChange}
                        value={value}
                        name={name}
                        control={control}
                        error={error?.message}
                        type={type}
                    />
                )}
            />
            {error?.message && (
                <p className="text-red-500 text-sm">{error.message}</p>
            )}
        </div>
    )
}

export default FormField;
