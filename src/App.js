import React, { Component } from 'react';
import './App.css';
import request from 'superagent'  //npm install --save superagent

class App extends Component {
  constructor(){
    super();

    this.state = {
      // cities: [{
      //   id: 1,
      //   name: 'France',
      //   coords: {
      //     lat: 46.227638,
      //     lng: 2.213749
      //   },
      // },{
      //   id: 2,
      //   name: 'Canada',
      //   coords: {
      //     lat: 56.130366,
      //     lng: -106.346771
      //   },
      // }],
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
      console.log('Just... Changing');
      
    }
  }

  getFranceWeather = (e) => {
    e.preventDefault();
    const API_URL = `https://api.darksky.net/forecast/b4821cd62a474edc91d688e05c15d8cc/46.227638,2.213749`
    
    request
      .get(API_URL)
      .then(response => console.log(response))
    console.log('France');
    
  }

  getCanadaWeather = (e) => {
    e.preventDefault();
    const API_URL = 'https://api.darksky.net/forecast/b4821cd62a474edc91d688e05c15d8cc/56.130366,-106.346771'
    
    request
      .get(API_URL)
      .then(response => console.log(response))
    console.log('CANADA');
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
            <a href='/' onClick={this.getFranceWeather} className='app__country'>France</a>
            <a href='/' onClick={this.getCanadaWeather} className='app__country'>Canada</a>
             { this.state.show && <input  autoFocus onKeyDown={this.inputElement} type='text' placeholder='Location' className='app__input' />}
          </aside>
          <section className='app__view'>Text</section>
        </div>
      </div>
    );
  }
}

export default App;
