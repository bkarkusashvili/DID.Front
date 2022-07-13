import React from "react";
import "./Main.scss";
import bgimg from "../../assets/images/mainBG.png";
import { Link } from "react-router-dom";
import socialone from "../../assets/images/social-1.png";
import socialtwo from "../../assets/images/social-2.png";
import newsite from "../../assets/images/newsite.png";
import branding from "../../assets/images/branding.png";
import dashboard from "../../assets/images/dash.png";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import { useState } from "react";

const SignupSchema = Yup.object().shape({
  email: Yup.string().email("Invalid email").required("Required"),
});

export const Main = () => {
  const [signup, setSignup] = useState(true);
  return (
    <div id="mainpage">
      <div className="section-1">
        <div className="container">
          <div className="leftContent">
            <span>
              Enhance your online presence
              <span>Generate quality content</span>
            </span>
            <p>
              Artificial Intelligence that helps you generate and optimize
              content for social media and websites
            </p>
            <Link to="/register">Get started</Link>
          </div>
          <div className="list">
            <span>Social media content</span>
            <span>Websites</span>
            <span>Newsletters and Blogs</span>
          </div>
        </div>
        <img src={bgimg}></img>
      </div>
      <div className="section-2">
        <div className="container">
          <div className="leftContent">
            <h2>Social media content</h2>
            <p>
              Need to create an eye-catching post for your social media with
              cool description that will attract everyone’s attention?
              <br />
              <br />
              No need to hire copyrighter or graphic designer - our smart AI
              system has all that you need.
              <br />
              <br />
              Create engaging social media content for any objective in no time
              without an extra effort.
            </p>
          </div>
          <div className="img-wrapper">
            <img src={socialone}></img>
            <img src={socialtwo}></img>
          </div>
        </div>
      </div>
      <div className="section-3">
        <div className="container">
          <div className="leftContent">
            <h2>Create Website content</h2>
            <p>
              Always thought of creating a descent website as the most
              frustrating thing? Well, not in this case!
              <br />
              <br />
              Here you can choose from our predesigned website templates for any
              business and create your professional image on the web.
              <br />
              <br />
              Our contractor designers will work on your specific requirements
              and create top notch content for your website.
            </p>
          </div>
          <div className="img-wrapper">
            <img src={newsite}></img>
          </div>
        </div>
      </div>
      <div className="section-4">
        <div className="container">
          <div className="leftContent">
            <h2>Branding elements applied</h2>
            <p>
              If you want to create a brand book fast but do not want to spend a
              fortune on it then congrats, you are in the right place!
              <br />
              <br />
              Start creating your brand or business from zero and build up your
              digital identity on didgeai.
              <br />
              <br />
              Here you will find all the elements that make up your brand: logo,
              colors, visuals, fonts, sizes, style variations and more.
            </p>
          </div>
          <div className="img-wrapper">
            <img src={branding}></img>
          </div>
        </div>
      </div>
      <div className="section-5">
        <div className="container">
          <div className="leftContent">
            <h2>Everything under one dashboard</h2>
            <Formik
              initialValues={{
                firstName: "",
                lastName: "",
                email: "",
              }}
              validationSchema={SignupSchema}
              onSubmit={(values) => {
                setSignup(false);
              }}
            >
              {({ errors, touched }) => (
                <Form>
                  {signup ? (
                    <>
                      <p>Ready to sign up?</p>
                      <Field name="email" type="email" placeholder="Email" />
                      {errors.email && touched.email ? (
                        <div>{errors.email}</div>
                      ) : null}

                      <button type="submit">Sign Up</button>
                    </>
                  ) : (
                    <span className="thanks">Thanks for Sign Up</span>
                  )}
                </Form>
              )}
            </Formik>
          </div>
          <div className="img-wrapper">
            <img src={dashboard}></img>
          </div>
        </div>
      </div>
    </div>
  );
};
