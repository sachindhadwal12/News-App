import React, { useContext } from 'react'
import './AboutUs.css';
import ThemeContext from '../context/ThemeContext';
import { Navigate } from 'react-router-dom';

const AboutUs = (props) => {

    props.toggleHeaderVisibility(true);

    const themeContext = useContext(ThemeContext);
    themeContext.setMinHeight('min-height-160vh');
    if (!props.jwt) {
        return <Navigate to="/" replace />;
    }
    return (
        <div className="my-5 mb-10" style={{ color: 'white', backgroundColor: 'black', textAlign: 'center', padding: '2vw' }}>
            <div className="inner-container">
                <h3>About Us</h3>
                <p>
                    Welcome to Fury News App, your one-stop destination for comprehensive and personalized news search experience.
                    At Fury, we are passionate about empowering users to access, explore, and stay informed about the latest news and trends from around the world.
                </p>
            </div>
            <div className="inner-container">
                <h4>Our Mission</h4>
                <p>
                    Our mission is to revolutionize the way people discover and consume news.
                    We believe in democratizing access to information, providing users with the tools they need to make informed decisions, stay connected with current events, and explore diverse perspectives.
                </p>
                <h4>What We Offer</h4>
            </div>
            <div className="inner-container">
                <p>
                    Fury offers a powerful, intuitive, and user-friendly platform for searching, discovering, and organizing news articles from a wide range of reputable sources.
                    Whether you're interested in global affairs, technology breakthroughs, business insights, or cultural developments, our platform caters to your interests and preferences.
                </p>
            </div>
            <div className="inner-container">
                <h4>Why Choose Us</h4>
                <p>
                    <ul>
                        <li><b>Comprehensive Coverage:</b> We aggregate news from a multitude of sources, ensuring you have access to diverse viewpoints and comprehensive coverage of events.</li>
                        <li><b>Personalized Experience:</b> Our advanced algorithms analyze your preferences and browsing history to deliver personalized news recommendations tailored to your interests.</li>
                        <li><b>User-Friendly Interface:</b> We prioritize simplicity and ease of use, providing an intuitive interface that allows you to navigate effortlessly and find relevant information quickly.</li>
                        <li><b>Trustworthy Sources:</b> We partner with reputable news outlets and adhere to strict editorial standards to ensure the accuracy and reliability of the content we deliver.</li>
                    </ul>
                </p>
            </div>
            <div className="inner-container">
                <h4>Our Team</h4>
                <p>
                    Behind Fury is a dedicated team of professionals with expertise in technology, journalism, and user experience design.
                    We are committed to continuously improving our platform to meet the evolving needs of our users and uphold the highest standards of quality and integrity.
                </p>
            </div>
        </div>
    )
}

export default AboutUs;
