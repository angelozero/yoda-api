const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('data.db');

const USER_SCHEMA = `
CREATE TABLE IF NOT EXISTS user (
    user_id INTEGER PRIMARY KEY AUTOINCREMENT, 
    user_name VARCHAR(30) NOT NULL UNIQUE, 
    user_email VARCHAR(255) NOT NULL, 
    user_password VARCAHR(255) NOT NULL,
    user_full_name VARCAHR(40) NOT NULL, 
    user_join_date TIMESTAMP DEFAULT current_timestamp
)
`;

const INSERT_DEFAULT_USER_1 = 
`
INSERT INTO user (
    user_name, 
    user_email,
    user_password,
    user_full_name
) SELECT 'angelo', 'angelof@ciandt.com', '123', 'Angelo' WHERE NOT EXISTS (SELECT * FROM user WHERE user_name = 'angelo')
`;

const INSERT_DEFAULT_USER_2 = 
`
INSERT INTO user (
    user_name, 
    user_email,
    user_password,
    user_full_name
) SELECT 'zero', 'zero@ciandt.com.br', '456', 'Zero' WHERE NOT EXISTS (SELECT * FROM user WHERE user_name = 'zero')
`;

const PHOTO_DROP_SCHEMA = 
`
DROP TABLE IF EXISTS photo 
`;

const PHOTO_SCHEMA = 
`
CREATE TABLE IF NOT EXISTS photo (
    photo_id INTEGER PRIMARY KEY AUTOINCREMENT,
    photo_post_date TIMESTAMP NOT NULL, 
    photo_url TEXT NOT NULL, 
    photo_description TEXT DEFAULT ('') NOT NULL, 
    photo_allow_comments INTEGER NOT NULL DEFAULT (1), 
    photo_likes BIGINT NOT NULL DEFAULT (0),
    user_id INTEGER,
    FOREIGN KEY(user_id) REFERENCES user(user_id) ON DELETE CASCADE 
)
`;


const CATPHOTO_DROP_SCHEMA = 
`
DROP TABLE IF EXISTS catphoto 
`;

const CATPHOTO_CREATE_SCHEMA = 
`
CREATE TABLE IF NOT EXISTS catphoto (
    catphotos_id INTEGER PRIMARY KEY AUTOINCREMENT,
    isfull BIGINT NOT NULL DEFAULT (0) 
)
`;

const INSERT_FALSE_CATPHOTO_TABLE = 
`
INSERT INTO catphoto (isfull)
VALUES(0);
`;

const COMMENT_SCHEMA =
`
CREATE TABLE IF NOT EXISTS comment (
    comment_id INTEGER   PRIMARY KEY AUTOINCREMENT,
    comment_date TIMESTAMP NOT NULL,
    comment_text TEXT  DEFAULT (''),
    photo_id INTEGER,
    user_id INTEGER,
    FOREIGN KEY (photo_id) REFERENCES photo (photo_id) ON DELETE CASCADE,
    FOREIGN KEY(user_id) REFERENCES user(user_id) ON DELETE CASCADE 
);
`;

const LIKE_SCHEMA = `
CREATE TABLE IF NOT EXISTS like (
    like_id INTEGER PRIMARY KEY AUTOINCREMENT, 
    photo_id INTEGER,
    user_id  INTEGER,
    like_date TIMESTAMP DEFAULT current_timestamp, 
    UNIQUE(user_id, photo_id ),
    FOREIGN KEY (photo_id) REFERENCES photo (photo_id) ON DELETE CASCADE,
    FOREIGN KEY(user_id) REFERENCES user(user_id) ON DELETE CASCADE
)
`;

db.serialize(() => {
    db.run("PRAGMA foreign_keys=ON");
    db.run(USER_SCHEMA);
    db.run(INSERT_DEFAULT_USER_1);
    db.run(INSERT_DEFAULT_USER_2);
    db.run(PHOTO_DROP_SCHEMA);  
    db.run(PHOTO_SCHEMA);
    db.run(CATPHOTO_DROP_SCHEMA);
    db.run(CATPHOTO_CREATE_SCHEMA);        
    db.run(INSERT_FALSE_CATPHOTO_TABLE);    
    db.run(COMMENT_SCHEMA);     
    db.run(LIKE_SCHEMA);        

    db.each("SELECT * FROM user", (err, user) => {
        console.log('Users');
        console.log(user);
    });
});

process.on('SIGINT', () =>
    db.close(() => {
        console.log('Database closed');
        process.exit(0);
    })
);

module.exports = db;