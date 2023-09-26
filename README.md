# FreeBee
Built using [TypeScript](https://www.typescriptlang.org/) with [Vite](https://vitejs.dev/) and [Firebase](https://firebase.google.com/)

[Online Demo](https://cs476-freebee.web.app/)

### Quick Start
- `git clone && cd freebee`
- `npm install`
- `npm run dev`

### Installing and Running the project  
- make sure you have [git](https://git-scm.com/) installed
- a command line is required: vscode terminal will work, or [git bash](https://gitforwindows.org/)
- Install [Node.js](https://nodejs.org/en/)
- make node is installed `node -v`
- make sure npm is installed `npm -v`
- now run Quick Start section

### Deployment (Optitional)
Firebase comes with a automatic deployment package. Deployed following the [vite deployment docs](https://vitejs.dev/guide/static-deploy.html#google-firebase). 
-  follow the docs to install firebase cli and add config files
- `firebase deploy`
- only 1 group  member will need to handle deployment

### Notes For Developers

#### Code structure
Most everything we use is in the `src` folder.
 - `main.js` is main entry point for the system

 - `App.ts` is main access point for developers, so this is app's main page. 
   - handles the routing for the app
   - all new app screens originate from here
- `views` folder contains the components that render html pages. 
- `contollers` folder contains all the logic assocaited with the components. 
   - `hooks` folder contains all the hooks. These are react specific functions that allow easy state updates.
- `models` folder contains all classes to be used for contruscting data going into DB.
- `services` folder contains firebase realted conifurations. 
- `api` folder contains files with functions that make calls to firebase.

#### CSS
 - CSS is handled via [Syled Components](https://styled-components.com/).
 - Each component handles it's own CSS styling inside each component file.  

#### Adding Users to Auth
- From the Firebase console, open the Auth in the left-hand panel. Go to [Email/Password Setup](https://firebaseopensource.com/projects/firebase/quickstart-android/auth/readme/#getting_started)