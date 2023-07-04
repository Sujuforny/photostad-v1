"use client"
import { BASE_URL } from '@/app/api/BaseAPI';
import { useState } from 'react';
import { useSelector } from 'react-redux';
import { useRouter } from "next/navigation"


const OtpVerification = () => {
	const router = useRouter()
  const [otp, setOtp] = useState(new Array(6).fill(''));
  const emailUser= useSelector((store) => store?.users?.emailUsers)
  const handleChange = (event, index) => {
    const { value } = event.target;

    if (isNaN(value)) return;

    const updatedOtp = [...otp];
    updatedOtp[index] = value;

    setOtp(updatedOtp);

    if (index < otp.length - 1 && value === '') {
      const prevInput = event.target.previousSibling;
      if (prevInput) {
        prevInput.focus();
      }
    } else if (index < otp.length - 1 && value !== '') {
      const nextInput = event.target.nextSibling;
      if (nextInput) {
        nextInput.focus();
      }
    }
  };

  const handleKeyDown = (event, index) => {
    if (event.key === 'Backspace' && otp[index] === '') {
      const prevInput = event.target.previousSibling;
      if (prevInput) {
        prevInput.focus();
      }
    }
  };

  const submitOtp = () => {
    const enteredOtp = otp.join('');

    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    var raw = JSON.stringify({
      "email": emailUser,
      "verifiedCode": enteredOtp
    });

    var requestOptions = {
      method: 'POST',
      headers: myHeaders,
      body: raw,
      redirect: 'follow'
    };

    fetch(BASE_URL+"auth/check-verify", requestOptions)
      .then(response => response.text())
      .then(result => {
        alert(result)
				router.push("/login")
      })
      .catch(error => console.log('error', error));
  };

  return (
    <div className="flex min-h-screen min-w-screen justify-center items-center">
      <div className="border-2 w-[40%] rounded-xl py-5">
        <h1 className="text-2xl text-center font-bold ">OTP Verification</h1>
        <div className="flex gap-2 my-5 justify-center">
          {otp.map((digit, index) => (
            <input
              type="text"
              name="otp"
              className="border-2 border-blue-600 w-12 h-12 text-2xl rounded-xl text-center"
              maxLength={1}
              key={index}
              value={digit}
              onChange={(event) => handleChange(event, index)}
              onKeyDown={(event) => handleKeyDown(event, index)}
              onFocus={(event) => event.target.select()}
            />
          ))}
        </div>
        <div className="flex justify-center my-5">
          <button
            onClick={submitOtp}
            className="bg-blue-600 px-10 py-4 text-white text-xl font-bold rounded-xl"
          >
            Verify
          </button>
        </div>
      </div>
    </div>
  );
};

export default OtpVerification;
