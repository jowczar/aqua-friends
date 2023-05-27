# Aqua friends

### Backend
Firebase cloud functions written in Typescript – `functions` folder.

### Database
TBD

### Frontend
NextJS app written in Typescript – `frontend` folder. We are using TailwindCSS for styling. 

### Hosting
Firebase automatically serves `frontend/dist` folder which is built NextJS app.<br/>
__Warning:__ Do not use SSR in NextJS, because it will not work on Firebase hosting. If you need SSR, set up Firebase cloud function for serving this content or migrate frontend to different hosting, e.g. Vercel.

### CI/CD
Firebase automatically runs CI and deploys to production when code is pushed to `master` branch.

### Code formatting
This project uses eslint rules to uphold code quality and adhere to best practices, complemented by prettier for proficient code formatting. To prepare your environment for development, run in the root directory:
```
npm run prepare
```
This command will set up git hooks that automatically run eslint and prettier on every commit, thanks to [husky](https://github.com/typicode/husky).

### Run Firebase locally
##### Install dependencies
Install firebase tools inside root folder:
```
npm i
```

Then login to firebase:
```
firebase login
```

##### Run Firebase emulators
```
firebase serve
```

### Develop frontend components
Use storybook to develop frontend components. 
Inside `frontend` folder run storybook server:
```
npm run storybook
```

### Develop frontend locally
Inside `frontend` folder run development server:
```
npm run dev
```
Remember to `npm i` every time dependencies are changed.

### Deploy 

##### Deploy everything
```
firebase deploy
```

##### Deploy one part of the project
```
firebase deploy --only functions
```