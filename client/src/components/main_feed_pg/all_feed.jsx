import React from 'react';
import { Grid, Container } from 'semantic-ui-react';
import FeedGrid from './feed_grid.jsx';
import FeedBar from './feed_bar.jsx';
import axios from 'axios';

class AllFeeds extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			userFeeds: []
		}
	}

	componentDidMount() {
		console.log('data', this.props.data.user_id);
		this.updateFeed(this.props.data.user_id);
	}

	updateFeed(userId) {
		axios.post('/feed', {userId})
			.then((response) => {
				// console.log('axios get success', response)
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
					<FeedBar />
				</div>
				<div className="all-feeds">
					<FeedGrid userFeeds={this.state.userFeeds} />
				</div>
			</div>
		)
	}
}


export default AllFeeds;