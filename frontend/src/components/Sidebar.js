/* eslint-disable */
import React from 'react';
import { slide as Menu } from 'react-burger-menu';

export default Sidebar => {
  return (
    <Menu>
      <a className="menu-item" href="/">
        Home
      </a>
      <a className="menu-item" href="/dashboard">
        Explore
      </a>
      <a className="menu-item" href="/chat">
        Chat
      </a>
      <a className="menu-item" href="/pendingusers">
        Pending Requests
      </a>
      <a className="menu-item" href="/rejectedusers">
        Rejected Users
      </a>
      <a className="menu-item" href="/createpost">
        Create New Post
      </a>
      <a className="menu-item" href="http://localhost:5000/">
        Realtime Editor
      </a>
      <a className="menu-item" href="/ids">
        IDS
      </a>
    </Menu>
  );
};