import React, { Component } from 'react';

import './App.css';

import NewsForm from './components/Form';

class App extends Component {

  sendNotification = () => {

    console.log("Here we Go");

    const tokens = {
      tokensArray: ['ExponentPushToken[yTrXyEIIxVia6tRj1djiaS]', 'ExponentPushToken[JiuEqTGKCzpA3Bu18NyvJL]']
    }
    fetch(`${process.env.REACT_APP_API_URL}/exponotify`, {
			method: 'post',
			headers: { 'content-type': 'application/json'},
			body: JSON.stringify(tokens),
		}).then(response=>response.json()).then(arrays=>{
			console.log(arrays);
		}).catch(err => {
      console.log(err);
    });
  }
  render() {
    return (
      <div className="App">
          {/* <img src={logo} className="App-logo" alt="logo" /> */}
          <NewsForm />
          {/* <input type="submit" onClick={this.sendNotification} /> */}
      </div>
    );
  }
}

export default App;
