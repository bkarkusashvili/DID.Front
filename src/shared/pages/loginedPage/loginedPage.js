import React from "react";
import Mainlayout from "../../../core/layout/mainLayout";
import "./loginedPage.scss";
import Card from "../../component/card/card";

const loginedPage = () => {
  return (
    <>
      <Mainlayout>
        <div id="loginedPage">
          <Card />
        </div>
      </Mainlayout>
    </>
  );
};

export default loginedPage;
