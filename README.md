# Aqua friends

### Backend
Firebase cloud functions written in Typescript – `functions` folder. NextJS api routes can also be used – in that case write to `pages/api` folder. 

### Database
TBD

### Frontend
NextJS app written in Typescript – `frontend` folder. We are using TailwindCSS for styling.

### Hosting
Firebase automatically serves `frontend/build` folder.

### CI/CD
Firebase automatically runs CI and deploys to production when code is pushed to `master` branch.

### Deploy 

##### Deploy everything
```
firebase deploy
```

##### Deploy one part of the project
```
firebase deploy --only functions
```

### Run Firebase locally
##### First run
Install firebase tools globally:
```
npm install -g firebase-tools
```
and then install dependencies in every folder using:
```
npm i
``` 

##### Continuous runs
```
firebase emulators:start
```

### Develop frontend locally
Inside `frontend` folder run developement server:
```
npm run dev
```