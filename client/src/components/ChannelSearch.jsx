import React, { useState, useEffect } from 'react';

// Stream react
import { useChatContext } from 'stream-chat-react';

// Icons

import { SearchIcon } from '../assets/SearchIcon';

const ChannelSearch = () => {
  const [query, setQuery] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const onSearch = (event) => {
    event.preventDefault();
    setIsLoading(true);
    setQuery(event.target.value);
  };

  return (
    <div className="channel-search__container">
      <div className="channel-search__input__wrapper">
        <div className="channel-search__input__icon">
          <SearchIcon />
        </div>
        <input
          className="channel-search__input__text"
          type="text"
          placeholder="Search"
          value={query}
          onChange={onSearch}
        />
      </div>
    </div>
  );
};

export default ChannelSearch;
