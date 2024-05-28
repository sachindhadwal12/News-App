import React, { useContext, useState } from 'react';
import './App.css';
import Header from './components/Header';
import Footer from './components/Footer';
import AboutUs from './components/AboutUs';
import ContactUs from './components/ContactUs';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import PageNotFound from './components/PageNotFound';
import SearchNews from './components/SearchNews';
import ThemeContext from './context/ThemeContext';
import Setting from './components/Setting';
import UserLoginForm from './components/UserLoginForm';
import UserRegistrationForm from './components/UserRegistrationForm';
import AuthContext from './context/AuthContext';
import NewsList from './components/NewsList';
import FavouriteNewsList from './components/FavouriteNewsList';

function App() {
  const themeContext = useContext(ThemeContext);
  const authContext = useContext(AuthContext)
  const [showHeader, setShowHeader] = useState(true);

  const toggleHeaderVisibility = (isVisible) => {
    setShowHeader(isVisible);
  };
  return (
   <div className={themeContext.theme + ' ' + themeContext.minHeight}>
    <Router>
    {showHeader && <Header logOut={authContext.logout} />}
    <button style={{float: 'right'}} onClick={() => themeContext.setTheme(themeContext.theme === 'food1' ? 'food2' : 'food1')}>Toggle Theme</button>
    <Routes>
      <Route path="/" element={<UserLoginForm toggleHeaderVisibility={toggleHeaderVisibility} />} />
      <Route path="/register" element={<UserRegistrationForm toggleHeaderVisibility={toggleHeaderVisibility}/>} />
      <Route path="/home" element={<NewsList jwt={authContext.jwt} toggleHeaderVisibility={toggleHeaderVisibility} />} />
      <Route path='/searchNews' element={<SearchNews jwt={authContext.jwt} toggleHeaderVisibility={toggleHeaderVisibility} />} />
      <Route path="/wishList" element={<FavouriteNewsList jwt={authContext.jwt} toggleHeaderVisibility={toggleHeaderVisibility} />} />
      <Route path="/aboutus" element={<AboutUs jwt={authContext.jwt} toggleHeaderVisibility={toggleHeaderVisibility}/>} />
      <Route path="/contactus" element={<ContactUs jwt={authContext.jwt} toggleHeaderVisibility={toggleHeaderVisibility} />} />
      <Route path="/settings" element={<Setting jwt={authContext.jwt} toggleHeaderVisibility={toggleHeaderVisibility} />} />
      <Route path="*" element={<PageNotFound toggleHeaderVisibility={toggleHeaderVisibility} />} />
    </Routes>
    <Footer />
    </Router>
   </div>
  );
}

export default App;
