import { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const Register = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleRegister = async () => {
    const res = await axios.post("http://localhost:5000/api/auth/register", {
      email,
      password,
    });
    alert(res.data.msg);
  };

  return (
    <div className="formstyle">
      <h2>Register</h2>
      <input placeholder="Email" onChange={(e) => setEmail(e.target.value)} />
      <input type="password" placeholder="Password"
        onChange={(e) => setPassword(e.target.value)} />
      <button onClick={handleRegister}>Register</button>
      <p>Already registered? </p> <Link to="/login">Login</Link>
    </div>
  );
};

export default Register;
