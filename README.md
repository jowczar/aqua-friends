# Aqua friends

### Backend
Firebase cloud functions written in Typescript – `functions` folder.

### Database
TBD

### Frontend
TBD

### Hosting
Firebase automatically serves `public` folder.

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

### Run locally
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
