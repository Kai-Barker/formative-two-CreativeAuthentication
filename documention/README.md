
# Great Minds Technologies - Hit Me Up

The Hit Me Up page is a bold, dark-humored contact and service page for the fictional Hitman site. It allows users to sign up or log in to their account in order to book a hitman or purchase weapons. The page is designed with an edgy, underground aesthetic to match the theme, while maintaining clean layout and functionality. It's the gateway for users to enter the darker side of business—discreet, direct, and deadly efficient.
## Features

#### [User Authentication](https://drive.google.com/file/d/1GDPLpWfwR1_LXFcudjPadTlC7BAxB8dm/view?usp=sharing)
Users can create an account or log in securely to access services. [Breakdown Video](https://drive.google.com/file/d/1GDPLpWfwR1_LXFcudjPadTlC7BAxB8dm/view?usp=sharing)

#### Product Viewing
Logged-in users can view available weapons or hitman services with details and pricing.

#### Dark-Themed UI
A sleek, underground-inspired design that matches the hitman aesthetic.

#### Modular Code Structure
Built with reusable components for easy scalability and maintenance.

#### Route Navigation
Smooth navigation using react-router-dom for different sections of the site.





## Deployment

To deploy this project - make sure you are in the frontend folder

```bash
   cd frontend
```
then 

```bash
  npm install 

```
lastly
```bash
  npm start
```

Then open a new terminal and follow these steps - making sure you are in the backend folder

```bash
   cd backend
```
then 

```bash
  npm install 

```
lastly
```bash
  npm start
```





## Technology used

Frontend: 

React, React Router

API: Perenual API for plant data

HTTP Requests: Axios (for fetching data)
Frontend:

React.js – Component-based UI framework

React Router – Client-side routing

JavaScript (ES6+) – Modern syntax and features

CSS – Custom styles for layout and design

Bootstrap – Responsive layout and components

React-Bootstrap – Bootstrap components as React components

Backend:

Node.js – JavaScript runtime

Express.js – Web application framework

Authentication & Security:

bcrypt – Password hashing

JWT (JSON Web Token) – Token-based authentication

Express-session (if used) – Session management

Database:

MongoDB – NoSQL database for user and product data

Mongoose – ODM for MongoDB


## Documentation

This project is built with clear and well-structured code to help you understand its functionality. The frontend uses React components that handle user interactions, while the backend is powered by Node.js and Express to manage API routes and authentication. User credentials are securely stored with hashing using bcrypt, and JWT is used for session management. The MongoDB database stores user and product data. 
## Contributing


We welcome contributions to this project. Feel free to:

Fork the repository.

Create a new branch (git checkout -b feature-name).

Commit your changes (git commit -am 'Add feature').

Push to the branch (git push origin feature-name).

Create a new Pull Request.

## API response 

The API returns data in the form of a JSON object that includes the requested information along with relevant metadata such as success status and descriptive messages. This consistent response structure ensures easy handling of data across various endpoints like authentication, product retrieval, and user actions. The frontend can reliably parse these objects to update the UI and provide feedback to users.

