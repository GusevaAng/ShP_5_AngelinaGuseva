import React from "react"
import "./AddReview.css"


const AddReview = (props) => {
    const newReview = {
        author: 'Анонимный пользователь',
        title: '',
        review: '',
    }

    const curReview = window.localStorage.getItem(props.id) ? JSON.parse(window.localStorage.getItem(props.id)) : []

    return (
        <div className="addReview">
            <p className="addNewReview"> Оставить свой отзыв о фильме </p>
            <input 
                type="text" 
                name="authorReview"
                id="authorReview"
                value="Анонимный пользователь"
                onChange={(event) => {newReview.author = event.target.value}}
                readOnly
            />
            <input 
                type="text"
                name="titleReview"
                id="titleReview"
                placeholder="заголовок"
                onChange={(event) => {newReview.title = event.target.value}}
            />
            <textarea 
                type="textarea" 
                name="reviewReview"
                id="reviewReview"
                placeholder="отзыв"
                onChange={(event) => {newReview.review = event.target.value}}
            />
            <button onClick={() => {
                const allReviews = [...curReview, newReview]
                localStorage.setItem(props.id, JSON.stringify(allReviews))
                // доделать 
                window.location.reload()
            }}
            className="buttonAddNewReview"> добавить отзыв </button>
        </div>
    )
}

export default AddReview