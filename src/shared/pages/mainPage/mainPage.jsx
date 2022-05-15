import React from "react";
import Mainlayout from "../../../core/layout/mainLayout";
import "./mainPage.scss";
import Form from "../../component/form/form";
import SiteReady from "../../component/siteready/siteReady";

const mainPage = () => {
  return (
    <>
      <Mainlayout>
        <div id="mainPage">
          <Form title={"Log into system"} />
          <SiteReady />
        </div>
      </Mainlayout>
    </>
  );
};

export default mainPage;
