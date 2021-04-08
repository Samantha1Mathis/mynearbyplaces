import 'bootstrap/dist/css/bootstrap.css';
import { useState } from 'react';
import Card from 'react-bootstrap/Card';
import placeList from "./places";
import reviewList from "./reviews";

function Home(props) {
  const [searchResult, setSearchResult] = useState([]);
  var searchKeyWord ="";

 const search = (e) => {
    searchKeyWord = e.target.search.value;
    let x = placeList.filter(place => place.address.includes(searchKeyWord));
    setSearchResult(x);
    e.target.search.value = "";
  };


    return (
        <div>

            <h2 style={{ textAlign: "center" }}>Home Page</h2>
            <form onSubmit={search}>
                <input type="text" placeholder="address" name="search" />
                <input type="Submit" value="Search"/>
            </form>
            {searchResult.map(place => 
              <Card id={place.id} style={{ width: '750px' }}>
              <Card.Header as="h5">
                {place.text}
              </Card.Header>
              <Card.Body>
              Address: {place.address}
                <Card.Title>Reviews</Card.Title>
              {reviewList.filter(review => review.placeId === place.id).map((review) => (
                  <div key={review.id}>
                  <div>{review.text}</div>
                  </div>
                ))}
                </Card.Body>
              </Card>
              )}
           </div>
    )

}

export default Home;