import React from "react";

const News = (props) => {

    const onClickHandler = (id) => {
        props.addToFavourite(id);
    }

    const deleteClickHandler = (id) => {
        props.deleteFromFavourite(id);
    }

    return (
        <div className="col-md-6">
            <div className="card mx-2 my-2">
                <div className="card-body">
                    {!props.isFavourite && <span onClick={onClickHandler.bind(this, props.id)}><i style={{ cursor: "pointer", padding: "5px" }} className="fa fa-heart float-end fa-lg text-danger"></i></span>}
                    {props.isFavourite && <span onClick={deleteClickHandler.bind(this, props.id)} ><i style={{ cursor: "pointer", padding: "5px" }} className="fa-solid fa-trash-can float-end fa-lg text-danger"></i></span>}
                    <h5 className="card-title">{props.title}</h5>
                    <p className="card-text">{props.description}</p>
                    <p className="card-text">{props.content}</p>
                </div>
            </div>
        </div>
    )
}

export default News;