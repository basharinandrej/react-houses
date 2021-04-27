import './App.css';
import React, {Component} from 'react'
import Aside from "./components/Aside/Aside";
import Main from "./components/Main/Main";

class App extends Component {

  render() {
    return (
      <section className="section-app">
        <Aside />
        <Main/>
      </section>
    );
  }
}

export default App;
