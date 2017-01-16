import React from 'react';


//Usage of JSX, convenient than: 
//return React.createElement('div', null, `Greetings ${this.props.masterName}`);

export default class Greetings extends React.Component {
    constructor(props){
        super(props);
    }
    
  render() {
    return <h1>Hello, {this.props.name}</h1>;
  }
}
