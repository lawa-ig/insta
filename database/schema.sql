CREATE DATABASE lawa_db;

\connect lawa_db;

CREATE TABLE users (
  user_id SERIAL,
  email VARCHAR(30) NOT NULL,
  password VARCHAR(30) NOT NULL,
  fb_id VARCHAR(30) NOT NULL,
  fb_name VARCHAR(30) NOT NULL,
  fb_token VARCHAR(30) NOT NULL,
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

-- USERS TABLE DATA
INSERT into users (email, password, fb_id, fb_name, fb_token, name, description, prof_pic, created_at) VALUES ('albert@testing.org', 'password!!!', 'some FB ID', 'some FB name', 'some FB token', 'Albert Wong', 'whatup its albert', 'https://media.licdn.com/mpr/mpr/shrinknp_200_200/AAEAAQAAAAAAAAWZAAAAJDU1ZWRlMGViLTU5M2UtNGM3Ni1iOTU5LWUwMmNiNjQzZmQ1ZQ.jpg', '1000-01-01 00:00:00.000000');
INSERT into users (email, password, fb_id, fb_name, fb_token, name, description, prof_pic, created_at) VALUES ('larry@githell.com', 'password!!!', 'some FB ID', 'some FB name', 'some FB token', 'Larry Chang', 'meow', 'https://upload.wikimedia.org/wikipedia/commons/7/77/Avatar_cat.png', '1000-01-01 00:00:00.000000');
INSERT into users (email, password, fb_id, fb_name, fb_token, name, description, prof_pic, created_at) VALUES ('wsputnam@wustl.edu', 'password!!!', 'some FB ID', 'some FB name', 'some FB token', 'Will Putnam', 'Volcano life', 'https://www.thesun.co.uk/wp-content/uploads/2017/02/nintchdbpict0002990093241.jpg?strip=all&w=960', '1000-01-01 00:00:00.000000');
INSERT into users (email, password, fb_id, fb_name, fb_token, name, description, prof_pic, created_at) VALUES ('aaron@hackreactor.com', 'password!!!', 'some FB ID', 'some FB name', 'some FB token', 'Aaron Pietsch', 'I love code', 'https://media.licdn.com/mpr/mpr/shrinknp_200_200/AAIA_wDGAAAAAQAAAAAAAAopAAAAJDY5ZTRkYjlhLTM5OTEtNDZhYS1iNGM4LTRmZTk5NmI0MzFlYw.jpg', '1000-01-01 00:00:00.000000');

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
INSERT into posts (img, like_count, user_id, caption, created_at) VALUES ('http://www.econlib.org/library/Columns/y2017/img_dec/windingroad.jpeg', 8, 1, 'my favorite road', '1000-01-01 00:00:00.000000');
INSERT into posts (img, like_count, user_id, caption, created_at) VALUES ('http://www.islandroads.com/images/content/pageicon_home_1503325159.jpg', 7, 1, 'this one is nice too', '1000-01-01 00:00:00.000000');
INSERT into posts (img, like_count, user_id, caption, created_at) VALUES ('https://files.brightside.me/files/news/part_20/208855/4021355-greatoceanroad-1469724164-650-326a60f37a-1491916026.jpg', 12, 1, 'beautiful pavement~!', '1000-01-01 00:00:00.000000');

INSERT into posts (img, like_count, user_id, caption, created_at) VALUES ('http://cdn.shopify.com/s/files/1/0344/6469/files/Screen_Shot_2016-10-04_at_11.16.03_AM_large.png?v=1475594279', 18, 2, 'cute cat', '1000-01-01 00:00:00.000000');
INSERT into posts (img, like_count, user_id, caption, created_at) VALUES ('https://iheartcats.com/wp-content/uploads/2016/08/cat-1342923_640.jpg', 2, 2, 'adorable', '1000-01-01 00:00:00.000000');
INSERT into posts (img, like_count, user_id, caption, created_at) VALUES ('https://www.thepurringtonpost.com/wp-content/uploads/2017/06/cat-302286_960_720.jpg', 22, 2, 'very orange', '1000-01-01 00:00:00.000000');
INSERT into posts (img, like_count, user_id, caption, created_at) VALUES ('https://fthmb.tqn.com/WAIDFDxcQXrWbL0t_kzvptseuBs=/960x0/filters:no_upscale()/Red-cat-GettyImages-686824077-588265843df78c2ccde43647.jpg', 4, 2, 'so good!', '1000-01-01 00:00:00.000000');
INSERT into posts (img, like_count, user_id, caption, created_at) VALUES ('https://inspirationseek.com/wp-content/uploads/2014/08/Orange-Bengal-Cat-Pictures.jpg', 8, 2, 'Bengal cat', '1000-01-01 00:00:00.000000');
INSERT into posts (img, like_count, user_id, caption, created_at) VALUES ('https://orig00.deviantart.net/b04c/f/2010/166/a/d/orange_cat_by_ashleys_creations.jpg', 51, 2, 'this cat is mine', '1000-01-01 00:00:00.000000');

INSERT into posts (img, like_count, user_id, caption, created_at) VALUES ('http://www.scholastic.com/content/dam/teachers/collections/migrated-promotional-images/sparks_and_lava.jpg', 22, 3, 'awesome explosion', '1000-01-01 00:00:00.000000');
INSERT into posts (img, like_count, user_id, caption, created_at) VALUES ('http://jammulinks.news/admin_panel/media/semi/465534311220174053450.jpg', 42, 3, 'nice one', '1000-01-01 00:00:00.000000');

INSERT into posts (img, like_count, user_id, caption, created_at) VALUES ('http://permainanbandarq.com/wp-content/uploads/2018/01/1.jpg', 2, 4, 'code is dope', '1000-01-01 00:00:00.000000');
INSERT into posts (img, like_count, user_id, caption, created_at) VALUES ('https://cdn-images-1.medium.com/max/1600/1*rC9MtnBkVjJ53xaeIsH1sA.jpeg', 10, 4, 'my favorite language', '1000-01-01 00:00:00.000000');
INSERT into posts (img, like_count, user_id, caption, created_at) VALUES ('https://3.bp.blogspot.com/-Z6p-FfkoD_Y/U2KXMex_duI/AAAAAAAAbd8/fhinW_ARsCo/s1600/Anonymous-Hacker-Charged-with-CyberStalking.jpg', 5, 4, 'mr robot', '1000-01-01 00:00:00.000000');
INSERT into posts (img, like_count, user_id, caption, created_at) VALUES ('https://drugsandbadideas.com/images/black-hat-hacking-services-prices/hiring-anonymous-hackers.jpg', 4, 4, 'me at work', '1000-01-01 00:00:00.000000');


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