import React from "react";
import { Link, useNavigate } from "react-router-dom";
import './Header.css';

const Header = (props) => {

  const navigate = useNavigate();

  const onLogOutHandler = () => {
    localStorage.clear();
    navigate('/');
    props.logOut();
  }

  return (
    <nav className="navbar navbar-expand-lg header">
      <div className="container-fluid">
        <a className="navbar-brand" href="#">Fury News App</a>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <Link className="nav-link active" aria-current="page" to="/home">Home</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link active" aria-current="page" to="/searchNews">Search News</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link active" aria-current="page" to="/wishList">Wish List</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link active" aria-current="page" to="/aboutus">About Us</Link>
            </li>

            <li className="nav-item">
              <Link className="nav-link active" aria-current="page" to="/contactus">Contact Us</Link>
            </li>

            <li className="nav-item">
              <Link className="nav-link active" aria-current="page" to="/settings">Setting</Link>
            </li>
          </ul>
          <form className="d-flex" role="search">
            <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search" />
            <button className="btn btn-outline-success" type="submit">Search</button>
          </form>
          <button className="btn btn-outline-warning" type="button" onClick={onLogOutHandler}>Log Out</button>
        </div>
      </div>
    </nav>
  )
}

export default Header;