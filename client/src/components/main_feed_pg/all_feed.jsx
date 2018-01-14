import React from 'react';
import { Grid, Container } from 'semantic-ui-react';
import FeedGrid from './feed_grid.jsx';
import FeedBar from './feed_bar.jsx';
import axios from 'axios';

class AllFeeds extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			loggedInUser: this.props.user,
			userFeeds: []
		}
	}

	componentDidMount() {
		console.log('data', this.props.user.user_id);
		this.updateFeed(this.props.user.user_id);
	}

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

	render() {
		return (
			<div>
				<div className="feedBar">
					<FeedBar loggedInUser={this.state.loggedInUser} />
				</div>
				<div className="all-feeds">
					<FeedGrid loggedInUser={this.state.loggedInUser} userFeeds={this.state.userFeeds} />
				</div>
			</div>
		)
	}
}


export default AllFeeds;