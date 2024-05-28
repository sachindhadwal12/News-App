import React, { useContext, useEffect, useState } from "react";
import News from "./News";
import axios from "axios";
import { Navigate } from "react-router-dom";
import { Alert } from "react-bootstrap";

const NewsList = (props) => {
    props.toggleHeaderVisibility(true);

    const [news, setNews] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [statusMessageError, setStatusMessageError] = useState('');
    const [statusMessageSuccess, setStatusMessageSuccess] = useState('');
    const [showError, setShowError] = useState(false);
    const [showSuccess, setShowSuccess] = useState(false);
    const [pageCount, setPageCount] = useState(0);

    const [values, setValues] = useState({
        q: "Sri Lanka",
        pageSize: 6,
        page: 1
    });

    const headers = {
        'Authorization': `Bearer ${props.jwt}`,
        'Content-Type': 'application/json'
    };

    // Geting News
    useEffect(() => {
        axios.post('http://localhost:9091/api/v1/news/search', values, { headers })
            .then(response => {
                setNews(response.data.data.articles);
                setPageCount((response.data.data.totalResults / 6) > 16 ? 16 : Math.ceil(response.data.data.totalResults / 6));
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

    const onClickHandler = (page) => {
        setCurrentPage(page);
        let li = document.querySelectorAll('.page-item');
        for (let i = 0; i < li.length; i++) {
            li[i].classList.remove('active');
        }
        li[page].classList.add('active');
        setValues({ ...values, page: page });
        axios.post('http://localhost:9091/api/v1/news/search', { ...values, page: page }, { headers })
            .then(response => {
                setNews(response.data.data.articles);
                setPageCount((response.data.data.totalResults / 6) > 16 ? 16 : Math.ceil(response.data.data.totalResults / 6));
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

    const onClickNextHandler = () => {
        let li = document.querySelectorAll('.page-item');
        for (let i = 0; i < li.length; i++) {
            li[i].classList.remove('active');
        }
        li[currentPage + 1].classList.add('active');
        setCurrentPage(currentPage + 1);
        setValues({ ...values, page: currentPage + 1 });
        axios.post('http://localhost:9091/api/v1/news/search', { ...values, page: currentPage + 1 }, { headers })
            .then(response => {
                setNews(response.data.data.articles);
                setPageCount((response.data.data.totalResults / 6) > 16 ? 16 : Math.ceil(response.data.data.totalResults / 6));
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

    const onClickPrevHandler = () => {
        let li = document.querySelectorAll('.page-item');
        for (let i = 0; i < li.length; i++) {
            li[i].classList.remove('active');
        }
        li[currentPage - 1].classList.add('active');
        setCurrentPage(currentPage - 1);
        setValues({ ...values, page: currentPage - 1 });
        axios.post('http://localhost:9091/api/v1/news/search', { ...values, page: currentPage - 1 }, { headers })
            .then(response => {
                setNews(response.data.data.articles);
                setPageCount((response.data.data.totalResults / 6) > 16 ? 16 : Math.ceil(response.data.data.totalResults / 6));
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

    const addToFavourite = (id) => {
        axios.post('http://localhost:9092/api/v1/wishlist/saveWishListItem', news.filter(news => news.articleId === id)[0], { headers })
            .then(response => {
                setStatusMessageSuccess(response.data.message);
                setShowSuccess(true); // Show the error message
                // Hide the error message after 5 seconds
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
                            return <News addToFavourite={addToFavourite} key={item.articleId} id={item.articleId} title={item.title} description={item.description} content={item.content} />
                        })
                    }
                </div>
                {pageCount > 1 && (
                    <nav aria-label="Page navigation example">
                        <ul className="pagination justify-content-center">
                            <li className={`page-item ${(currentPage === 1) ? 'disabled' : ''}`}>
                                <a className="page-link" href="#" onClick={() => onClickPrevHandler()}>Previous</a>
                            </li>
                            {
                                // Loop through the page numbers and generate pagination links
                                Array.from({ length: pageCount }, (_, index) => (
                                    <li key={index} className={`page-item ${(index === 0 && currentPage === 1) ? 'active' : ''}`}>
                                        <a className="page-link" onClick={() => onClickHandler(index + 1)} href="#">{index + 1}</a>
                                    </li>
                                ))
                            }
                            <li className={`page-item ${(currentPage === pageCount) ? 'disabled' : ''}`} disabled={currentPage === pageCount}>
                                <a className="page-link" href="#" onClick={() => onClickNextHandler()}>Next</a>
                            </li>
                        </ul>
                    </nav>)
                }
            </div>
        </>
    )
}

export default NewsList;