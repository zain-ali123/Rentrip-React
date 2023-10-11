import React, {  useState } from 'react'
import { useDispatch} from 'react-redux';
import { authenticateUser } from '../store/silce/UserSlice';
import { Link, useNavigate } from 'react-router-dom';


export default function Login() {

  const dispatch = useDispatch();
  const navigate = useNavigate();
const [formData, setFormData] = useState({
    email: "",
    password: "",
  });


  const  loginUser = async() => {
    console.log(formData)

    dispatch(authenticateUser(formData))
      .then(() => {
        console.log(localStorage.getItem('role') === 'manager')
        
        if (localStorage.getItem('role') === 'manager') {
          // debugger
          
          console.log("manager")
          // navigate('/manageUsers')
          window.location.href='/manageUsers'
        }
        console.log(localStorage.getItem('role') === 'user')
        if (localStorage.getItem('role') === 'user') {
          debugger
          console.log("user")
          navigate('/cars')
          window.location.href='/cars'
          console.log("nav")
        }
    })

     
    }
 return (
    <div className="pt-20 bg-mygrey grid justify-center items-center">
      <form className="text-metal bg-gray-100 rounded-xl w-80 sm:w-96 text-center sm:h-80">
        <div className="flex justify-center mb-8">
          <h2 className="text-2xl">Login</h2>
          <span className="material-symbols-rounded mt-2"> login </span>
        </div>
        <div className="mb-4 grid">
          <div className="flex justify-center">
            <label htmlFor="email" className="block text-metal font-semibold">
              Email
            </label>
            <span className="material-symbols-rounded text-metal"> mail </span>
          </div>
          <input
            type="email"
            id="email"
            name="email"
            className="w-full px-4 py-2 rounded-md"
            placeholder="example@example.com"
            value={formData.email}
            onChange={(e) =>
              setFormData({ ...formData, email: e.target.value })
            }
          />
        </div>
        <div className="mb-4 grid">
          <div className="flex justify-center">
            <label htmlFor="password" className="block text-metal font-semibold">
              Password
            </label>
            <span className="material-symbols-rounded text-metal"> key </span>
          </div>
          <input
            type="password"
            id="password"
            name="password"
            className="w-full px-4 py-2 rounded-md"
            placeholder="Password"
            value={formData.password}
            onChange={(e) =>
              setFormData({ ...formData, password: e.target.value })
            }
          />
        </div>
        <div>
          <div className="text-red-400">
            {/* <p>{msg}</p> */}
          </div>
        </div>
        <div>
          <button
            type="submit"
            onClick={(e) => {
              e.preventDefault();
              loginUser();
              
            }}
            className="text-metal font-semibold py-2 px-4 rounded-md focus:outline-none hover:scale-110"
          >
            Login
          </button>
             </div>
             <Link to={'/register'}>
                 
             <button>
                 Register
             </button>
             </Link>
      </form>
    </div>
  );

}
