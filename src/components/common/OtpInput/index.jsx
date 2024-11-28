import React from 'react'
import { MuiOtpInput } from 'mui-one-time-password-input'

const OTPInput = ({onComplete, onChange}) => {
  const [otp, setOtp] = React.useState('')

  const handleChange = (newValue) => {
    setOtp(newValue)
    onChange(newValue);
  }

  return (
    <MuiOtpInput value={otp} length={4} onComplete={(val)=>onComplete(val)} onChange={handleChange} />
  )
}

export default OTPInput;