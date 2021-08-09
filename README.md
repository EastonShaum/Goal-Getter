# Goal Getter

## Description 

[Goal Getter](https://github.com/EastonShaum/Goal-Getter) is an app that helps you ACHIEVE your goals! Anything is possible when you make a plan with milestones and a date in mind! Simply create an account and get started on adding new goals!

## Table of Contents 

* [Installation](#installation)
* [Usage](#usage)
* [Tests](#test)
* [License](#license)
* [Credits](#credits)

## Installation
This installation process is for locally hosted clones of Goal Getter:
1. Ensure that you are able to create a new SQL Database (we used Sequeylize and MySQL2) 
2. Clone repository 
3. Open a new command line that is in the correct directory 
4. Run `npm i `
5. Navigate to the ".env EXAMPLE" file 
6. Edit the DB_USER and DB_PW values to match your SQL Server credentials. 
7. Rename the ".env EXAMPLE" file to ".env"
8. Return to your open command line, load the schema.sql to create the appropriate database and tables.

## Usage 
First you need to [create an account](https://goal-getters-app.herokuapp.com/signup)! After you have created your account you can create new goals, add milestones (sub-goals that help move you towards completing your larger goal), and view your progress. Once a goal is created you can edit the information within it. To complete a goal you need to mark each of the milestones associated with the goal as complete! Upon doing so a "Complete Goal" button will appear at the top of the goal page. By clicking that button your goal will be marked as complete and you will be able to find it in the Achievements page, which displays every goal that you have accomplished!

### Screenshot:
![image](https://user-images.githubusercontent.com/81572838/128648882-4ac37736-46c9-4716-9f50-a438dcee8ed1.png)  

## Test
To run the tests that were included in the repository enter the following command in the terminal: `npm run test`

## License
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
MIT License

Copyright © 2021 Goal Getter

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.

## Credits
### Assets
* [Node.js](https://nodejs.org/en/)
* [Sequelize](https://sequelize.org/)
* [Bootstrap](https://getbootstrap.com/)
* [JQuery](https://jquery.com/)
* [flatPickr](https://github.com/flatpickr/flatpickr)
* [express-session](https://www.npmjs.com/package/express-session)
* [check-password-strength](https://www.npmjs.com/package/check-password-strength)
* [bcrypt](https://www.npmjs.com/package/bcrypt)

### Contributors
* Easton Shaum
     * [GitHub](https://github.com/EastonShaum)
     * Email:  eastonshaum@gmail.com
* Jamie Vesterfelt
     * [GitHub](https://github.com/jvesterfelt)
     * Email:  jamie.e.vesterfelt@gmail.com
* Jake Pedigo
     * [GitHub](https://github.com/jbped)
     * Email:  pedigojacob@gmail.com
* BoDee Angus
     * [GitHub](https://github.com/NYX1122)
     * Email:  nyx0hemir@gmail.com

## Contributing
See the [Contributor Covenant](https://www.contributor-covenant.org/) for more information on how you can contribute. 

