CREATE TABLE account(
  user_id TEXT
  , password TEXT
  , nickname TEXT
  , comment TEXT
  , PRIMARY KEY (user_id)
);

INSERT
INTO account(user_id,
  password,
  nickname,
  comment)
VALUES ('TaroYamada', 'PaSSwd4TY', 'たろー', '僕は元気です');
