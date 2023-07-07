"use client"
import { BASE_URL } from '@/app/api/BaseAPI';
import { useState } from 'react';
import { useSelector } from 'react-redux';
import { useRouter } from "next/navigation"
import Link from 'next/link';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function  OtpVerification(){
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
          toast.success('verify successfully', {
            position: "top-center",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: false,
            draggable: true,
            progress: undefined,
            theme: "light",
            });
				router.push("/login")
      })
      .catch(error => console.log('error', error));
  };
  return (
    <div className="flex min-h-screen min-w-screen justify-center items-center">
        <div className="border-2 w-[40%] rounded-xl py-5">
            <div className='flex justify-center flex-col'>
                <h1 className='text-3xl text-center font-bold pb-5'>Verifivcation Code</h1>
                <h4 className="text-center">Please enter the verifivcation code sent to </h4>
                <p className='text-center pb-8'>{emailUser}</p>
                <div className="flex gap-2 my-5 justify-center pb-8">
                  {otp.map((digit, index) => (
                    <input
                      type="text"
                      name="otp"
                      className="border-2 border-black w-12 h-12 text-2xl rounded-xl text-center"
                      maxLength={1}
                      key={index}
                      value={digit}
                      onChange={(event) => handleChange(event, index)}
                      onKeyDown={(event) => handleKeyDown(event, index)}
                      onFocus={(event) => event.target.select()}
                    />
                  ))}
                </div>
                <p className='text-[#555] text-center '>Didn't receive on OPT?</p>
                <p className="text-center pb-8">
                  <Link href="#">Resent OPT?</Link>
    
                </p>
                <div className="flex justify-center my-5">
                  <button
                    onClick={submitOtp}
                    className="bg-[#333] px-10 py-4 text-white text-xl font-bold rounded-xl"
                  >
                    Verify
                  </button>
                  <ToastContainer
                  position="top-center"
                  autoClose={5000}
                  hideProgressBar={false}
                  newestOnTop={false}
                  closeOnClick
                  rtl={false}
                  pauseOnFocusLoss
                  draggable
                  pauseOnHover={false}
                  theme="light"
                 />
                </div>
              </div>
        </div>
    </div>
  );
};
OtpVerification.displayName = 'OtpVerification';
