

<h1><img src="https://user-images.githubusercontent.com/59141533/131732817-23a34498-10d3-4024-9519-d064a67a8482.png" width=50px height=50px />Team Maker</h1> 


[![Team Maker Thumbnail](https://user-images.githubusercontent.com/59141533/157925006-ed5b167a-fd18-4629-bf5a-2f0e59178b42.png)](https://www.loom.com/share/2079f9206a6d4b31a29a9f1f829bae25)

[![MIT License](https://img.shields.io/apm/l/atomic-design-ui.svg?)](https://github.com/tterb/atomic-design-ui/blob/master/LICENSEs)

[Live Link](https://connect-team.herokuapp.com/) | [Demo](https://www.loom.com/share/2079f9206a6d4b31a29a9f1f829bae25)

# The problem Team Maker solves

A real time Problems that we have faced while finding a team to participate in hackathon. Finding a random teammate or a team, and synchronizing our abilities in the best way possible which is really hard to do with people we don’t know anything about


<!-- ## Screenshots

![App Screenshot](https://res.cloudinary.com/dcgefz04y/image/upload/v1624793593/Screenshot_275_oibipb.png) -->

  
# Features

- User and Admin Authentication.
- Creation of Teams.
- Searching for Teams.
- Colloboration with Teams( Chat functionality ).
- List of all events like hackathons, competitions(for now we only support few events).
- Custom addition of events by Admin.
- Team and User Profiles.


  
## Tech Stack

**Client:** React Js, Redux, Material UI

**Server:** Node Js ( Express Js )

**Database:** MongoDB

**Others:** Socket.io, AWS S3



  
## Environment Variables

To run this project, you will need to add the following environment variables to your .env file in root directory.

`MONGO_URI`

`JWT_SECRET`

  
## Run Locally

Clone the project

```bash
git clone https://github.com/veerreshr/team-maker.git
```

Go to the project directory

```bash
cd team-maker
```

Install dependencies

```bash
npm install
```
Go to the fronend directory
```bash
cd frontend
```

Install dependencies

```bash
npm install
```
Go to the root directory
```bash
cd ..
```

Start the server

```bash
npm run dev
```
  
Also refer [Contributing-gitflow](https://github.com/veerreshr/team-maker/blob/main/CONTRIBUTING-gitflow.md) for more information 
## Roadmap

- [ ] Add ESLint
- [x] Landing Page
- [x] User Profile
- [x] Event Section
- [x] Team Filtering
- [x] Chat Implementation
- [ ] Dockerize the application
- [ ] Implement Testing 
- [ ] Voice/Video call Implementation(Optional)
- [ ] Kanban Boards( optional )  

## Support

For support, Please email us at veerreshr@gmail.com

## License

[MIT](https://choosealicense.com/licenses/mit/)

  
