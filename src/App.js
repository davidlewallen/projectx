import React, { Component } from 'react';
import axios from 'axios';

import './App.css';

class App extends Component {
  constructor() {
    super();

    this.state = {
      users: [],
      name: '',
      quote: '',
    };
    this.handleInputName = this.handleInputName.bind(this);
    this.handleInputQuote = this.handleInputQuote.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount() {
    axios.get('/users')
      .then(res => {
        console.log(res);
        return res;
      })
      .then(res => this.setState({ users: res.data }))
  }

  handleInputName(e) {
    console.log('hit');
    const { value } = e.target;
    if (this.state.name !== value) {
      this.setState({ name: value});
    }
  }

  handleInputQuote(e) {
    const { value } = e.target;
    if (this.state.quote !== value) {
      this.setState({ quote: value });
    }
  }

  handleSubmit() {
    axios.post('/quotes', {
      name: this.state.name,
      quote: this.state.quote,
    })
  }
  render() {
    return (
      <div className="App">
        <h1>Users</h1>
        {this.state.users.map(user =>
          <div key={user.id}>{user.username}</div>
        )}
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
