import Home from "./components/home/home_component";
import { BrowserRouter, Routes, Route, Navigate, useNavigate } from "react-router-dom";
import Login from "./components/login/login_component";
import Dashboard from "./components/dashboard/dashboard_component";
import Register from "./components/register/register_component";
import AddProduct from "./components/addProduct";
import Category from "../src/components/category/category_component.js";
import { useEffect } from "react";


function PrivateRoute({component}){
      const is_Logged_In = localStorage.getItem("att");

      return is_Logged_In ? component : <Navigate to="/login"/>;

}

function Logout(){
      localStorage.clear();
      const navigate = useNavigate();
      useEffect(() => {
        navigate("/login");
      });
      return null;
}

function App() {
  return (
    <>
      <BrowserRouter>
          <Routes>
            <Route path="/" element={<Home/>}></Route>
            <Route path="/login" element={<Login/>}></Route>
            <Route path="/register" element={<Register/>}></Route>
            <Route path="/logout" element={<Logout/>}></Route>
            
            

            <Route path="/dashboard" element={<PrivateRoute component={<Dashboard/>}></PrivateRoute>}>
               
            </Route>
            <Route path="/addproduct" element={<PrivateRoute component={<AddProduct/>}></PrivateRoute>}>
              
            </Route>
            <Route path="/category" element={<PrivateRoute component={<Category/>}></PrivateRoute>}>
              
            </Route>

            
          </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
