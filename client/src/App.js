import React from 'react';

import { StreamChat } from 'stream-chat';
import { Chat } from 'stream-chat-react';

import Cookies from 'universal-cookie';

// components
import { ChannelListContainer, ChannelContainer, Auth } from './components';

// style
import './App.css';

const apiKey = 'uqb5m9wf2y2s';
const client = StreamChat.getInstance(apiKey);

const authToken = false;

const App = () => {
  if (!authToken) return <Auth />;

  return (
    <div className="app__wrapper">
      <Chat client={client} theme="team light">
        <ChannelListContainer />
        <ChannelContainer />
      </Chat>
    </div>
  );
};

export default App;
