import React from "react";
import Header from "../../shared/header/header";
import Footer from "../../shared/footer/footer";
import "./mainLayout.scss";

const Mainlayout = ({ children }) => {
  return (
    <div id="container">
      <Header></Header>
      <main> {children} </main>
      <Footer></Footer>
    </div>
  );
};

export default Mainlayout;
