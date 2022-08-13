## Work Order Management System 

Work Order Management System is a website for an appliance repair company. 
It allows customers to leave service requests and allows technicians to manage requests, assign appointments and request statuses. 


### Stack of Technologies

- Backend programming languages: Javascript 
- Backend: Node.JS
- Backend Frameworks: Express.js, Mongoose 
- Database: MongoDB
- Frontend programming languages: HTML, CSS, Javascript
- Frontend frameworks: Bootstrap.js

### How to configure

1. Clone the project to your computer
2. Make a copy `.env.example` and rename it to `.env`
3. Open `.env` and add a connection string to MongoDB, password secret and JWT secret
4. Run `npm install` and wait till all packages are installed
5. Run `npm strat` to start the server

### Customer workflow

When a customer opens a website, they are landed to the home page which contains information about the company and a button to leave a request
Top menu contains the following options: Home, Contact Us, Login and Sign up. 
The Contact Us page contains information about the company and also a contanct form which allows to send a message
To leave a request a customer need to Sign up on the website by providing the following information: first name, last name, email and a password. 
Once registered a customer can login by providing their email and a passwrod 
Once logged in they can leave a new service request by providing their name, address, phone number, detailed description and also include their availability for an appointment.  In addition a user can view a list of their requests.

### Technician workflow

The technician has same features as a customer several extra features
- They can view requests from all users and also modify them by confirming appointments and changing status of requests (for example: confirmed, canceled and more)
- They can see a list of messages which users left on the contanct form

### Future goals

- add a calendar of appointments and allow technicians to view it 
- suggest appoitments slots based on technician availability
- add more roles and limit access for technicians to orders assigned to them
