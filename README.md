1. Install dependencies: npm install


Running the Application
Start the application using the following command: npm start

Project Structure
Briefly describe the project structure and organization.

API Endpoints-

*(FOR POST AND PUT METHODS USE THE BODY IN JSON FORMAT)
*(EXCEPT THE REGISTRATION AND LOGIN ALL API REQURIED THE "Authorization" HEADER WITH THE TOKEN FROM THE LOGIN.)

POST Method- (http://localhost:3000/register) - for user registration

POST Method-(http://localhost:3000/login) - for user login

POST Method-(http://localhost:3000/user/:userId/task/create) - user can create task
note- use this format for date (24-09-2023)

GET Method- (http://localhost:3000/user/:userId/tasks) - user can can get all the task which are avilable 

GET Method- (http://localhost:3000/user/:userId/task/:taskId) - user can find all own tasks

PUT Method- (http://localhost:3000/user/:userId/task/:taskId) - user can update task details including title, description, due date, status etc.

Delete Method- (http://localhost:3000/user/:userId/task/:taskId) - user can delete tasks
