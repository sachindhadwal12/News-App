import React, { useEffect, useState } from 'react'
import { Navigate } from 'react-router-dom';
import News from './News';
import { Alert } from 'react-bootstrap';
import axios from 'axios';

const SearchNews = (props) => {

  props.toggleHeaderVisibility(true);


  const [values, setValues] = useState({
    q: "",
    source: "",
    from: "",
    to: "",
    pageSize: 6,
    page: 1
  });

  const [news, setNews] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [statusMessageError, setStatusMessageError] = useState('');
  const [statusMessageSuccess, setStatusMessageSuccess] = useState('');
  const [pageCount, setPageCount] = useState(0);

  const headers = {
    'Authorization': `Bearer ${props.jwt}`,
    'Content-Type': 'application/json'
  };

  useEffect(() => {
    // Function to close the alert after 5 seconds for error message
    const errorTimer = setTimeout(() => {
      setStatusMessageError("");
    }, 5000);

    // Function to close the alert after 5 seconds for success message
    const successTimer = setTimeout(() => {
      setStatusMessageSuccess("");
    }, 5000);

    // Clear the timeouts when the component unmounts
    return () => {
      clearTimeout(errorTimer);
      clearTimeout(successTimer);
    };
  }, [statusMessageError, statusMessageSuccess]); // Re-run effect when status messages change

  const onSubmitHandler = () => {
    axios.post('http://localhost:9091/api/v1/news/search', values, { headers })
      .then(response => {
        setNews(response.data.data.articles);
        setPageCount((response.data.data.totalResults / 6) > 16 ? 16 : Math.ceil(response.data.data.totalResults / 6));
        setStatusMessageError("");
      })
      .catch(error => {
        setNews([]);
        setPageCount(0);
        setStatusMessageError(error.response.data.message);
      });
  }

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
        setStatusMessageError("");
      })
      .catch(error => {
        setStatusMessageError(error.response.data.message);
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
        setStatusMessageError("");
      })
      .catch(error => {
        setStatusMessageError(error.response.data.message);
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
      });
  }

  const addToFavourite = (id) => {
    axios.post('http://localhost:9092/api/v1/wishlist/saveWishListItem', news.filter(news => news.articleId === id)[0], { headers })
      .then(response => {
        setStatusMessageSuccess(response.data.message);
      })
      .catch(error => {
        setStatusMessageError(error.response.data.message);
      });
  }

  if (!props.jwt) {
    return <Navigate to="/" replace />;
  }

  return (
    <>
      <div className="container">
        <div className="row">
          <div className="col-md-2">
            <div className="form-group mt-2">
              <input type="text" className="form-control" onChange={(e) => setValues({ ...values, q: e.target.value })} placeholder="Keyword" />
            </div>
          </div>
          <div className="col-md-2">
            <div className="form-group mt-2">
              <input type="text" className="form-control" onChange={(e) => setValues({ ...values, source: e.target.value })} placeholder="Source" />
            </div>
          </div>
          <div className="col-md-2">
            <div className="form-group mt-2">
              <input type="text" className="form-control" onChange={(e) => setValues({ ...values, from: e.target.value })} placeholder="Start Date" />
            </div>
          </div>
          <div className="col-md-2">
            <div className="form-group mt-2">
              <input type="text" className="form-control" onChange={(e) => setValues({ ...values, to: e.target.value })} placeholder="End Date" />
            </div>
          </div>
          <div className="col-md-2">
            <div className="form-group mt-2">
              <button onClick={onSubmitHandler} className="btn btn-primary">Search</button>
            </div>
          </div>
        </div>
      </div>
      <div className="container" style={{ paddingBottom: "10vh" }}>
        {statusMessageError && <Alert style={{ margin: "10px" }} variant="danger">{statusMessageError}</Alert>}
        {statusMessageSuccess && <Alert style={{ margin: "10px" }} variant="success">{statusMessageSuccess}</Alert>}
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
                <a className="page-link" href="#" onClick={() => onClickNextHandler(0)}>Next</a>
              </li>
            </ul>
          </nav>)
        }
      </div>
    </>
  )
}

export default SearchNews;
