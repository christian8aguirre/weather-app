import React, { Component } from 'react';
import './App.css';
import request from 'superagent';  //npm install --save superagent
import { API_KEY_DARK_SKY } from './secret'

class App extends Component {
  constructor(){
    super();

    this.currentElement = React.createRef();

    this.state = {
      cities: [{
        id: 1,
        name: 'France',
        coords: {
          lat: 46.227638,
          lng: 2.213749
        },
      },{
        id: 2,
        name: 'Canada',
        coords: {
          lat: 56.130366,
          lng: -106.346771
        },
      }],
      show: false
    }
  }

  showInput = () =>{
    this.setState({
      
      show: true
    });
  }

  inputElement = (e) => {
    if (e.key === 'Enter') {
      const country = e.target.value;
      const API_URL_GOOGLE = `https://maps.googleapis.com/maps/api/geocode/json?address=${country}`
      e.target.value = '';
      request
      .get(API_URL_GOOGLE)
      .then(res => {
        const country = res.body.results[0].formatted_address.split(',').slice(-1).join();
        const lat = res.body.results[0].geometry.location.lat;
        const lng = res.body.results[0].geometry.location.lng;

          const arrayTemp = [...this.state.cities];
          arrayTemp.push({
            id: this.state.cities.length,
            name: country,
            coords:{
              lat: lat,
              lng: lng
            }
          })
          this.setState({
            cities: arrayTemp
          })
        })
      }
      
  }
  //=========================================================
  //Obtengo el nombre de ciudad y reviso la posición en el state
  getWeather = (e) => {
    e.preventDefault();
    const city = e.target.innerHTML;
    const pos = this.positionOfCity(city);
    this.requestDarkSky(pos);
  }
  //=========================================================
  //Con la posición de la ciudad, obtengo las coordenadas y hago el request
  //y agrego los datos en el elemento section.
  requestDarkSky = (pos) =>{
    const lat = this.state.cities[pos].coords.lat;
    const lng = this.state.cities[pos].coords.lng;
    const API_URL_DARKSKY = `https://api.darksky.net/forecast/${API_KEY_DARK_SKY}/${lat},${lng}`
    
    request
      .get(API_URL_DARKSKY)
      .then(res => {
        const template = `
        <ul>
          <li>CIUDAD: ${this.state.cities[pos].name}</li>
          <li>TIMEZONE: ${res.body.timezone}</li>
          <li>Lat: ${res.body.latitude}</li>
          <li>Lng: ${res.body.longitude}</li>
          <li>Summary: ${res.body.currently.summary}</li>
        `;

        this.currentElement.current.innerHTML = template;
      })
  }

  positionOfCity = (name) => {
    const pos = this.state.cities.map(element => 
      { return element.name; }).indexOf(name);
      return pos;
  }

  render() {
    return (
      <div className='app'>
        <header className='app__header'>
          <button onClick={this.showInput} className='app__add'>
            <i className='fa fa-plus-circle'></i> New City
          </button>
        </header>
        <div className='grid'>
          <aside className='app__aside'>
            <h1 className='app__title'>All countries</h1>
            { this.state.cities.map(element => {
              return (<a href='/' id={this.state.id} onClick={this.getWeather} className='app__country'>{element.name}</a>)
            })}
            
             { this.state.show && <input  autoFocus onKeyDown={this.inputElement} type='text' placeholder='Location' className='app__input' />}
          </aside>
          <section ref={this.currentElement} className='app__view'>Text</section>
        </div>
      </div>
    );
  }
}

export default App;
