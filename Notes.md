# Notes
[Building Serverless Web Applications with React & AWS Amplify](https://egghead.io/courses/building-serverless-web-applications-with-react-aws-amplify)

### Install & Configure the AWS Amplify CLI
- `npm install -g @aws-amplify/cli`
- Run `amplify configure` to configure the CLI with the user from our AWS account
-  We're next prompted to specify an AWS region. For me, that's us-east-1. Now we can give a username for the new user that we're about to create. I'll give mine the username of amplify-egghead-cli-user. This should open up the IAM dashboard in our AWS account.
-  This IAM user has some preconfigured settings that we can accept by clicking Next Permissions, Next Review, and Create User. Once the user's been created, we're given an access key ID and a secret access key.
-   Copy the access key ID to your clipboard, jump back to the command-line and paste it into the prompt. Do the same with the secret access key.
-   Here we can set a profile name. I'll give the profile name a name of amplify-egghead-cli-user. Now the CLI has been configured and we're ready to begin initializing new AWS Amplify projects.

### Create & Configure an AWS Amplify Project with a React Application
- Now that we've installed and configured the CLI, let's create a new React application, and then initialize a new Amplify project within the React application.

-  To do so, we'll use create React app to create a new React application called My Amplify app. Once the new React application has been created, let's change into the new directory.

-  From within the new directory, we'll run Amplify init to initialize a new Amplify project. We'll then be prompted for a few options. For the default editor, I'll choose Visual Studio code. For the type of app we're building, we can choose JavaScript. For the framework we're using, we can choose React.

-  The source directory can be left as source. The distribution directory, build. The build command can be left as build. The start command can be left as start.

-  Next, we're given the option to choose an AWS profile. Here, we can choose the profile that we created when we configured this CLI.

-  Now, our Amplify project has been initialized. We should now see a .Amplify rc file, as well as an Amplify folder, in our root directory.

-  The last thing we need to do is install the AWS Amplify and AWS Amplify React Client Libraries into our React application.

-  To do so, we can either use npm or yarn to add AWS Amplify and AWS Amplify React.

-  Now, the React app has been configured, the Amplify project has been created, and we're ready to begin adding new features.

### Use the AWS Amplify withAuthenticator HOC to Implement a React User Authorization Flow
- `amplify add auth` To add authentication with amplify
  - use default configuration
  - Note: selected email for the identification
- `amplify push`
  - push the new configuration into our account and create and provision the new resources.
  - generates `aws-exports.js`
- Configure react app with aws resources
  - src/index.js
  - `import Amplify from 'aws-amplify';`
  - `import config from './aws-exports';`
  - `Amplify.configure(config);`
- In `App.js`
  - `import { withAuthenticator } from aws-amplify-react`
  - `export default withAuthenticator(App)`
- App is now protected by user authentication flow
- User session is stored in local storage
- Create signout button
  - `export default withAuthenticator(App, { includeGreetings: true })`
- `amplify status` to view enabled services
- To view cognito authentication service in AWS acct open AWS console and search for cognito
  - Manage user pools
    - select pool for application created


### Manually Sign Up New Users in React with AWS Amplify Auth Class
- `import { Auth } from 'aws-amplify'`