import React, {useState} from 'react'
import axios from 'axios'
import { toast} from 'react-toastify';




const SignIn = ({history}) => {
    const [email, setEmail] = useState('1655yusuf@gmail.com');
  const [password, setPassword] = useState('123456!Qq11');

    

    

    const handleChange = (inputName) => (e) =>{
        
          if (inputName === 'email') {
            setEmail(e.target.value);
          } else if (inputName === 'password') {
            setPassword(e.target.value);
          }
    }


    const handleSubmit = async (e) =>{
        e.preventDefault();
        try{
            const {data} = await axios.post('http://localhost:5000/api/signin', {
                email,
                password
            });

            console.log(data);

            if  (data.success === true){
                setEmail('');
            setPassword('');
                toast.success("Giris yapma basarili");
                localStorage.setItem("token", JSON.stringify(data))
                if (typeof window !== "undefined"){
                    setTimeout(()=>{
                        history.push('/anasayfa');
                    }, 2000);
                }
              
            }
            

        } catch(err){
            
           
         
        }
    }
    
    return (
        <div>
            
            <div className="container custom_className ">
                <h2 className="signup_title text-center">SIGN IN</h2>
                <form className=" col-sm-6 offset-3 pt-5 signup_form">
                    
                                  
                    <div className="form-outline mb-4">
                        <input onChange={handleChange("email")}   type="email" id="form4Example2" className="form-control"  value={email} />
                        <label className="form-label" htmlFor="form4Example2">Email </label>
                    </div>

                
                    <div className="form-outline mb-4">
                        <input onChange={handleChange("password")}   type="password" id="form4Example3" className="form-control" value={password}  />
                        <label className="form-label" htmlFor="form4Example3">Password</label>
                    </div>
                
                    <button onClick={handleSubmit} type="submit" className="btn btn-primary btn-block mb-4">Log In</button>
                </form>
            </div>
            
        </div>
    )
}

export default SignIn