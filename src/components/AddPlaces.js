import 'bootstrap/dist/css/bootstrap.css';
import { useState } from 'react';
import Card from 'react-bootstrap/Card';
import placeList from "./places";
import reviewList from "./reviews";

function AddPlaces(props){

    const [places, setplaces] = useState([]);
    const [reviews, setReviews] = useState([]);

    const addplace = (e) => {
        e.preventDefault();
        const newplace = {
          id: Math.random().toString(36).substr(2, 9),
          text: e.target.place.value,
          address: e.target.address.value,
        };
        setplaces([...places, newplace]);
        placeList.push(newplace);
        e.target.place.value = "";
        e.target.address.value = "";
      }

    function addReview(e, placeId){
        e.preventDefault();
        const newReview = {
          id: Math.random().toString(36).substr(2, 9),
          text: e.target.review.value,
          placeId: placeId,
        };
        setReviews([...reviews, newReview]);
        reviewList.push(newReview);
        e.target.review.value = "";
      }

    function deleteReview(idToDelete){
        const filteredReviews = reviews.filter((review) => review.id !== idToDelete);
        setReviews(filteredReviews);
        let index = reviewList.indexOf(filteredReviews[0].id);
        reviewList.splice(index, 1);
    };
      return (
          <div>
            <form onSubmit={addplace}>
                <input type="text" placeholder="restaurant" name="place" />
                <input type="text" placeholder="address" name="address" />
                <input type="Submit" value="Add Restaurant"/>
            </form>

        {places.map((place) => (
            <div key={place.id}>
        <Card id={place.id} style={{ width: '750px' }}>
        <Card.Header as="h5">{place.text}
        </Card.Header>

        <Card.Body>
        Address: {place.address}
        <Card.Title>Reviews</Card.Title>
        
        <form onSubmit={(e) => addReview(e, place.id)}>
                <input type="text" name="review" />
                <input type="Submit" />
        </form>
        {reviews.filter(review => review.placeId === place.id).map((review) => (
            
        <div key={review.id}>
      <div>{review.text}</div>
        <button onClick={() => deleteReview(review.id)}>delete</button>
        </div>
    ))}
        </Card.Body>
        </Card>
  </div>
))}
        </div>


      )
}

export default AddPlaces;