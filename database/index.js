const pg = require('pg');

const connection = process.env.DATABASE_URL || 'postgres://localhost:3000/lawadb';
const client = new pg.Client(connection);
client.connect();

//get all users following
const getUsersFollowing = function(callback) {
 client.query('SELECT * FROM users', function(error, results) {
 		if (error) {
 			console.log('select all users error')
 		} else {
 			console.log('select all users success')
 			callback(results);
 		}
	});
}

//get user followers
const getUserFollowers = function(user, callback) {
	client.query('SELECT name FROM users WHERE  ', function (error, results) {
		if (error) {
			console.log('select get user followers fail')
		} else {
			console.log('select get user followers success')
			callback(results);
		}
	})
}

//get all posts following
const getAllPosts = function (userId, callback) {
	client.query('SELECT posts.post_id, posts.img, posts.like_count, posts.user_id, posts.caption, posts.created_at FROM \
		posts INNER JOIN followers ON followers.following_user = (?) AND \
		followers.followed_user = posts.user_id', userId, function (error, results) {
		if (error) {
			console.log('select all posts fail')
		} else {
			console.log('select all posts success')
			callback(results);
		}
	});
}

const getPostsLiked = function (userId, postsIdArray, callback) {
	client.query('SELECT likes.post_id FROM likes INNER JOIN posts ON posts.post_id = likes.post_id AND likes.user_id = (?) WHERE likes.post_id IN (?)', userId, postsIdArray, function (error, results) {
		if (error) {
			console.log('get posts liked fail')
		} else {
			console.log('get posts liked success')
			callback(results);
		}
	});
}

//get user following

//get post likes

//get like number






//db functions here