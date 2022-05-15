import React from "react";
import Mainlayout from "../../../core/layout/mainLayout";
import "./mainPage.scss";
import Form from "../../component/form";

const mainPage = () => {
  return (
    <>
      <Mainlayout>
        <div id="mainPage">
          <Form title={"Log into system"} />
          <div>Right</div>
        </div>
      </Mainlayout>
    </>
  );
};

export default mainPage;
