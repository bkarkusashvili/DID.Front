import React from 'react';
import { Header } from '../header/header';
import { Footer } from '../footer/footer';

import './mainLayout.scss';

export const Mainlayout = ({ children }) => {
  return (
    <div id="container">
      <Header />
      <main> {children} </main>
      <Footer />
    </div>
  );
};
