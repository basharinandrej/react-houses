import './App.css';
import React, {Component} from 'react'
import Aside from "./components/Aside/Aside";

class App extends Component {

  componentDidMount() {
    //Получение информации об оборудовании
    /*FB.firestore().collection("inventory").get().then(response => {
      let docs = response.docs.map(x => ({
        id: x.id,
        data: x.data(),
        placeId: x.data().place.id
      }));
      console.info('оборудовании', docs);
    });*/
  }

  render() {
    return (
        <div className="container">
          <section className="section-app">
            <Aside />
          </section>
        </div>
    );
  }
}

export default App;
