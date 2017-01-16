import React from 'react';
import ReactDOM from 'react-dom';
import Greetings from './Greetings'
/*class Greetings extends React.Component {
  render() {
    return <h1>Hello, {this.props.name}</h1>;
  }
}*/
ReactDOM.render(
    <div>
        <h1>Hello, world!</h1>
        <p>Tu pride ExtJS componenta</p>
        <Greetings name="Alexander"/>
    </div>,
  document.getElementById('root')
);