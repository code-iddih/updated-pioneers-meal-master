# Meal Master

## Overview

Meal Master is a React application that allows users to explore various meal categories, view recipes, and manage their meal plans. The app fetches data from a local db.json file using json-server for a fast and simple backend solution.

## GROUP NAME : PIONEERS

### Group members :

1. Alexandar Karanja
2. Nonzamo Mwende
3. Melchior Balthazar
4. Eric Nyamwaya

## Features

Category List: Browse different meal categories.\
Category Detail: View meals under a specific category.\
Recipe Details: View detailed recipes including ingredients and instructions.\
Search: Search for recipes or categories.\
User Profile: View and manage user profile information.\
Meal Plan: Plan your meals using a calendar interface.\
Feedback Form: Submit feedback about the app.\
Login: User login functionality.\

## Setup Instructions.

### Prerequisites.

Node.js and npm installed on your machine.\
json-server for serving the local db.json file.\

## Installation
Clone the Repository:

Copy code.\
git clone https://github.com/code-iddih/pioneers-meal-master\
cd Meal-Master\
Install Dependencies:\

Copy code
npm install

Start json-server:

In a separate terminal window, start the json-server to serve db.json:

Copy code
npx json-server --watch db.json --port 5000
Run the Development Server:

Start the React development server:

Copy code
npm start
This will launch the app in your default browser, typically accessible at http://localhost:3000.

## Development

To contribute to the project or make changes:

Create a New Branch:

Copy code
git checkout -b feature/your-feature
Make Changes and Commit:

Copy code
git add .
git commit -m "Describe your changes"
Push to GitHub:

Copy code
git push origin feature/your-feature
Create a Pull Request:

Go to the GitHub repository and open a new pull request.

## Troubleshooting
No Recipes Displayed: Ensure that json-server is running and the API endpoint is correct.
Search Not Working: Verify that the search logic in Search.js matches the structure of your db.json.
License
This project is licensed under the MIT License - see the LICENSE file for details.



