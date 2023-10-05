import React,{useContext, useLayoutEffect} from 'react'
import { ShowCard_Cont } from '@/Helpers/ShowCard'
import { Login_cont } from '@/Helpers/Login-Cont'
import { Account_cont } from '@/Helpers/Account-Info';
import axios from 'axios';
const OTP_Sent = () => {
	const url=`${process.env.NEXT_PUBLIC_SERVER_URL}/logindata`
	const {showLoading,setShowLoading,setShowLogin} = useContext(ShowCard_Cont);
  const {login,setLogin} = useContext(Login_cont);
  const {AccountInfo, setAccountInfo, Error, setError,Exist, setExist} = useContext(Account_cont);
  useLayoutEffect(() => {
	setError(false);
	setExist(false);
  }, [])
  async function check(e){
	e.preventDefault();
	setShowLoading(true);
	setError(false);
	setExist(false);
	const data = {
		code: e.target[0].value,
	};
	await axios.post(`${url}/login/otp`,data)
	.then((res)=>{
		switch (res.data.message) {
			case "failed":
				setError(true);
				break;
			case "Success":
				setShowLoading(false);
				setShowLogin(false);
                setAccountInfo(res.data.user_info);
				break;
			case "incorrect":
				setExist(true);
				break;
			default:
				break;
		}
	})
	.catch((err)=>{
		console.log(err)
	})
  }
  return (
    <>
	{showLoading && <div className='loading'>
	<div class="blobs">
		<div class="blob-center"></div>
		<div class="blob"></div>
		<div class="blob"></div>
		<div class="blob"></div>
		<div class="blob"></div>
		<div class="blob"></div>
		<div class="blob"></div>
	</div>
	<svg xmlns="http://www.w3.org/2000/svg" version="1.1">
	<defs>
		<filter id="goo">
		<feGaussianBlur in="SourceGraphic" stdDeviation="10" result="blur" />
		<feColorMatrix in="blur" mode="matrix" values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 18 -7" result="goo" />
		<feBlend in="SourceGraphic" in2="goo" />
		</filter>
	</defs>
	</svg>
		</div>}
    {!showLoading && <form onSubmit={(e)=>check(e)} method='post' action='/login/log' className="login100-form validate-form">
					<span className="login100-form-logo logo-login">
						<img src='https://i.pinimg.com/1200x/4d/00/8b/4d008b130bfc3d54968c88e9cf93c53b.jpg' alt='logo'/>
					</span>
					{Error && <h3 className='login-error'>OTP Expired,Please Login Again</h3>}
					{Exist && <h3 className='login-error'>Incorrect OTP,Please Check OTP</h3>}
					<span className="login100-form-title p-b-34 p-t-27">
						Log In with OTP
					</span>

					<div className="wrap-input100 validate-input" data-validate="Enter OTP Code">
						<input required className="input100" type="password" name="pass" placeholder="OTP Code"/>
						<span className="focus-input100" data-placeholder="&#xf191;"></span>
					</div>

					<div className="contact100-form-checkbox">
						<input className="in-cbk" id="ckb1" type="checkbox" name="remember-me"/>
						<label className="la-cbk">
							Remember me
						</label>
					</div>

					<div className="container-login100-form-btn">
						<button type='button' onClick={()=>setLogin("otp")} className="login100-form-btn">
							Back
						</button>
						<button className="login100-form-btn">
							Confirm
						</button>
					</div>
            </form>}
    </>
  )
}

export default OTP_Sent;