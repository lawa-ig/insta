import React from 'react';
import ReactDOM from 'react-dom';
import PictureGrid from './components/prof_pg/PictureGrid.jsx';
import ModalModalExample from './components/prof_pg/modal.jsx';

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      loggedIn: ''
    };
  }
  render() {
    return (
      <div>
        <h1>React is Live</h1>
        {/* ADD YOUR ONE COMPONENT HERE, BUILD A FOLDER FROM IT */}
        <PictureGrid allPhotos={this.state.photos} />
      </div>
    );
  }
}
 
ReactDOM.render(<App/>, document.getElementById('app'));