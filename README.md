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

Stream's SDK provides many of the core component necessary to get up and running quickly - these core componenets allow you to communicate with the stream backend and create client instances.

```js
// The four core components given by stream
import { StreamChat } from 'stream-chat';
import { Chat, Channel, ChannelList } from 'stream-chat-react';
```

#### StreamChat

StreamChat allows you to create a client instance with Stream and connect a user.

```js
import { StreamChat } from 'stream-chat';

const client = StreamChat.getInstance(UserAPI);
client.connectUser({ userInfo }, userToken);
```

#### Chat

Chat component is a React Context provider that wraps the entire applicaiton. It provides all the chat contexts and values to its children as well as the StreamChat client instance.

```js
<Chat client={client}>
  <ChannelList />
  <Channel />
</Chat>
```

#### Channel

Channel component is a React Context provider that wraps all of the logic, functionality, and UI for an individual chat channel. It provides:

- **stateful data** (ex: `messages` or `members`)
- **action handlers** (ex: `sendMessage` or `openThread`)
- **custom component UI overrides** (ex: `Avatar` or `Message`)
  and more.

#### ChannelList
