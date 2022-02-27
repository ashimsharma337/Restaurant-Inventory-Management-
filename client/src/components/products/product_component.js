import React, { useEffect, useState } from 'react';
import { MdEdit, MdOutlineDeleteForever } from "react-icons/md";
import toast, { Toaster } from 'react-hot-toast';
import { NavLink } from 'react-router-dom';
import HeaderN from '../dashboard/common/header/header_component';
import Sidebar from '../dashboard/common/sidebar/sidebar_component';
import { httpRequest } from '../../services/httpclient';

const Product = () => {
  const userInfo = JSON.parse(localStorage.getItem("user_info"));
  
  const [allProducts, setAllProducts] = useState([]);

  useEffect(() => {
    toast.success('Welcome to Product Page!');
  }, []);

  useEffect(() => {
    httpRequest.getItems("/products")
    .then((response) => {
      // console.log(response.data.result);
      let productList = response.data.result;
      setAllProducts(productList);
      console.log(productList);
    })
    .catch((error) => {
      console.log(error);
    })
  },[])

  const handleDelete = (index, productId) => {
        httpRequest.deleteItem("/products/"+productId, true)
        .then((success) => {
          let new_products = allProducts.filter((o, i) => (i !== index))
          setAllProducts(new_products);
          toast.success("Product deleted successfully.");
        })
        .catch((error) => {
          console.log(error);
          toast.error("Error while deleting product!");
        })
  }

  return (
    <>
      <HeaderN/>

        <div className="container-fluid">
          <div className="row">
            <Sidebar/>

            <main className="col-md-9 ms-sm-auto col-lg-10 px-md-4">
              <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom">
                <h1 className="h2">Dashboard</h1>
                <span>Hi, {userInfo.name} Welcome!</span>
                <div className="btn-toolbar mb-2 mb-md-0">
                  <div className="btn-group me-2">
                    <button type="button" className="btn btn-sm btn-outline-secondary">Share</button>
                    <button type="button" className="btn btn-sm btn-outline-secondary">Export</button>
                  </div>
                </div>
              </div>

              <h4>Product Page</h4>
              <hr></hr>
              <div className='container-fluid'>
              {/* <div className="table-responsive"> */}
                <table className="table table-striped table-sm">
                  <thead>
                    <tr>
                      <th scope="col">S.N</th>
                      <th scope="col">Item</th>
                      <th scope="col">Category</th>
                      <th scope="col">Vender</th>
                      <th scope="col">Quantity</th>
                      <th scope="col">Price</th>
                      <th scope="col">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {
                      allProducts.map((o, i) => (
                        <tr key={i}>
                          <td>{i+1}</td>
                          <td>{o.title}</td>
                          <td>{o.category_id?.title}</td>
                          <td>{o.vendor}</td>
                          <td>{o.quantity}&nbsp;{o.unit}</td>
                          <td>${o.price}</td>
                          <td>

                          <NavLink to={"/product/"+o._id} className='btn btn-sm btn-warning' ><MdEdit/>&nbsp;Edit</NavLink>&nbsp;
                          <button onClick = {(event) => {
                            let confirmed = window.confirm("Are you sure you want want to delete this product?");
                            if(confirmed){
                              return handleDelete(i, o._id);
                            }
                          }} className='btn btn-sm btn-danger'><MdOutlineDeleteForever/>&nbsp;Delete</button>

                          </td>
                        </tr>
                      ))
                    }
                  </tbody>
                </table>
              {/* </div> */}
              </div>
            </main>
          </div>
        </div>
        <Toaster />

    </>
  )
}

export default Product;