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

- Stream's SDK provides many of the core component necessary to get up and running quickly - these core componenets allow you to communicate with the stream backend and create client instances.

```js
import { StreamChat } from 'stream-chat';
import { Chat, Channel, ChannelList } from 'stream-chat-react';
```

1. Authentication - Everytime the application is reloaded, a conditional render is checked. Does user-agent have a valid User Token saved in cookies? Load chat application, else send to login/sign up page.
