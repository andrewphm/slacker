import React, { useState } from 'react';

// Stream Chat React components
import { ChannelList, useChatContext } from 'stream-chat-react';

// Components
import { ChannelSearch, TeamChannelList, TeamChannelPreview } from './';

// Cookies
import Cookies from 'universal-cookie';

// Icons
import ChatBubble from '../assets/chat-bubble.svg';
import LogOut from '../assets/logout.svg';

const cookies = new Cookies();

const SideBar = ({ logout }) => (
  <div className="channel-list__sidebar">
    <div className="channel-list__sidebar__icon1">
      <div className="icon1__inner">
        <img src={ChatBubble} alt="Chat bubble" width="30" />
      </div>
    </div>
    <div className="channel-list__sidebar__icon2" onClick={logout}>
      <div className="icon1__inner">
        <img src={LogOut} alt="Log out" width="30" />
      </div>
    </div>
  </div>
);

const CompanyHeader = ({ client }) => (
  <div className="channel-list__header">
    <p className="channel-list__header__text">Slackr</p>
    <p className="channel-list__header__user">
      Signed in as: {client._user.name}
    </p>
  </div>
);

// Channel render filter fns
const customChannelTeamFilter = (channels) => {
  return channels.filter((channel) => channel.type === 'team');
};
const customChannelMessagingFilter = (channels) => {
  return channels.filter((channel) => channel.type === 'messaging');
};

const ChannelListContent = ({
  setIsCreating,
  setCreateType,
  setIsEditing,
  setToggleContainer,
}) => {
  const { client } = useChatContext();

  const logout = () => {
    cookies.remove('token');
    cookies.remove('userId');
    cookies.remove('username');
    cookies.remove('fullName');
    cookies.remove('avatarURL');
    cookies.remove('hashedPassword');
    cookies.remove('phoneNumber');

    window.location.reload();
  };

  //filters
  const filters = { members: { $in: [client.userID] } };
  return (
    <>
      <SideBar logout={logout} />
      <div className="channel-list__list__wrapper">
        <CompanyHeader client={client} />
        <ChannelSearch setToggleContainer={setToggleContainer} />

        <ChannelList
          filters={filters}
          channelRenderFilterFn={customChannelTeamFilter}
          List={(listProps) => (
            <TeamChannelList
              {...listProps}
              type="team"
              setIsCreating={setIsCreating}
              setCreateType={setCreateType}
              setIsEditing={setIsEditing}
              setToggleContainer={setToggleContainer}
            />
          )}
          Preview={(previewProps) => (
            <TeamChannelPreview
              {...previewProps}
              setToggleContainer={setToggleContainer}
              setIsCreating={setIsCreating}
              setIsEditing={setIsEditing}
              type="team"
            />
          )}
        />

        <ChannelList
          filters={filters}
          channelRenderFilterFn={customChannelMessagingFilter}
          List={(listProps) => (
            <TeamChannelList
              {...listProps}
              type="messaging"
              setIsCreating={setIsCreating}
              setCreateType={setCreateType}
              setIsEditing={setIsEditing}
              setToggleContainer={setToggleContainer}
            />
          )}
          Preview={(previewProps) => (
            <TeamChannelPreview
              {...previewProps}
              setToggleContainer={setToggleContainer}
              setIsCreating={setIsCreating}
              setIsEditing={setIsEditing}
              type="messaging"
            />
          )}
        />
      </div>
    </>
  );
};

const ChannelListContainer = ({
  setCreateType,
  setIsCreating,
  setIsEditing,
  isCreating,
}) => {
  const [toggleContainer, setToggleContainer] = useState(false);

  return (
    <>
      <div className="channel-list__container">
        <ChannelListContent
          setIsCreating={setIsCreating}
          setCreateType={setCreateType}
          setIsEditing={setIsEditing}
        />
      </div>

      <div
        className="channel-list__container-responsive"
        style={{
          left: toggleContainer ? '0%' : '-89%',
          backgroundColor: '#005fff',
        }}
      >
        <div
          className="channel-list__container-toggle"
          onClick={() =>
            setToggleContainer((prevToggleContainer) => !prevToggleContainer)
          }
        ></div>
        <ChannelListContent
          setIsCreating={setIsCreating}
          setCreateType={setCreateType}
          setIsEditing={setIsEditing}
          setToggleContainer={setToggleContainer}
        />
      </div>
    </>
  );
};
export default ChannelListContainer;
