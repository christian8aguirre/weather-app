import React, { Component } from 'react';
import './App.css';
import request from 'superagent';  //npm install --save superagent
import { API_KEY_DARK_SKY } from './secret'

class App extends Component {
  constructor(){
    super();

    this.currentElement = React.createRef();

    this.state = {
      cities: [],
      show: false,
      timezone: 'timezone',
      summary: '...',
      daily: [{
        time: '',
        icon: '',
        humidity: '',
        pressure: '',
        temperature: '',
        windSpeed: '',
        temperatureMax:''
      }], 
      vissible: false
    };
  }

  addCity = (e) =>{
    //If sm ENTER was pressed
    const ENTER_KEY = 13;
    if (e.keyCode === ENTER_KEY) {
      this.setState({
        cities: [
          ...this.state.cities,
          {
            id:this.state.length + 1,
            name: e.target.value
          }
        ],
        show: false,
      });
      e.target.value = '';
    }
  }

  showInput = () =>{
    this.setState({
      
      show: true
    });
  }

  getCoords = (ENDPOINT) => {
    return request.get(ENDPOINT)
  }

  fetchWeather = (coords) =>{
    const COORDS = coords.body.results[0].geometry.location;
    
    const ENDPOINT = `https://api.darksky.net/forecast/${API_KEY_DARK_SKY}/${COORDS.lat},${COORDS.lng}`
    
    request
      .get(ENDPOINT)
      .then(res => {
        console.log(res.body);
        
        this.setState({
          timezone: res.body.timezone,
          summary: res.body.currently.summary,
          daily: res.body.daily.data,
          vissible: true
        });
      });
  }

  fetchLocation = (e) =>{
    e.preventDefault();
    const  COUNTRY = e.target.textContent
    
    const ENDPOINT = `https://maps.googleapis.com/maps/api/geocode/json?address=${COUNTRY}`
    
    this.getCoords(ENDPOINT)
      .then(this.fetchWeather)
      .catch(error =>{
        this.setState({
          timezone: 'Timezone',
          summary: 'Sorry man'
        })
      })
    }

  // inputElement = (e) => {
  //   if (e.key === 'Enter') {
  //     const country = e.target.value;
  //     const API_URL_GOOGLE = `https://maps.googleapis.com/maps/api/geocode/json?address=${country}`
  //     e.target.value = '';
  //     request
  //     .get(API_URL_GOOGLE)
  //     .then(res => {
  //       const country = res.body.results[0].formatted_address.split(',').slice(-1).join();
  //       const lat = res.body.results[0].geometry.location.lat;
  //       const lng = res.body.results[0].geometry.location.lng;

  //         const arrayTemp = [...this.state.cities];
  //         arrayTemp.push({
  //           id: this.state.cities.length,
  //           name: country,
  //           coords:{
  //             lat: lat,
  //             lng: lng
  //           }
  //         })
  //         this.setState({
  //           cities: arrayTemp
  //         })
  //       })
  //     }
      
  // }
  //=========================================================
  //Obtengo el nombre de ciudad y reviso la posición en el state
  // getWeather = (e) => {
  //   e.preventDefault();
  //   const city = e.target.innerHTML;
  //   const pos = this.positionOfCity(city);
  //   this.requestDarkSky(pos);
  // }
  //=========================================================
  //Con la posición de la ciudad, obtengo las coordenadas y hago el request
  //y agrego los datos en el elemento section.
  // requestDarkSky = (pos) =>{
  //   const lat = this.state.cities[pos].coords.lat;
  //   const lng = this.state.cities[pos].coords.lng;
  //   const API_URL_DARKSKY = `https://api.darksky.net/forecast/${API_KEY_DARK_SKY}/${lat},${lng}`
    
  //   request
  //     .get(API_URL_DARKSKY)
  //     .then(res => {
  //       const template = `
  //       <ul>
  //         <li>CIUDAD: ${this.state.cities[pos].name}</li>
  //         <li>TIMEZONE: ${res.body.timezone}</li>
  //         <li>Lat: ${res.body.latitude}</li>
  //         <li>Lng: ${res.body.longitude}</li>
  //         <li>Summary: ${res.body.currently.summary}</li>
  //       `;

  //       this.currentElement.current.innerHTML = template;
  //     })
  // }

  returnDate = (dateUnix) => {
    const date = new Date(dateUnix*1000).toLocaleDateString();
    console.log(date);
    return date;
  }

  // positionOfCity = (name) => {
  //   const pos = this.state.cities.map(element => 
  //     { return element.name; }).indexOf(name);
  //     return pos;
  // }

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
              return (<a href='/' key={this.state.key} onClick={this.fetchLocation} className='app__country'>{element.name}</a>)
            })}
            
             { this.state.show && <input  autoFocus onKeyDown={this.addCity} type='text' placeholder='Location' className='app__input' />}
          </aside>
          <section className='app__view'>
            <h2>{this.state.timezone}</h2>
            <h3>{this.state.summary}</h3>
            <div className='mainList'>
            {this.state.vissible && 
              this.state.daily.map(element=>{
                return (
                    <ul className= 'dayList'>
                      <li>{this.returnDate(element.time)}</li>
                      <li>{element.icon}</li>
                      <li>{element.humidity}</li>
                      <li>{element.pressure}</li>
                      <li>{element.windSpeed}</li>
                      <li>{element.temperatureMax}</li>
                    </ul>
              )
                }) 
            }
            </div>
            
          </section>
        </div>
      </div>
    );
  }
}

export default App;
