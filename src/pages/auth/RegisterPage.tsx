/* eslint-disable @typescript-eslint/no-explicit-any */
import { useForm } from "react-hook-form";
import Button from "@mui/material/Button";
import FormField from "../../components/FormField";
import TextInput from "../../components/FormInput/TextInput";
import { useRegisterMutation } from "../../services/rootAPI";
import Alert from "@mui/material/Alert";
import { Link, useNavigate } from "react-router";
import { useDispatch } from "react-redux";
import { openSnackbar } from "../../redux/slices/snackbarSlice";
import { useEffect } from "react";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup/dist/yup.js";

function RegisterPage() {

    const navigate = useNavigate();
    const [register, { data, isLoading, isSuccess, isError, error }] = useRegisterMutation();
    const dispatch = useDispatch();

    const formSchema = yup.object().shape({
        fullName: yup.string().required('Full name is required'),
        email: yup.string().email().required(),
        password: yup.string().min(6).required()
    });

    const { control, handleSubmit, formState: { errors } } = useForm({
        resolver: yupResolver(formSchema),
        defaultValues: {
            fullName: '',
            email: '',
            password: ''
        }
    });

    function onSubmit(formData: any) {
        console.log("huy", formData);
        register(formData);
    }

    useEffect(() => {
        if (isSuccess) {
            dispatch(openSnackbar({
                type: "success",
                message: data?.message || "Register successfully"
            }))
            navigate("/login")
        }

    }, [isSuccess, data?.message, dispatch, navigate])




    return (
        <div>
            <p className="mb-5 text-center text-2xl font-bold">Register</p>
            <form className="flex flex-col gap-4" onSubmit={handleSubmit(onSubmit)}>
                <FormField
                    label="FullName"
                    name="fullName"
                    control={control}
                    placeholder="Enter your fullName"
                    error={errors["fullName"]}
                    Component={TextInput} />
                <FormField
                    label="Email"
                    name="email"
                    control={control}
                    placeholder="Enter your email"
                    error={errors["email"]}
                    Component={TextInput} />
                <FormField
                    label="Password"
                    name="password"
                    control={control}
                    placeholder="Enter your password"
                    type="password"
                    error={errors["password"]}
                    Component={TextInput} />

                <Button variant="contained" type="submit">
                    Sign up
                </Button>
                {isError && <Alert security="error" >{error?.data?.message}</Alert>}
            </form>
            <p className="mt-4">
                Already have an account? <Link to="/login" className="text-blue-500">Sign in instead</Link>
            </p>
        </div>
    )
}

export default RegisterPage
