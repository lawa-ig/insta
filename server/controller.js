const app = require('./index.js');
const db = require('../database/index.js');
const AWS = require('aws-sdk');
const moment = require('moment');
const config = ''//require('./config.js');

AWS.config.update({
  accessKeyId: process.env.AWS_ACCESS_KEY_ID || config.AWS_ACCESS_KEY_ID || '',
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY || config.AWS_SECRET_ACCESS_KEY || '',
  region: 'us-west-1'
});

const s3 = new AWS.S3();

module.exports = {

  respondOptions: function(req, res) {
    res.set(headers).sendStatus(200);
  },

  usersFollowing: function(req, res) {
    db.getUsersFollowing(1) //CURRENTLY HARD CODED USER ID, change to req.body
      .then((results) => {
        res.json(results.rows);
      })
      .catch((err) => {
        console.log('getUsersFollowing had an error', err);
      });
  },
  fbLogin: function(req, res) {
    db.checkForUser(res.body.id)
      .then((results) => {
        let user = results.rows;
        if (user.length === 0) {
          let newUser = {
            'id': res.body.id,
            'displayName': res.body.displayName,
            'photo': res.body.photos[0].value
          };
          db.insertNewFbUser(newUser)
            .then(res.sendStatus(201))
            .catch((err) => {
              console.log('insert new fb user had an error', err);
            });
        }
      })
0
  },
  usersFollowers: function(req, res) {
    db.getUsersFollowers(1) //CURRENTLY HARD CODED USER ID, change to req.body
      .then((results) => {
        res.json(results.rows);
      })
      .catch((err) => {
        console.log('getUsersFollowers had an error', err);
      });
  },
 
  renderFeed: function(req, res) {
    console.log('here is req', req.body);
    db.getAllPosts(req.body.userId) //CURRENTLY HARD CODED USER ID, change to req.body
      .then((results) => {
        let posts = results.rows;
        db.getPostsLiked(1)
          .then((likeResult) => {
            let likedPosts = likeResult.rows.map(result => { return result.post_id; });
            posts.forEach(post => {
              likedPosts.includes(post.post_id) ? post.liked = false : post.liked = true;
            });
            res.json(posts);
          });
      })
      .catch((err) => {
        console.log('feed had an error', err);
      });
  },
  feed: function(req, res) {
    console.log('request', req.body.email);
    db.checkForEmail(req.body.email)
    .then((results) => {
      console.log('results', results.rows);
    db.getAllPosts(results.rows[0].user_id) //CURRENTLY HARD CODED USER ID, change to req.body
      .then((results) => {
        console.log('more results', results)
        let posts = results.rows;
        db.getPostsLiked(1)
          .then((likeResult) => {
            let likedPosts = likeResult.rows.map(result => { return result.post_id; });
            posts.forEach(post => {
              likedPosts.includes(post.post_id) ? post.liked = false : post.liked = true;
            });
            res.json(posts);
          });
      })
    })
      .catch((err) => {
        console.log('feed had an error', err);
      });
  },
  FBfeed: function (req, res) {
    console.log('request', req.body.id);
    db.checkForFbId(req.body.id)
      .then((results) => {
        console.log('results', results.rows);
        db.getAllPosts(results.rows[0].user_id) //CURRENTLY HARD CODED USER ID, change to req.body
          .then((results) => {
            console.log('more results', results)
            let posts = results.rows;
            db.getPostsLiked(1)
              .then((likeResult) => {
                let likedPosts = likeResult.rows.map(result => { return result.post_id; });
                posts.forEach(post => {
                  likedPosts.includes(post.post_id) ? post.liked = false : post.liked = true;
                });
                res.json(posts);
              });
          })
      })
      .catch((err) => {
        console.log('feed had an error', err);
      });
  },
 
  insertPost: function(req, res) {
    let timestamp = moment().format();
    let fileName = `images/${ req.body.userId }-${ timestamp.toString().split(' ').join('+') }${ req.file.originalname.slice(-4) }`;
    s3.putObject({
      Bucket: 'lawa-ig',
      Key: fileName,
      Body: req.file.buffer,
      ACL: 'public-read',  
    }, (err, result) => {
      if (result) {
        db.insertPost(req.body.caption, req.body.userId, fileName, timestamp) 
          .then((result) => {
            console.log(result);
            res.json({
              post_id: 0, // not actual postID, temp placeholder
              img: `${AWSUrl}${userId}-${encodeURIComponent(timestamp)}${fileName.slice(-4)}`,
              like_count: 0,
              user_id: req.body.userId,
              caption: req.body.caption,
              createdAt: timestamp
            });
          })
          .catch(err => {
            console.log('insertPost had an error');
          });
      }
    });

  },
  //for autocomplete search bar
  allUserNames: function(req, res) {
    db.getAllUsernames()
      .then(allUserNames =>{
        let profileNames = allUserNames.rows.map(profileName => {
          return {'name': profileName.user_id, 'label': profileName.name};
        });
        res.json(profileNames);
      });
  }, 
  switchUser: function(req, res) {
    console.log('req in controller', req.body.email);
    db.checkForEmail(req.body.email)
      .then(result => {
        res.json(result.rows[0].user_id);
      })
      .catch(error => {
        console.log('error switching users good sir', error);
      })
  },
  //for profile page view
  currentUserProfile: function(req, res) {
    
    userId = req.body.username;

    db.getUserProfile(userId)
      .then(currentUserProfile => { 
        var currentUserProfile = currentUserProfile.rows[0];
        db.getUserPosts(userId)
          .then(currentUserPosts => {     
            currentUserProfile.posts = currentUserPosts.rows;
            db.getUsersFollowing(userId)
              .then(usersFollowing => {
                currentUserProfile.following = usersFollowing.rows;
                db.getUsersFollowers(userId)
                  .then(usersFollowers => {
                    currentUserProfile.followers = usersFollowers.rows;
                    res.json(currentUserProfile);
                  });
              });
          });
      });
  },

  changeComment: function(req, res) {
    if (req.body.status === 'addComment') {
      db.addComment(req.body.userId, req.body.postId, req.body.text)
        .then(res.status(201).send('Comment Added'));
    } else if (req.body.status === 'rmComment') {
      db.rmComment(req.body.commentId)
        .then(res.status(201).send('Comment Removed'));
    } 
  },
  changeLike: function(req, res) {
    if (req.body.status === 'checkLike') {
      db.checkLike(req.body.userId, req.body.postId)
        .then(data => res.status(201).json(data));
    } else if (req.body.status === 'getAllLikes') {
      db.getLikesOnPost(req.body.postId)
        .then(data => res.status(201).json(data));
    } else if (req.body.status === 'addLike') {
      db.addLike(req.body.userId, req.body.postId)
        .then(res.status(201).send('Liked!'));
    } else if (req.body.status === 'rmLike') {
      db.rmLike(req.body.userId, req.body.postId)
        .then(res.status(201).send('Unliked!'));
    }
  },

  changeFollow: function(req, res) {
    if (req.body.status === 'checkFollow') {
      db.checkFollow(req.body.followerId, req.body.followedId)
        .then(data => res.status(201).json(data));
    } else if (req.body.status === 'addFollow') {
      db.addFollow(req.body.followerId, req.body.followedId)
        .then(res.status(201).send('Followed!'));
    } else if (req.body.status === 'rmFollow') {
      db.rmFollow(req.body.followerId, req.body.followedId)
        .then(res.status(201).send('Unfollowed!'));
    } 
  },
  
  getComments: function(req, res) {
    db.getAllCommentFromPost(req.body.postId)
      .then((comments) => {
        let allComments = comments.rows.map(comment => {
          return {'id': comment.comment_id, 'name': comment.name, 'text': comment.text};
        });
        res.json(allComments);
      });
  },

  uploadProfImg: function(req, res) {
    let timestamp = moment().format();
    const AWSUrl = 'https://s3-us-west-1.amazonaws.com/lawa-ig/images/'
    let fileName = `images/${req.body.userId}-${timestamp.toString().split(' ').join('+')}${req.file.originalname.slice(-4)}`;
    s3.putObject({
      Bucket: 'lawa-ig',
      Key: fileName,
      Body: req.file.buffer,
      ACL: 'public-read', // your permisions  
    }, (err, result) => {
      if (result) {
        db.updateProfImg(req.body.userId, fileName, timestamp) //req.body.userId
          .then(res.json(`${AWSUrl}${req.body.userId}-${ encodeURIComponent(timestamp)}${fileName.slice(-4)}`))
          .catch(err => {
            console.log('insertPost had an error');
          });
      } else {
        console.log('upload to S3 failed', err);
      }
    });
    },

    updateDescription: function(req, res) {
      db.updateDescription(req.body.user, req.body.description)
        .then(() => {
          res.sendStatus(201);
        });
    }
};
