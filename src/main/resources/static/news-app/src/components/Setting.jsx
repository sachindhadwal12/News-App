import React, { useContext } from 'react'
import ThemeContext from '../context/ThemeContext';
import { Navigate } from 'react-router-dom';

const Setting = (props) => {
    props.toggleHeaderVisibility(true);

    const themeContext = useContext(ThemeContext);
    themeContext.setMinHeight('min-height-100vh');
    if (!props.jwt) {
        return <Navigate to="/" replace />;
    }
    return (
        <div className="my-5" style={{ color: 'white', backgroundColor: 'black', textAlign: 'center', padding: '2vw' }}>
            <h3>Settings</h3>
            <div className="form-group mt-2">
                Change Theme : <button onClick={() => themeContext.setTheme(themeContext.theme === 'food1' ? 'food2' : 'food1')}>Toggle Theme</button>
              </div>
        </div>
    )
}

export default Setting;
