let apiHost = "https://samantha1mathis-mynearbyplaces.herokuapp.com"

let getPlaces = () => {
    return fetch(apiHost + '/places')
    .then(response => response.json());
}

let addReview = (place, name, comment, rating) =>{
    return fetch(apiHost + '/review/' + place, {
        method: 'post', 
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({placeName:place, name:name, comment:comment, rating:rating})
    })
}

let search = (name, street, city, state, zip) => {
    return fetch(apiHost +'/search/' + name + '/' + street +'/' +city+'/'+state+'/'+zip)
    .then(response => response.json());
}

let addPlace = (place, street, city, state, zip) => {
    return fetch(apiHost + '/place', {
        method: 'post',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({name: place, street:street, city:city, state:state, postalcode:zip})
    });
}

let deletePlace = (place) => {
    return fetch(apiHost + '/deletePlace', {
        method: 'post',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(place)
    });
}

let api = {
    getPlaces: getPlaces,
    addPlace: addPlace,
    addReview: addReview,
    search: search,
    deletePlace: deletePlace
};

export default api;