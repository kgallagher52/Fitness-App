# All-N-All-Fitness

# Users

1. name
 
2. email

3. password

4. Confirm Password

# Message

1. name
 
2. id

3. message

4. profileImg


# API

| *Name*        | *Method*      | *Path*               |
| -------------:|:-------------:| --------------------:|
| Retrieve      | GET           | /users/email         |
| Retrieve      | GET           | /session             |
| Retrieve      | GET           | /messages            |
| Retrieve      | GET           | /comments            |
| Create        | POST          | /users               |
| Create        | POST          | /session             |
| Create        | POST          | /messages            |
| Create        | POST          | /comments            |
| Upadate       | PUT           | /users/profileImg    |
| Upadate       | PUT           | /messages/message    |
| Upadate       | PUT           | /comments/commentId  |
| Delete        | DELETE        | /session             |
| Delete        | DELETE        | /message/id          |
| Delete        | DELETE        | /comment/id          |
| -------------:|:-------------:| --------------------:|

# User-Schema
  name: String, 
  email: String, 
  pw: String,

# Message-Schema
  name: String, 
  id: String, 
  message: String, 
  profileImg: String
  date: String,

# Comment-Schema
  name: String, 
  postId: String, 
  userId: String,
  comment: String, 
  image: String,
  date: String

# Other Resources

1. Node

2. Vue

3. Express

4. MongoDb

5. Mongoose

6. Vue ClI

7. Mlab

8. Heroku

9. passport

10. bctypt

