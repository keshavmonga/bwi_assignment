import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Products from "../components/Products";
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import Navbar from "../components/Navbar";
import { useEffect, useState } from "react";
import { Slider } from '@mui/material';

function valuetext(value) {
  return `Rs.${value}`;
}

const Home = () => {
  const user = useSelector((state) => state.user.value);
  const [query, setQuery] = useState('')
  const [value, setValue] = useState([0, 100])
  const navigate = useNavigate();

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  useEffect(() => {
    if (!user) {
      console.log(user);
      navigate('/');
    }
  }, [user]);

  return (
    <div>
      <Navbar fn={setQuery} />
      <div style={{ display: 'flex', width: '50%', margin: 'auto', gap: '1rem', alignItems: 'center', justifyContent: 'center', marginTop: '1rem' }}>
        Price:
        <p>{value[0] * 10}</p>
        <Slider
          getAriaLabel={() => 'Price Range'}
          value={value}
          onChange={handleChange}
          valueLabelDisplay="off"
          getAriaValueText={valuetext}
        />
        <p>{value[1] * 10}</p>
      </div>
      <ToastContainer />
      <Products query={query} lower={value[0] * 10} upper={value[1] * 10} />
    </div>
  )
}

export default Home
