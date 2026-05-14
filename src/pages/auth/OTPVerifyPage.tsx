import FormField from '../../components/FormField'
import OTPInput from '../../components/FormInput/OTPVerifyPage'

const OTPVerifyPage = () => {
    return (
        <div>
            <p className='mb-5 text-center text-2xl font-bold'>
                Two-Step Verification
            </p>
            <form className='flex flex-col gap-4'>
                <FormField
                    name="otp"
                    label="Type your 6 digit security code"
                    control={control}
                    Component={OTPInput}
                />
            </form>
        </div>
    )
}

export default OTPVerifyPage