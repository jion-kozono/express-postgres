import express, { json, urlencoded } from 'express';
const app = express()
app.use(json())
app.use(urlencoded({ extended: true }))

import { client } from './db/pool.js';
client.connect();

app.post('/signup', async(req, res) => {
  const userId = req.body.user_id;
  const password = req.body.password;

  // TODO: userIdとpasswordのバリデーション

  // 既存のuser_idがある場合はエラー
  const existedUser = await getUser(userId)
  if (existedUser){
    const response = {
      message: "Account creation failed",
      cause: "Already the user exists",
    }
    res.status(400).send(response)
    return
  }

  const query = {
    text: "INSERT INTO account (user_id, password, nickname, comment) VALUES($1, $2, '', '')",
    values: [userId, password],
  };
  client.query(query).then(() => {
    const response = {
      message: "Account successfully created",
      user: {
        user_id: userId,
      }
    }
    res.status(200).send(response)
  }).catch(e => {
    console.error(e)
    const response = {
      message: "Account creation failed",
      cause: "DB Error",
    }
    res.status(400).send(response)
  })
});

app.get('/users', async(req, res) => {
  const userId = req.query.user_id;
  const user = await getUser(userId)
  if (user){
    const response = {
      message: "Account found",
      user: {
        user_id: userId,
        nickname: user.nickname
      }
    }
    res.status(200).send(response)
  }else{
    const response = {
      message: "Account not found",
    }
    res.status(400).send(response)
  }
});

const port = 3000;
app.listen(port, () => console.log(`Example app listening on port ${port}!`));

const getUser = async(userId) => {
  const query = {
    text: "SELECT * FROM account WHERE user_id = $1",
    values: [userId],
  };
  const result = await client.query(query)
  return result.rows[0]
}
