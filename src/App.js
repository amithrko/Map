import React, { Component } from 'react';

import './App.css';
import { load_google_maps,load_Places} from './utils';


import Navbar from "react-bootstrap/Navbar"

import Sidebar from "react-sidebar";
import Button from "react-bootstrap/Button";


class App extends Component {
	
	constructor(){
		super();
		
		this.state={
			query:'',
			sidebarOpen: true
		
			
		}
		    this.onSetSidebarOpen = this.onSetSidebarOpen.bind(this);
	}
	
	onSetSidebarOpen(open) {
		this.setState({ sidebarOpen: open });
		
	}
 
 componentDidMount(){
	 
	 let googleMapPromise= load_google_maps();
	 let placesPromise= load_Places();
	 
	 Promise.all([
	    googleMapPromise,
		placesPromise]).then(values=>{
						
								let google=values[0];
								this.venues=values[1].response.venues;
								
								
								this.google=google;
								this.markers=[];
								
								this.infowindow=new google.maps.InfoWindow();
								
								
								this.map = new google.maps.Map(document.getElementById('map'), {
								zoom: 10,
								scrollwheel: true,
								center: { lat: this.venues[0].location.lat, lng: this.venues[0].location.lng }
						
						});
						
						
						this.venues.forEach(venue=>{
							
								let marker = new google.maps.Marker({
								position: { lat: venue.location.lat, lng: venue.location.lng },
								map: this.map,
								venue: venue,
								id: venue.id,
								name: venue.name,
								address: venue.location.address,
								postalcode: venue.location.postalCode,
								
								animation: google.maps.Animation.DROP
							
							});
							
							marker.addListener('click', () => {
							  if (marker.getAnimation() !== null) { marker.setAnimation(null); }
									  else { marker.setAnimation(google.maps.Animation.BOUNCE); }
									  setTimeout(() => { marker.setAnimation(null) }, 1500);
								  });
								  
								  
							google.maps.event.addListener(marker, 'click', () => {
								   this.infowindow.setContent("<b>"+marker.name+"</b>"+"<p> Address :"+marker.address+"</p>"+"<p> Postal Code :"+marker.postalcode+"</p>");
									 
									   this.map.setCenter(marker.position);
									   this.infowindow.open(this.map, marker);
									   this.map.panBy(0, -125);
								  });
								  

							this.markers.push(marker);
							
							
							
							
							
							
							
						});
						
						
						
						this.setState({filteredVenues: this.venues});
		
		})
		
		
 }
		
		
		listItemClick=(venue)=>{
			let marker=this.markers.filter(m=>m.id===venue.id)[0];
			
			this.infowindow.setContent("<b>"+marker.name+"</b>"+"<p> Address :"+marker.address+"</p>"+"<p> Postal Code :"+marker.postalcode+"</p>");
			
			this.map.setCenter(marker.position);
			this.infowindow.open(this.map, marker);
			this.map.panBy(0, -125);
			 if (marker.getAnimation() !== null) { marker.setAnimation(null); }
			 else {marker.setAnimation(this.google.maps.Animation.BOUNCE); }
			 setTimeout(() => { marker.setAnimation(null) }, 1500);
			
		
		
		}

						
				
												
	filterVenues(query)
	{
		let f=this.venues.filter(venue=>venue.name.toLowerCase().includes(query.toLowerCase()));
		this.markers.forEach(marker=>{
			marker.name.toLowerCase().includes(query.toLowerCase())===true?
			marker.setVisible(true):
			marker.setVisible(false);
			
		});
		
		
		
		
		
		
		this.setState({filteredVenues: f,query});
		
		
	}
		
	
		
		
		
	
						
						
 

	
	
	
  render() {
    return (
	
	
	
	

	<div>
		 
		<Sidebar
		
        sidebar={
			
			<div id="side">
		
		
				<input value={this.state.query} onChange={(e)=>{this.filterVenues(e.target.value)}}/>
				
					<br/>
					<br/>
					{
						this.state.filteredVenues && this.state.filteredVenues.length>0 && this.state.filteredVenues.map((venue,index)=>(
						<div key={index} className="venue-item" id="name" onClick={()=>{this.listItemClick(venue)}}>
							{venue.name}
					</div>))
						
					}
				
				</div>}
        open={this.state.sidebarOpen}	
        onSetOpen={this.onSetSidebarOpen}
        styles={{ sidebar: { background: "#343a40" } }} >
		
		
		<Navbar expand="lg"  bg="dark">
 
			 <Button variant="outline-info" onClick={()=>{this.onSetSidebarOpen(true)}}>
					Open Sidebar
			 </Button>
	
			<Navbar.Brand href="#" id="nav">Map</Navbar.Brand>
			
 
		</Navbar>
	
      </Sidebar>
		

	   
	
	
	 <div id="map">
     
	 
	 
	 
	 
     </div>

	
 
  
  </div>
  
  

  
  
	
	

	  
	 
	

	
	
	);
  }
}

export default App;
