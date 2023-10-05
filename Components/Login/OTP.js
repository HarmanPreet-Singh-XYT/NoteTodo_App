import React,{useContext, useLayoutEffect} from 'react'
import { ShowCard_Cont } from '@/Helpers/ShowCard'
import { Login_cont } from '@/Helpers/Login-Cont'
import { Account_cont } from '@/Helpers/Account-Info';
import axios from 'axios';
const OTP = () => {
	const url='http://localhost:3020/logindata'
  const {setShowLogin} = useContext(ShowCard_Cont);
  const {login,setLogin} = useContext(Login_cont);
  const {AccountInfo, setAccountInfo, Error, setError,Exist, setExist} = useContext(Account_cont);
  useLayoutEffect(() => {
	setError(false);
	setExist(false);
  }, [])
  async function check(e){
	e.preventDefault();
	setError(false);
	setExist(false);
	const data = {
		email: e.target[0].value,
	};
	await axios.post(`${url}/login/send_otp`,data)
	.then((res)=>{
		switch (res.data.message) {
			case "failed":
				setError(true);
				break;
			case "sent":
				setLogin("sent");
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
    <form onSubmit={(e)=>check(e)} method='post' action='/login/log' className="login100-form validate-form">
					<span className="login100-form-logo logo-login">
						<img src='https://i.pinimg.com/1200x/4d/00/8b/4d008b130bfc3d54968c88e9cf93c53b.jpg' alt='logo'/>
					</span>
					{Error && <h3 className='login-error'>Server Error,Please Try Again Lator</h3>}
					{Exist && <h3 className='login-error'>Incorrect Email,Please Check Email</h3>}
					<span className="login100-form-title p-b-34 p-t-27">
						Log In with OTP
					</span>

					<div className="wrap-input100 validate-input" data-validate = "Enter Email">
						<input required className="input100" type="email" name="username" placeholder="Email"/>
						<span className="focus-input100" data-placeholder="&#xf207;"></span>
					</div>

					<div className="container-login100-form-btn">
						<button type='button' onClick={()=>setLogin("login")} className="login100-form-btn">
							Back
						</button>
						<button className="login100-form-btn">
							Send OTP
						</button>
					</div>
            </form>
    </>
  )
}

export default OTP;