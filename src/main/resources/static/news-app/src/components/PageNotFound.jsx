import React, { useContext } from 'react'
import ThemeContext from '../context/ThemeContext';

const PageNotFound = (props) => {
  props.toggleHeaderVisibility(false);

  const themeContext = useContext(ThemeContext);
  themeContext.setMinHeight('min-height-100vh');
  return (
    <div style={{ padding: '5vw' }}>
      <div style={{color: 'white', backgroundColor: 'black', textAlign: 'center', padding: '2vw'}}>
      <h2>Page Not Found</h2>
      <p>The page you are looking for does not exist</p>
      </div>
    </div>
  )
}

export default PageNotFound
