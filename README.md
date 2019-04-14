# Docs
<ul>
    <li>
      <h2>[GET] /user</h2>
      <p>all users list</p>
    </li>
    <li>
      <h2>[POST] /auth/signup</h2>
      <p>add user to DB</p>
      <p></p>
    </li>
    <li>
      <h2>[POST] /auth/signin</h2>
      <p>signin user </p>
    </li>
    <li>
      <h2>[POST] /auth/signout</h2>
      <p>delete user from DB</p>
    </li>
    <li>
      <h2>[GET] /random-user</h2>
      <p>return random user name</p>
    </li>
  </ul>

## Setup

### Install dependencies
```sh
yarn install
```

### Create env file
```sh
cp .env.example .env
```

### Runs the app in development mode.
```sh
yarn start
```

Now you can open http://localhost:3000 to view it in the browser.

### Builds the app for production to the `dist` folder

```sh
yarn build
```

### Runs the app in production mode.

```sh
yarn serve
```
