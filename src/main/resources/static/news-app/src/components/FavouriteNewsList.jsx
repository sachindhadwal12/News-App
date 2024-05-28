import React, { useContext, useEffect, useState } from "react";
import News from "./News";
import axios from "axios";
import { Navigate } from "react-router-dom";
import { Alert } from "react-bootstrap";

const FavouriteNewsList = (props) => {

    props.toggleHeaderVisibility(true);

    const [news, setNews] = useState([]);
    const [statusMessageError, setStatusMessageError] = useState('');
    const [statusMessageSuccess, setStatusMessageSuccess] = useState('');
    const [showError, setShowError] = useState(false);
    const [showSuccess, setShowSuccess] = useState(false);

    const headers = {
        'Authorization': `Bearer ${props.jwt}`,
        'Content-Type': 'application/json'
    };

    // Geting News
    useEffect(() => {
        axios.get('http://localhost:9092/api/v1/wishlist/getWishListItems', { headers })
            .then(response => {
                setNews(response.data.data);
            })
            .catch(error => {
                setStatusMessageError(error.response.data.message);
                setShowError(true); // Show the error message
                // Hide the error message after 5 seconds
                setTimeout(() => {
                    setShowError(false);
                }, 5000);
            });
    }, [])

    const deleteFromFavourite = (id) => {
        axios.delete(`http://localhost:9092/api/v1/wishlist/deleteWishListItem/${id}`, { headers })
            .then(response => {
                setNews(news.filter(item => item.articleId !== id));
                setStatusMessageSuccess(response.data.message);
                setShowSuccess(true); // Show the success message
                // Hide the success message after 5 seconds
                setTimeout(() => {
                    setShowSuccess(false);
                }, 5000);
            })
            .catch(error => {
                setStatusMessageError(error.response.data.message);
                setShowError(true); // Show the error message
                // Hide the error message after 5 seconds
                setTimeout(() => {
                    setShowError(false);
                }, 5000);
            });
    }

    if (!props.jwt) {
        return <Navigate to="/" replace />;
    }

    return (
        <>
            <div className="container" style={{ paddingBottom: "10vh" }}>
                {showError && <Alert style={{ margin: "10px" }} variant="danger">{statusMessageError}</Alert>}
                {showSuccess && <Alert style={{ margin: "10px" }} variant="success">{statusMessageSuccess}</Alert>}
                <div className="row">
                    {
                        news.map(item => {
                            return <News isFavourite={true} deleteFromFavourite={deleteFromFavourite} key={item.articleId} id={item.articleId} title={item.title} description={item.description} content={item.content} />
                        })
                    }
                </div>
            </div>
        </>
    )
}

export default FavouriteNewsList;