/* eslint-disable @typescript-eslint/no-explicit-any */
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import FormField from "./components/FormField";
import TextInput from "./components/FormInput/TextInput";
import { useForm } from "react-hook-form";
import Button from "@mui/material/Button";



function App() {

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

  const {
    control,
    handleSubmit,
    formState: { errors },
    getValues,
  } = useForm({
    resolver: yupResolver(formSchema),
    defaultValues: {
      email: '',
      password: ''
    }
  });
  console.log(errors);

  function onSubmit(formData: any) {
    console.log("huy", formData);
    // register(formData);

  }

  return (
    <div>
      <p className="mb-5 text-center">Login</p>
      <form onSubmit={handleSubmit(onSubmit)}>
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

          Sign in
        </Button>

      </form>

    </div>
  )
}

export default App
