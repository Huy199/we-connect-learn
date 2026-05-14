import { MuiOtpInput } from "mui-one-time-password-input";

type OTPInputProps = {
    value: string;
    onChange: (value: string) => void;
}

const OTPInput = ({ value, onChange }: OTPInputProps) => {
    return <MuiOtpInput length={6} value={value} onChange={onChange} />;
};
export default OTPInput;
