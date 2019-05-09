CREATE TABLE post (
    id SERIAL,
    content VARCHAR(500),
    created TIMESTAMPTZ DEFAULT Now(),
    creator INT NOT NULL,
    PRIMARY KEY (id),
    FOREIGN KEY (creator) REFERENCES "user" ON DELETE CASCADE
);
