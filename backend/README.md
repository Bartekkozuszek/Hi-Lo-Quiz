# Backend

Web server with "rest" api for high-low questions.

### Live Server

http://testnode-env.8dhjre8pre.eu-central-1.elasticbeanstalk.com/api/v1/questions

### Api Documentation

> **WARNING:** address parameters are case sensitive atm

##### GET /api/v1/questions

###### Examples

```
/api/v1/auestions?amount=5
/api/v1/questions?amount=1&author=Hjalmar
/api/v1/questions?amount=2&category=Geography
/api/v1/questions?author=Bartek%20Kozuszek&amount=2&category=Geography
```

- Returns all questions
- If guest or non-admin, only questions that are approved will be returned
- Valid address parameters are:
  - amount
  - category
  - author

---

##### GET /api/v1/questions/id

###### Examples

```
/api/v1/questions/5cdacda55506547668c200a4
```

- Returns question based on id

---

##### POST /api/v1/questions

###### Examples

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

- Add question
- Send a json object in body
- author is set to logged in user name
- approved is set to true or false depending on admin or not
- Required fields
  - question : string
  - answer : number
- optional fields
  - high : number
  - low : number
  - learnMore : string
  - userSubmitted  : bool
  - imageUrl : string

---

##### PUT /api/v1/questions/id

###### Examples

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
