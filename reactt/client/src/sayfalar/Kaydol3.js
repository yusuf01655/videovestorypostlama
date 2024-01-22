import React, {useState} from 'react'
import axios from 'axios'
const Kaydol = () => {
    const [values, setValues] = useState({
        name: '',
        email: '',
        password: '',
    });
    const {name, email, password} = values;
    const handleChange = name  => (e) =>{
        //console.log(e.target.value);
        setValues({...values, [name]: e.target.value });
    }
    const handleSubmit = async(e) => {
        e.preventDefault();
        try{
            const kullaniciKayit = await axios.post('/api/kaydol', {
                name, email, password
            });
            console.log(kullaniciKayit);
            if(kullaniciKayit.data.success === true){
                setValues({name: '', email: '', password: ''})
            }
        }catch(err){
            console.log();
        }
    }

    return (
        <div>
            
            <div className="container custom_className pt-5">
                <h2 className="signup_title text-center">kaydol</h2>
                <form className=" col-sm-6 offset-3 pt-5 signup_form">
                    
                    <div className="form-outline mb-4">
                        <input  onChange = {handleChange("name")} type="text" id="form4Example1" className="form-control"  value ={name} />
                        <label className="form-label" htmlFor="form4Example1">İsim</label>
                    </div>

                    
                    <div className="form-outline mb-4">
                        <input  onChange = {handleChange("email")} type="email" id="form4Example2" className="form-control" name= {email}  />
                        <label className="form-label" htmlFor="form4Example2">Eposta </label>
                    </div>

                
                    <div className="form-outline mb-4">
                        <input onChange = {handleChange("password")} type="password" id="form4Example3" className="form-control" name = {password} />
                        <label className="form-label" htmlFor="form4Example3">şifre:</label>
                    </div>
                
                    <button onClick={handleSubmit} type="submit" className="btn btn-primary btn-block mb-4">Kaydol</button>
                </form>
            </div>
            
        </div>
    )
}
export default Kaydol;