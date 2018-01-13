import React from 'react';
import { Comment} from 'semantic-ui-react';
import FeedGrid from './feed_grid.jsx';

const OneFeed = (props) => (
	<div className="ui card">
	  <div className="content">
	    <img className="ui avatar image" src="./assets/fred.png"/>Fred
	  </div>
	  <div className="image">
	    <img src={props.photo}/>
	  </div>
	  <div className="content">
	    <span className="left floated">
	      <i className="heart outline like icon"></i>
	      <i className="comment icon"></i>
	    </span><br/>
	    <div className="likes">17 likes</div><br/>
	    <div className="comments">
	  		<Comment.Text className='modal-author' as='a'>Albert</Comment.Text>
      	<Comment.Text className='modal-comment'>How artistic!</Comment.Text><br />
	  	</div>
	    <div className="left floated meta">14h</div>
	  </div>
	  <div className="extra content">
	    <div className="ui large transparent left icon input">
	      <i className="heart outline icon"></i>
	      <input type="text" placeholder="Add Comment..."></input>
	    </div>
	  </div>
	</div>
);

class OneFeed extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			comments: []
		}
	}

	componentDidMount() {
		this.loadComments(this.props.post);
	}

	loadComments(postId) {
		console.log(postId);
		axios.post('/comments', {postId: postId})
			.then((response) => {
				console.log('axios load comment success', response)
			})
			.catch((error) => {
				console.log('axios load comment error', error)
			})
	}

	render () {
		return (
			<div className="ui card">
			  <div className="content">
			    <img className="ui avatar image" src="./assets/fred.png"/>{this.props.name}
			  </div>
			  <div className="image">
			    <img src={this.props.img}/>
			  </div>
			  <div className="content">
			    <span className="left floated">
			      <i className="heart outline like icon"></i>
			      <i className="comment outline icon"></i>
			    </span><br/>
			    <div className="likes">{this.props.likes}</div><br/>
			    <div className="userCaption">{this.props.name}</div>
			    <div className="caption">{this.props.caption}</div><br />
			    <div className="comments">
			    	<Comment post={this.props.post} />
			  	</div>
			    <div className="left floated meta">14h</div>
			  </div>
			  <div className="extra content">
			    <div className="ui large transparent left icon input">
			      <i className="heart outline icon"></i>
			      <input type="text" placeholder="Add Comment..."></input>
			    </div>
			  </div>
			</div>
		)
	}
}


export default OneFeed;

