  import React, { Component } from 'react'
  
  class App extends Component {
      componentDidMount() {
        load_google_maps()
        .then(google => {
        // do stuff
        /*const uluru = {lat: -25.363, lng: 131.044};*/
      /*const map = new google.maps.Map(document.getElementById('map'), {
        zoom: 4,
        center: uluru
      });*/
     /* const marker = new google.maps.Marker({
        position: uluru,
        map: map
      });*/
      })
      // or if you want to load multiple things using Promise.all
        let googleMapsPromise = load_google_maps();
        let APIdata = fetch('some-data.json')
        Promise.all([ googleMapsPromise, APIdata ])
        .then(values => {
        //let google = values[0];
        //let data = values[1];
        // do stuff
      })
      .catch(error => {
         console.log(error);
      })
    }
      render() {
          const { spot } = this.props
          return (
              <div className="list-items">
                  <div className="venue-photo">Photo goes here</div>
                  {`${spot.location ? spot.location.formattedAddress[0] : `Address: Not found address`}
                  ${spot.location ? spot.location.formattedAddress[1] : ``}`}
                  <p>Rating: {spot.rating ? spot.rating : `rating : Unpublished rating`}</p>
              </div>
          )
      }
  }
  export default App


export function load_google_maps() {
  return new Promise(function(resolve, reject) {
    // define the global callback that will run when google maps is loaded
    window.resolveGoogleMapsPromise = function() {
      // resolve the google object
      resolve(window.google);
      // delete the global callback to tidy up since it is no longer needed
      delete window.resolveGoogleMapsPromise;
    }
    // Now, Load the Google Maps API
    const script = document.createElement("script");
    const API_KEY = 'AIzaSyAbBOGUKfGOkwkGDrnd_0pzbRGRG9i1hXA';
    script.src = `https://maps.googleapis.com/maps/api/js?libraries=places&key=${API_KEY}&callback=resolveGoogleMapsPromise`;
    script.async = true;
    document.body.appendChild(script);
 
 });
}



export function load_Places(){
	
	let city = 'Silver Spring, MD';
    let query = 'Shopping';
    var apiURL = 'https://api.foursquare.com/v2/venues/search?client_id=N1IAMKZUIK1AUHKRFGFBKPQ2YKDSBAKS4NTER5SYZN5CROR1&client_secret=4MKLXVLU2FGZQVRMAEDC15P0TFJGSCY3ZUYUZ0KHQQQLQ5R3&v=20130815%20&limit=50&near=' + city + '&query=' + query + '';
    return fetch(apiURL).then(resp => resp.json());
	
}
	
	