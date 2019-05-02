CREATE TABLE post (
    id SERIAL,
    content VARCHAR(500),
    created TIMESTAMP NOT NULL,
    creator SERIAL,
    PRIMARY KEY (id),
    FOREIGN KEY (creator) REFERENCES "user"
);
