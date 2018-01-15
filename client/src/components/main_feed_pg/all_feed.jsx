import React from 'react';
import { Grid, Container } from 'semantic-ui-react';
import FeedGrid from './feed_grid.jsx';
import FeedBar from './feed_bar.jsx';
import axios from 'axios';

//this is the /feed page
class AllFeeds extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			loggedInUser: this.props.user,
			userFeeds: [],
			userInfo: ''
		}
		this.updateFeed(this.props.user.user_id);
		this.getUserInfo(this.props.user.user_id);
	}


//updates state with all the posts with the account the logged in user is following
	updateFeed(userId) {
		axios.post('/feed', {userId})
			.then((response) => {
				this.setState({
					userFeeds: response.data
				})
			})
			.catch((error) => {
				console.log('axios get error', error)
			})
	}

//gets the loggedIn users info in order to render sidebar
	getUserInfo(userId) {
		axios.post('/user', {userId})
			.then((response) => {
				this.setState({
					userInfo: response.data,
				})
			})
			.catch((error) => {
				console.log('axios get error', error)
			})
	}

//renders two seperate component on the /feed page
	render() {
		return (
			<div>
				<div className="feedBar">
					<FeedBar loggedInUser={this.state.userInfo} clickToSwitchUser={this.props.clickToSwitchUser}/>
				</div>
				<div className="all-feeds">
					<FeedGrid loggedInUser={this.state.loggedInUser} userFeeds={this.state.userFeeds} clickToSwitchUser={this.props.clickToSwitchUser} />
				</div>
			</div>
		)
	}
}


export default AllFeeds;