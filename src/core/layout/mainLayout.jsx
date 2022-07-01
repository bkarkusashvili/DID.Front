import React from 'react';
import { Header } from '../header/header';
import { Footer } from '../footer/footer';

import './mainLayout.scss';

export const Mainlayout = ({ children, hasUser }) => {
  return (
    <div id="container">
      <Header hasUser={hasUser} />
      <main> {children} </main>
      <Footer />
    </div>
  );
};
