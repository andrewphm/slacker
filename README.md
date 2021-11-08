# Slacker Team Chat

[http://andrewpham.ca/slacker-fe](http://andrewpham.ca/slacker-fe)

<a href="http://andrewpham.ca/slacker-fe" target="_blank">
    <img src="" alt="Preview of Slacker chat app" width="236" height="54"> 
</a>

Slacker Team Chat is a full stack real-time chat application with authentication. It's based off the team collaborating chat application [Slack](https://slack.com/) and it's powered by [Stream](https://getstream.io/). Some of the features are:

- Signup and login authentication
- User Avatar with image
- Create and edit channels for relatable content
- Direct messages, group messages
- Edit/delete messages
- Variable messages: attach photos/files, send emojis, send gifs, replies, etc.
- Create threads right inside the Chat window

## Stack

- React - Used functional components to create the UI and pass states/props.
- Node/express - Used for authentication, create routes to verify and create users.
- [getstream sdk](https://getstream.io/chat/docs/) - Used many of the core component context providers and default styles.
- [Heroku](https://www.heroku.com) - Used to deploy the server
- Github pages - Deploy the frontend

## How I made this Applicaiton

### Stream SDK

Stream's SDK provides four core components necessary to get up and running quickly - these core componenets allow you to communicate with the stream backend and create client instances.

```sh
$ npm install stream-chat stream-chat-react
```

The four core components are:

1. #### StreamChat

StreamChat allows you to create a client instance with Stream and connect a user. When you call connectUser you Stream API creates a websocket connection.

```js
import { StreamChat } from 'stream-chat';

const client = StreamChat.getInstance(UserAPI);
client.connectUser({ userInfo }, userToken);
```

2. #### Chat

Chat component is a React Context provider that wraps the entire application. It provides all the chat contexts and values to its children as well as the StreamChat client instance.

```js
import { Chat, Channel, ChannelList } from 'stream-chat-react';

<Chat client={client}>
  <ChannelList />
  <Channel />
</Chat>;
```

3. #### Channel

Channel component is a React Context provider that wraps all of the logic, functionality, and UI for an individual chat channel. It provides:

- **stateful data** (ex: `messages` or `members`)
- **action handlers** (ex: `sendMessage` or `openThread`)
- **custom component UI overrides** (ex: `Avatar` or `Message`)
  and more.

```js
import { Channel, MessageList, MessageInput } from 'stream-chat-react';

<Channel>
  <MessageList />
  <MessageInput />
</Channel>;
```

4. #### ChannelList

The ChannelList component queries an array of `channel` objects from the Stream Chat API and displays as a customizable list in the UI. ChannelList would be used to render a users list of **Channels** they are in, or a users **Direct Messages**.

### Authentication

- I used node/express to handle the authentication.
- There are two authentication routes, one for sign up and one for sign in.
  - Sign up: When signing up, user info is sent to the back-end, a hashed password, user id, and Stream user token is created and sent back to the front-end. The front-end takes this data and calls `client.connectUser(userdata, userToken)` This creates a user in the Stream database.
  - Login: When logging in the the user info is sent to the back-end and validated. The username is queried in the Stream db, and the password is compared with the hashed password. If the password is correct, a user Token is created and sent to the front-end to call `client.connectUser(userdata, userToken)`
