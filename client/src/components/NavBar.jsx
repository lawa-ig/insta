import React from 'react';
import { Input, Menu, Container } from 'semantic-ui-react';
import axios from 'axios';


class NavBar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      activeItem: 'home'
    };
    this.handleItemClick = this.handleItemClick.bind(this);
  }

  handleItemClick(e, { name }) {
    this.setState({ activeItem: name });
  }

  render() {
    const { activeItem } = this.state;
    return (
      <Container className="navbar-container">
        <Menu className="navbar" secondary>
          <Menu.Menu position='left' className="left-menu">
            <img className="logo" src="http://static.tumblr.com/tnhrvnx/SiOm2xuu2/fireythings_flame_logo.jpg"/>
            <div className="logo-bar">|</div><div className="logo-name"> InstaLawa</div>
            <Menu.Item name='home' active={activeItem === 'home'} onClick={this.handleItemClick}/>
            <Menu.Item name='friends' active={activeItem === 'friends'} onClick={this.handleItemClick}/>
          </Menu.Menu>
        
          <Menu.Menu position='right' className="right-menu">
            <Menu.Item name='upload' active={activeItem === 'upload'} onClick={this.handleItemClick}/>
            <Menu.Item>
              <Input icon='search' placeholder='Search...' />
            </Menu.Item>
            <Menu.Item name='logout' active={activeItem === 'logout'} onClick={this.handleItemClick} />
          </Menu.Menu>
        </Menu>
      </Container>
    );
  }
}



export default NavBar;