import { useEffect, useState } from "react";
import { axiosPrivate } from "../redux/api/axios";
import { useDispatch, useSelector } from "react-redux";
import { setUser } from "../redux/slices/userSlice";
import { useNavigate } from "react-router-dom";
import '../form.css';


const Login = () => {
  const user = useSelector((state) => state.user.value);
  const [username, setUsername] = useState('atuny0');
  const [password, setPassword] = useState('9uQFF1Lh');
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      navigate('/home');
    }
  }, [user]);

  const handleClick = async (e) => {
    e.preventDefault();
    const res = await axiosPrivate.post('/auth/login', { username, password });
    console.log(res.data)
    localStorage.setItem('userInfo', JSON.stringify(res.data));
    localStorage.setItem('accessToken', res.data.token);
    dispatch(setUser(res.data));
    navigate('/home');
  }

  return (
    <>
      <div className="gradient"></div>
      <div className="main-form">
        <div className="form-container">
          <form>
            <h1>Login</h1>
            <label htmlFor="username">
              username:
            </label>
            <input value={username} onChange={(e) => { setUsername(e.target.value) }} type="username"  required />
            <br />
            <label htmlFor="password">
              Password:
            </label>
            <input value={password} onChange={(e) => { setPassword(e.target.value) }} type="password"  required />

            <br />
            <button onClick={handleClick} className="cta">Login</button>
          </form>
        </div>
      </div>
    </>
  )
}

export default Login;
