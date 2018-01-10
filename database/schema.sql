CREATE DATABASE lawa_db;

\connect lawa_db;

CREATE TABLE users (
  user_id SERIAL,
  name VARCHAR(30) NOT NULL,
  description VARCHAR(500),
  prof_pic VARCHAR(100),
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

-- USERS TABLE DATA
INSERT into users (name, description, prof_pic, created_at) VALUES ('Albert Wong', 'temp description', 'prof pic link', '1000-01-01 00:00:00.000000');
INSERT into users (name, description, prof_pic, created_at) VALUES ('Larry Chang', 'temp description', 'prof pic link', '1000-01-01 00:00:00.000000');
INSERT into users (name, description, prof_pic, created_at) VALUES ('Will Putnam', 'temp description', 'prof pic link', '1000-01-01 00:00:00.000000');
INSERT into users (name, description, prof_pic, created_at) VALUES ('Aaron Pietsch', 'temp description', 'prof pic link', '1000-01-01 00:00:00.000000');

-- FOLLOWERS TABLE DATA
INSERT into followers (followed_user, following_user, created_at) VALUES (1, 2, '1000-01-01 00:00:00.000000');
INSERT into followers (followed_user, following_user, created_at) VALUES (1, 3, '1000-01-01 00:00:00.000000');
INSERT into followers (followed_user, following_user, created_at) VALUES (2, 3, '1000-01-01 00:00:00.000000');
INSERT into followers (followed_user, following_user, created_at) VALUES (2, 4, '1000-01-01 00:00:00.000000');
INSERT into followers (followed_user, following_user, created_at) VALUES (3, 4, '1000-01-01 00:00:00.000000');
INSERT into followers (followed_user, following_user, created_at) VALUES (3, 1, '1000-01-01 00:00:00.000000');
INSERT into followers (followed_user, following_user, created_at) VALUES (4, 1, '1000-01-01 00:00:00.000000');
INSERT into followers (followed_user, following_user, created_at) VALUES (4, 2, '1000-01-01 00:00:00.000000');

-- POSTS TABLE DATA
INSERT into posts (img, like_count, user_id, caption, created_at) VALUES ('image url', 10, 1, 'test 1', '1000-01-01 00:00:00.000000');
INSERT into posts (img, like_count, user_id, caption, created_at) VALUES ('image url', 10, 2, 'test 2', '1000-01-01 00:00:00.000000');
INSERT into posts (img, like_count, user_id, caption, created_at) VALUES ('image url', 10, 3, 'test 3', '1000-01-01 00:00:00.000000');
INSERT into posts (img, like_count, user_id, caption, created_at) VALUES ('image url', 10, 4, 'test 4', '1000-01-01 00:00:00.000000');
INSERT into posts (img, like_count, user_id, caption, created_at) VALUES ('image url', 10, 1, 'test 1', '1000-01-01 00:00:00.000000');
INSERT into posts (img, like_count, user_id, caption, created_at) VALUES ('image url', 10, 2, 'test 2', '1000-01-01 00:00:00.000000');
INSERT into posts (img, like_count, user_id, caption, created_at) VALUES ('image url', 10, 3, 'test 3', '1000-01-01 00:00:00.000000');
INSERT into posts (img, like_count, user_id, caption, created_at) VALUES ('image url', 10, 4, 'test 4', '1000-01-01 00:00:00.000000');

-- COMMENTS TABLE DATA
INSERT into comments (user_id, post_id, text, created_at) VALUES (1, 2, 'sample comment text', '1000-01-01 00:00:00.000000');
INSERT into comments (user_id, post_id, text, created_at) VALUES (1, 3, 'sample comment text', '1000-01-01 00:00:00.000000');
INSERT into comments (user_id, post_id, text, created_at) VALUES (1, 4, 'sample comment text', '1000-01-01 00:00:00.000000');
INSERT into comments (user_id, post_id, text, created_at) VALUES (2, 5, 'sample comment text', '1000-01-01 00:00:00.000000');
INSERT into comments (user_id, post_id, text, created_at) VALUES (2, 6, 'sample comment text', '1000-01-01 00:00:00.000000');
INSERT into comments (user_id, post_id, text, created_at) VALUES (2, 7, 'sample comment text', '1000-01-01 00:00:00.000000');
INSERT into comments (user_id, post_id, text, created_at) VALUES (3, 8, 'sample comment text', '1000-01-01 00:00:00.000000');
INSERT into comments (user_id, post_id, text, created_at) VALUES (3, 2, 'sample comment text', '1000-01-01 00:00:00.000000');
INSERT into comments (user_id, post_id, text, created_at) VALUES (3, 3, 'sample comment text', '1000-01-01 00:00:00.000000');
INSERT into comments (user_id, post_id, text, created_at) VALUES (4, 1, 'sample comment text', '1000-01-01 00:00:00.000000');
INSERT into comments (user_id, post_id, text, created_at) VALUES (4, 2, 'sample comment text', '1000-01-01 00:00:00.000000');
INSERT into comments (user_id, post_id, text, created_at) VALUES (4, 3, 'sample comment text', '1000-01-01 00:00:00.000000');


-- LIKES TABLE DATA
INSERT into likes (user_id, post_id, created_at) VALUES (1, 2, '1000-01-01 00:00:00.000000');
INSERT into likes (user_id, post_id, created_at) VALUES (1, 3, '1000-01-01 00:00:00.000000');
INSERT into likes (user_id, post_id, created_at) VALUES (1, 4, '1000-01-01 00:00:00.000000');
INSERT into likes (user_id, post_id, created_at) VALUES (2, 1, '1000-01-01 00:00:00.000000');
INSERT into likes (user_id, post_id, created_at) VALUES (2, 3, '1000-01-01 00:00:00.000000');
INSERT into likes (user_id, post_id, created_at) VALUES (2, 4, '1000-01-01 00:00:00.000000');
INSERT into likes (user_id, post_id, created_at) VALUES (3, 1, '1000-01-01 00:00:00.000000');
INSERT into likes (user_id, post_id, created_at) VALUES (3, 2, '1000-01-01 00:00:00.000000');
INSERT into likes (user_id, post_id, created_at) VALUES (3, 4, '1000-01-01 00:00:00.000000');
INSERT into likes (user_id, post_id, created_at) VALUES (4, 1, '1000-01-01 00:00:00.000000');
INSERT into likes (user_id, post_id, created_at) VALUES (4, 2, '1000-01-01 00:00:00.000000');
INSERT into likes (user_id, post_id, created_at) VALUES (4, 3, '1000-01-01 00:00:00.000000');