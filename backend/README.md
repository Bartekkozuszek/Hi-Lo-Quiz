
# Backend

Web server with "rest" api for high-low questions.

### Live Server

http://testnode-env.8dhjre8pre.eu-central-1.elasticbeanstalk.com/api/v1/questions

## Docs - /api/v1/questions

> **WARNING:** address parameters are case sensitive atm

### GET /api/v1/questions

```
/api/v1/auestions?amount=5
/api/v1/questions?amount=1&author=Hjalmar
/api/v1/questions?amount=2&category=Geography
/api/v1/questions?author=Bartek%20Kozuszek&amount=2&category=Geography
```

      Returns all questions
      If guest or non-admin, only questions that are approved will be returned
      Valid address parameters are:
         amount : number
         category : string
         author : string
         userSubmitted : bool
         reviewedBy : string

---

### GET /api/v1/questions/id

```
/api/v1/questions/5cdacda55506547668c200a4
```

- Returns question based on id

---

### POST /api/v1/questions

```
/api/v1/questions/
{
  "answer": 1000,
  "category": "Geography",
  "high": 3000,
  "learnMore": "https://www.example.com",
  "low": 1,
  "question": "How many is something?"
}
```

      Add question
      Send a json object in body
      author is set to logged in user name
      approved is set to true or false depending on admin or not
      Required fields
         question : string
         answer : number
      optional fields
         high : number
         low : number
         category : string
         learnMore : string
         imageUrl : string
         author : string

---

### PUT /api/v1/questions/id

```
/api/v1/questions/5cdacda55506547668c200a4
{
  "approved": true
}

/api/v1/questions/5cdacda55506547668c200a4
{
  "approved": true,
  "answer": 5
}

```

- Id of the question you want to edit
- Admin can edit any field
- Include the field you want to set a new value on

---

### DELETE /api/v1/questions/id

- Delete question based on id

---

### GET /api/v1/questions/categories

- Returns all categories

---

### GET /api/v1/questions/authors

- Returns all authors

---

## DOCUMENTATION - /api/v1/users

### GET /api/v1/users

- Returns all users

      Valid address parameters are 
      amount : Number
      sort : wins/losses/score

---

### GET /api/v1/users/id

- Return user for id

---

### GET /api/v1/users/score-rank/id

- Return rank for user based on id

---

### POST /api/v1/users

```
/api/v1/users/
{
  "userName": "Foo",
  "firstName": "Ccc",
  "lastName": "Ddd",
  "password": "mmmm",
  "isAdmin": false
}
```

- Add user

---

### PUT /api/v1/users/:id

```
/api/v1/users/id
{
  "firstName": "Ccc",
  "lastName": "Ddd",
  "isAdmin": false
}
```

- Logged in admin can edit firstName,lastName or isAdmin on any user

---

### DELETE /api/v1/users/:id

- Delete user

---

## DOCUMENTATION - /api/v1/bots

### GET /api/v1/bots

- Returns all bots

      Valid address parameters are 
      amount : Number
      sort : wins/losses

---

## DOCUMENTATION - /api/v1/games

### GET /api/v1/games

- Returns all games

---

### GET /api/v1/games/id

- Return specific game

---


### GET /api/v1/games/played

- Returns total games played

---

### POST /api/v1/games

- Add a game

```
game:{
   questionID: { type: String, required: true },
   userID: { type: String, required: false },
   score: { type: Number, required: false },
   botIDs: { type: Array, required: false },
   moves: { type: Array, required: true }
}
```

---


