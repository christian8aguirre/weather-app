import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

class App extends Component {
  constructor(){
    super();

    this.state = {
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
            <a href='#' className='app__country'>France</a>
             { this.state.show && <input  autoFocus onKeyDown={this.inputElement} type='text' placeholder='Location' className='app__input' />}
          </aside>
          <section className='app__view'>Text</section>
        </div>
      </div>
    );
  }
}

export default App;
