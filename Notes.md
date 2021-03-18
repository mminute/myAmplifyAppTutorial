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
- Add state (username, password, etc) and event handlers for the fields
- Mostly react state management and form creation except for calling these function
```
  const signup = async () => {
    try {
      await Auth.signUp({ username, password, attributes: { email, phone_number: phoneNumber } });
      setSignupStep(1);
      console.log('successfully signed up!');
    } catch (err) {
      console.log(`error signing up: ${err}`);
    }
  };

  const confirmSignup = async () => {
    try {
      await Auth.confirmSignUp(username, authenticationCode);
      console.log('user successfully confirmed signup!');
    } catch (err) {
      console.log(`error confirming signup: ${err}`)
    }
  };
  ```
- [Expected phone number format](https://forums.aws.amazon.com/thread.jspa?threadID=275041) is +(countrycode)########## like `+01234567890`

### Create & Interact with an AWS AppSync GraphQL API with AWS Amplify
- `amplify add api`
  - choose graphql
  - give it a name
  - authorization typ: choose api key
  - Do you have an annotated graphql schema?: choose no
  - Do you want a guided schema creation?: choose yes
  - chose to edit the schema: Add `completed: Boolean`
- `amplify push` to create the resource in my account
- search for `aws appsync` in the aws console to take a look at the new api
- Click Schema to see the schema that is autogenerated
- Click queries to execute queries and mutations against api
- Create a mutation to populate some data  Follow the docs for guidance
- Go to the AWS console, find your app and find appsync
  - use mutations and queries to populate data
- Go back to the app and start fetching/using data
  - `import { API, graphqlOperation } from 'aws-amplify';`

```
const ListTodos = `
  query {
    listTodos {
      items {
        completed
        description
        id
        name
      }
    }
  }
`
```

- `const todoData = await API.graphql(graphqlOperation(ListTodos));`

### Create & Interact with a Serverless REST API with AWS Lambda from React
- `amplify add api`
  - choose rest
  - call api `peopleApi`
  - path: `/people`
  - lambda source: create new lambda function
  - provide a name
  - provide a lamda function name
  - choose function template Serverless ExpressJS function
- edit the functions you created `my-amplify-app/amplify/backend/function/peopleFunction/src/app.js`
- Star wars api isnt returning anything

### Store Data in Amazon S3 with React
- `amplify add storage`
- add `content`
- provide a name for this resource
- provide a bucket name or accept the default (name must be unique)
- access- `authorized`
  - give them read and write
- Now that resources have been created locally run `amplify push` to create them in your aws account
- import the storage API from amplify `import { Storage } from 'aws-amplify'`
- `Storage.put().then().catch()`