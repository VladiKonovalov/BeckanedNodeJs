 CREATED by Vladi Konovalov
 -------------------------------------
 this is a short  Project that I create with Nodejs that connected to MongoDb
 
 this API have 7 function :
 SignUp , Login 
 Create Task,View Task View Tasks, Edit Task ,Delete Task
 
- User can be admin or regular user.
- Admin - can edit, delete and read all tasks
- Regular user - can read, edit and delete his tasks


if you decide to download it and use it localy you must
1)in File  "Server.js"  change the 3 line to :
const port =3000;

2)register to MongoDB and create user and change the line number 10 to ypur link

3)create local file ".env" and declare there your
env.MONGO_USERNAME
env.MONGO_PASSWORD
