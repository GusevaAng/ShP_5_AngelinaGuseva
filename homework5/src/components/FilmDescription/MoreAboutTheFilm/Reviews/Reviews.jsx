import React , { useEffect, useState } from "react"
import ApiData from "../../../../api/api"
import "./Reviews.css"
import AddReview from "./AddReview/AddReview"
import { mockDataReviews } from "./mockDataReviews"
import { isUseMock } from "../../../../App"


const Reviews = (props) => {
    
    const [reviews, setReviews] = useState();
    
    useEffect (() => {
        const localStorageReviews = localStorage.getItem(props.id) ? JSON.parse(localStorage.getItem(props.id)) : undefined    
            
        const apiData = isUseMock ? setReviews(mockDataReviews) : new ApiData();
            if (!isUseMock) {
                props?.id && apiData.getDataReviews(props?.id)
                .then(function (response) {
                    if (localStorageReviews) {
                        setReviews([...localStorageReviews , ...response.data?.docs]);
                    } else {
                        setReviews(response.data?.docs);

                    }
                });
            }
        }, [props?.id]
    )

    return (
        <div> 
            <AddReview id={props?.id} />
            {reviews?.map((review, idx) => {
                return (
                    <div key={idx} className="review">
                        <h3 className="reviewAuthor">{review.author}</h3>
                        <h5 className="reviewTitle">{review.title}</h5>
                        <p className="reviewAType">{review.type}</p>
                        <p className="reviewReview">{review.review}</p>
                        <p className="reviewDate">{review.date}</p>
                    </div>
                )
            })}
        </div>
    )
}

export default Reviews