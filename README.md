# Social-Media-API


## Description

A social media API where users can share their thoughts, react to friends' thoughts, and manage their friend list. The API is built using Node.js, Express.js, and MongoDB.

[Video of the application in action](https://drive.google.com/file/d/1SEGMmypiHFhULGMFuP6Qv0SvmgHIv2KA/view?usp=drive_link)


## Table of Contents (Optional)

- [Installation](#installation)
- [Usage](#usage)
- [Endpoints](#endpoints)
- [Credits](#credits)
- [License](#license)
- [Badges](#badges)
- [Contribute](#how-to-contribute)

## Installation

[npm i express-handlebars](https://www.npmjs.com/package/express-handlebars)

[npm i express-session](https://www.npmjs.com/package/express-session)

[npm i mongoose](https://www.npmjs.com/package/mongoose)


## Usage
The functional backend of a social media site.

## Endpoints
### Users
- GET /api/users: Get all users
- GET /api/users/:userId: Get a single user by ID
- POST /api/users: Create a new user
- PUT /api/users/:userId: Update a user by ID
- DELETE /api/users/:userId: Delete a user by ID
### Thoughts
- GET /api/thoughts: Get all thoughts
- GET /api/thoughts/:thoughtId: Get a single thought by ID
- POST /api/thoughts: Create a new thought
- PUT /api/thoughts/:thoughtId: Update a thought by ID
- DELETE /api/thoughts/:thoughtId: Delete a thought by ID
### Friends
- POST /api/users/:userId/friends/:friendId: Add a friend to a user's friend list
- DELETE /api/users/:userId/friends/:friendId: Remove a friend from a user's  friend list
### Reactions
- POST /api/thoughts/:thoughtId/reactions: Add a reaction to a thought
- DELETE /api/thoughts/:thoughtId/reactions/:reactionId: Remove a reaction from a thought

## Credits

Code based largely off class assignments from the UC Berkeley Coding Boot Camp.

## License

![MIT License](https://img.shields.io/badge/License-MIT-purple)

This project is licensed under the [MIT License](LICENSE).

## How to Contribute

You can contribute by following this [GitHub link](https://github.com/winpom/social-network-api).

Clone the repo and request a merg via push of your contributions. If you have further questions please email me at: win.pomerantz@gmail.com