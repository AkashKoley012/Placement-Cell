# Placement Cell
## Task
1. Team Career Camp wants to maintain a database of all the student interviews [only for their own
use], for this they store the following details:
```sh
Batch
Student Details (including college, status: [placed, not_placed])
Course Scores (including DSA Final Score, WebD Final Score, React Final Score)
Interviews (including company name and Date)
Results (this is a mapping between company, and student, contains result: [PASS, FAIL, On Hold, Didn’t Attempt])
```
2. Pages
```sh
Sign Up and Sign In only for employees
List of students + add new student (this is similar to adding and viewing posts in codeial)
List of Interviews + form to create an interview (with date)
    - Allocate a student to an interview
    - Select an interview to view the list of all students and mark a result status from the list page itself
```
3. Download a complete CSV of all the data with the following columns
```sh
Student id, student name, student college, student status, DSA Final Score, WebD Final Score, React Final Score, interview date, interview company, interview student result
A student can have multiple entries based on the interviews she/he has given.
```

## How to setup on local machine
1. To use this repository your machine should have [node](https://nodejs.org/en/), npm, [monogodb](https://docs.mongodb.com/manual/installation/) and [git](https://git-scm.com/downloads). to check version exicute these.
```go
node --version
npm --version
git --version
```
2. Now clone this repository
```go
git clone https://github.com/AkashKoley012/Placement-Cell.git
```
3. Change directory to Placement-Cell
```go
cd Employee-Management-System
```

3. Install dependencies
```go
npm install 
```
4. That's... it  run the application
```go
npm start
```
## File structure
here you are looking at directory structure with root level files only.
```sh
Employee-Review-System
├── assets
│   ├── images
│   ├── js
├── node-modules
├── config
├── controllers
├── index.js
├── models
├── package-lock.json
├── package.json
├── readme.md
├── routers
└── views
    └── partials
```

