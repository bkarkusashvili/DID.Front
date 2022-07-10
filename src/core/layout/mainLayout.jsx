import React from 'react';
import { Header } from '../header/header';
import { Footer } from '../footer/footer';

import './mainLayout.scss';

export const Mainlayout = ({ children, hasUser, logout }) => {
  return (
    <div id="container">
      <Header hasUser={hasUser} logout={logout} />
      <main> {children} </main>
      <Footer />
    </div>
  );
};
