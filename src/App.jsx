import {
  createBrowserRouter,
  Navigate,
  RouterProvider,
} from "react-router-dom";
import PropTypes from 'prop-types';
import { Home, Login } from './pages';
import './App.css'



const ProtectedRoute = ({ children }) => {
  const accessToken = localStorage.getItem('accessToken');
  return accessToken
    ? children
    : <Navigate to={'/'} />;
}

function App() {

  const router = createBrowserRouter([
    {
      path: "/",
      element: <Login />,
    },
    {
      path: "/home",
      element: <ProtectedRoute><Home /></ProtectedRoute>,
    },
  ]);

  return (
    <>
      <RouterProvider router={router} />
    </>
  )
}

export default App;

ProtectedRoute.propTypes = {
  children: PropTypes.node.isRequired,
};
