import React, { Component } from 'react';

export default class App extends Component {
  constructor(props, context) {
    super(props, context);
    this.state = {};
  }
  render() {
    return (
      <div>{process.env.NODE_ENV}</div>
    );
  }
}
