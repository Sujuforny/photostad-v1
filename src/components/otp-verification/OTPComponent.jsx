"use client"
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useRouter } from "next/navigation"
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useCheckVerifyMutation, useVerifyMutation } from '@/store/features/auth/authApiSlice';
import { selectEmail, selectIsFromForgetPw, setIsFormForgetPw } from '@/store/features/anonymous/anonymousSlice';

export default function  OtpVerification(){
	const router = useRouter()
  const dispatch = useDispatch()
  const [verify, { isLoading }] = useVerifyMutation();
  const [otp, setOtp] = useState(new Array(6).fill(''));
  const email= useSelector(selectEmail)
  const isOtpEmpty = otp.some((digit) => digit === '');
  const [isResent ,setIsResent] =useState(false)
  const store = useSelector((state)=>state)
  console.log("data in opt",store)
  const isFromForgetPw =  useSelector(selectIsFromForgetPw)
  console.log(isFromForgetPw,"0000000:hehehe");
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
  const [checkVerify,{IsLoading}]= useCheckVerifyMutation()
  const submitOtp = async() => {
    const verifiedCode = otp.join('');
    console.log(verifiedCode);
    try{
      console.log(email,"email user here");
      const data = await checkVerify({email, verifiedCode}).unwrap();
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
        if(isFromForgetPw){
          router.push("/sendemail")
          dispatch(setIsFormForgetPw(false));
          return;
        }
          router.push("/login")
    }catch(e){
        console.log("error: " + e);
    }
  }
  const resent =async ()=> {
    setIsResent(true)
    try{
      console.log("emailUser",emailUser);
      const data = await verify(emailUser).unwrap()
      console.log("data email verify",data)
      toast.info('Please check your Email', {
        position: "top-center",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: true,
        progress: undefined,
        theme: "light",
        });
      setTimeout(() => {
      setIsResent(false)

        console.log("hello");
      }, 3000);
    }catch(error){
      toast.error('Resend failed !', {
        position: "top-center",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: true,
        progress: undefined,
        theme: "light",
        });
      setTimeout(() => {
          setIsResent(false)
          }, 3000);
      console.log("error", error)
    }
  } 
  return (
    <div className="flex min-h-screen min-w-screen justify-center items-center">
        <div className="border-2 w-[40%] rounded-xl py-5">
            <div className='flex justify-center flex-col'>
                <h1 className='dark:text-[#ffffff] text-3xl text-center font-bold pb-5'>Verification Code</h1>
                <h4 className="dark:text-[#ffffff] text-center">Please enter the verification code sent to </h4>
                <p className='text-center pb-8'>{email? email : "unknown@gmail.com"}</p>
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
                <p className='text-[#555] text-center dark:text-[#bbbaba] pb-[5px]'>Did not receive on OPT?</p>
                <p className="text-center pb-8">
                  <button onClick={resent} className="dark:text-[#ffffff]" 
                     disabled={isResent}
                  >
                    Resent OPT?
                    </button>
    
                </p>
                <div className="flex justify-center my-5">
                  <button
                    onClick={submitOtp}
                    className="bg-[#333] cursor-pointer hover:bg-[#555] px-10 py-4 text-white text-xl font-bold rounded-xl"
                    disabled={isOtpEmpty}
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
