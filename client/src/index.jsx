import React from 'react';
import ReactDOM from 'react-dom';
import NavBar from './components/NavBar.jsx';
import LogIn from './components/LogIn.jsx';
import UserProfile from './components/prof_pg/UserProfile.jsx';
import fakeProfileTableData from '../../database/fakeProfileTableData';

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      loggedIn: false, 
      loggedInUser: '', //should be an object with data for logged in user
      onPageForUser: fakeProfileTableData, //should be an object with user data
      //****************************************************************************/
      currentPg: 'login_page' //<=CHANGE THIS VALUE TO RENDER AND WORK ON YOUR PAGE
      //****************************************************************************/
    };
  }

  pageRouter(currentPg) {
    if (currentPg === 'user_profile') {
      return (
        <div>
          <NavBar /> {/* Albert */}
          <UserProfile user={this.state.onPageForUser} />
        </div>
      );
    } else if (currentPg === 'login_page') {
      return (
        <LogIn /> //(WILL)
      );
    } else if (currentPg === 'feed') {
      return (
        <div>
          <NavBar /> {/* Albert */}
          <div></div> {/* <Feed /> Larry */}
        </div>
      );
    }
  }

  render() {
    return (
      <div>
        {
          this.pageRouter(this.state.currentPg)
        }
      </div>
    );
  }
}
 
ReactDOM.render(<App/>, document.getElementById('app'));