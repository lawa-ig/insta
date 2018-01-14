CREATE DATABASE lawa_db;

\connect lawa_db;

CREATE TABLE users (
  user_id SERIAL,
  email VARCHAR(30) NOT NULL,
  password VARCHAR(30),
  fb_id VARCHAR(30),
  fb_name VARCHAR(30),
  fb_token VARCHAR(30),
  name VARCHAR(30) NOT NULL,
  description VARCHAR(500),
  prof_pic VARCHAR(500),
  created_at TIMESTAMP NOT NULL,
  PRIMARY KEY (user_id)
);

CREATE TABLE followers (
  follow_id SERIAL,
  followed_user INT NOT NULL,
  following_user INT NOT NULL,
  created_at TIMESTAMP NOT NULL,
  PRIMARY KEY (follow_id),
  FOREIGN KEY (followed_user) REFERENCES users(user_id),
  FOREIGN KEY (following_user) REFERENCES users(user_id)
);

CREATE TABLE posts (
  post_id SERIAL,
  img VARCHAR(200) NOT NULL,
  like_count INT default 0,
  user_id INT NOT NULL,
  caption VARCHAR(200),
  created_at TIMESTAMP NOT NULL,
  PRIMARY KEY (post_id),
  FOREIGN KEY (user_id) REFERENCES users(user_id)
);

CREATE TABLE comments (
  comment_id SERIAL,
  user_id INT NOT NULL,
  post_id INT NOT NULL,
  created_at TIMESTAMP NOT NULL,
  text VARCHAR(200),
  PRIMARY KEY (comment_id),
  FOREIGN KEY (user_id) REFERENCES users(user_id),
  FOREIGN KEY (post_id) REFERENCES posts(post_id)
);

CREATE TABLE likes (
  like_id SERIAL,
  user_id INT NOT NULL,
  post_id INT NOT NULL,
  created_at TIMESTAMP NOT NULL,
  PRIMARY KEY (like_id),
  FOREIGN KEY (user_id) REFERENCES users(user_id),
  FOREIGN KEY (post_id) REFERENCES posts(post_id)
);
