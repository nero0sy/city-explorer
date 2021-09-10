import React, {Component} from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';
import Card from 'react-bootstrap/Card'
import CityForm from "./component/CItyForm";


export class App extends Component {
    
  constructor(props) {
    super(props);
    this.state = {
      locationName: '',
      locationData: {}
    }
  }

  handelLocationNameChange = (e) => { this.setState({ locationName: e.target.value }) }

  handelSubmit = async (e) => {
    e.preventDefault();
  
    const url = `https://eu1.locationiq.com/v1/search.php?key=${process.env.REACT_APP_LOCATION_IQ_KEY}&q=${this.state.locationName}&format=json`;

    console.log(url);

    const response = await axios.get(url);

    console.log(response.data[0]);
    this.setState({
      locationData: response.data[0]
    });
  }
  
  
  
  render(){
        return (
    
   <div>
     <CityForm handelLocationNameChange={this.handelLocationNameChange} handelSubmit={this.handelSubmit}/>
     <h2>Location Info</h2>
     <p>{this.state.locationData.display_name}</p>
     <p>lat: {this.state.locationData.lat}</p>
     <p>lon: {this.state.locationData.lon}</p>
     <img src={`https://maps.locationiq.com/v3/staticmap?key=${process.env.REACT_APP_LOCATION_IQ_KEY}&center=${this.state.locationData.lat},${this.state.locationData.lon}&zoom=15&size=600x600`} alt=""/>
   </div>

        )

    }
}

export default App;