import React from 'react';

import API from './util/api';

import './App.css';

class App extends React.Component {
  constructor() {
    super();

    this.state = {
      // users: [],
      name: '',
      quote: '',
    };
  }

  componentDidMount() {
    API.genres.get().then(res => console.log('Res:', res.data));
    API.genres.post(10, 20).then(res => console.log('Res:', res.data));
    API.genres.put().then(res => console.log('Res:', res.data));
    API.genres.delete().then(res => console.log('Res:', res.data));
  }

  render() {
    return (
      <div className="App">
        <button onClick={this.getQuotes} />
        <button onClick={this.postQuotes} />
        <form onSubmit={this.handleSubmit}>
          <input
            type="text"
            placeholder="name"
            name="name"
            value={this.state.name}
            onChange={this.handleInputName}
          />
          <input
            type="text"
            placeholder="quote"
            name="quote"
            value={this.state.quote}
            onChange={this.handleInputQuote}
          />
          <button type="submit">Submit</button>
        </form>
      </div>
    );
  }
}

export default App;
