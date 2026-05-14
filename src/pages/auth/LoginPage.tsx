/* eslint-disable @typescript-eslint/no-explicit-any */
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import Button from "@mui/material/Button";
import FormField from "../../components/FormField";
import TextInput from "../../components/FormInput/TextInput";
import { Link, useNavigate } from "react-router";
import { useDispatch } from "react-redux";
import * as yup from "yup";
import { useLoginMutation } from "../../services/rootAPI";
import { useEffect } from "react";
import { openSnackbar } from "../../redux/slices/snackbarSlice";
import { CircularProgress } from "@mui/material";

function LoginPage() {

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [login, data = {}, isLoading, error, isError, isSuccess] = useLoginMutation();

    const formSchema = yup.object().shape({
        email: yup
            .string()
            .matches(
                /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                "Email is not valid",
            )
            .required(),
        password: yup.string().required(),
    });

    const { control, handleSubmit, formState: { errors } } = useForm({
        resolver: yupResolver(formSchema),
        defaultValues: {
            email: '',
            password: ''
        }
    })

    function onSubmit(formData: any) {
        console.log("huy", formData);
        login(formData);

    }

    useEffect(() => {
        if (isError) {
            dispatch(openSnackbar({
                type: "error",
                message: data?.message || "Login failed"
            }))
            navigate("/login")
        }
        if (isSuccess) {
            dispatch(openSnackbar({
                type: "success",
                message: data?.message || "Login successfully"
            }))
            navigate("/verify-otp")
        }

    }, [isError, isSuccess, data?.message, dispatch, navigate])

    return (
        <div>
            <p className="mb-5 text-center text-2xl font-bold">Login</p>
            <form className="flex flex-col gap-4" onSubmit={handleSubmit(onSubmit)}>
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

                    error={errors["password"]}
                    Component={TextInput} />

                <Button variant="contained" type="submit">
                    {isLoading && <CircularProgress size={20} color="inherit" className="mr-2" />}
                    Sign in
                </Button>
            </form>
            <p className="mt-4">
                New on our platform ? <Link to="/register" className="text-blue-500">Create an account</Link>
            </p>

        </div>
    )
}

export default LoginPage
