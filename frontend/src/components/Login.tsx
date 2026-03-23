import { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

const Login = () =>{
    const [email, setEmail] = useState("");
    const [password, setPassword]= useState("");
    const navigate = useNavigate();

    const handleLogin = async () =>{
    try {
    const res = await axios.post("http://localhost:5000/api/auth/login", {
      email,
      password,
    });

    alert(res.data.msg); // success
    navigate("/home");
  } catch (err: any) {
    console.log("Error:", err);
    alert(err.response?.data?.msg); 
  }
    }



    return(
        <>
           
            <div className="formstyle">
                <h2>Login</h2>
                <label>Email : </label>
                <input onChange={(e)=>setEmail(e.target.value)}/>
                <label>Password : </label>
                <input type="password" onChange={(e)=>setPassword(e.target.value)}/>
                <button onClick={handleLogin}>Login</button>
                <p>Do not have an account? </p> <Link to="/register">Register</Link>
           </div>
        </>
    )
}

export default Login;