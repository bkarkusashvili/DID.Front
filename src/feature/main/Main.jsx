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
              Enhance your storytelling capability to the max
              <span>Generate digital content instantly</span>
            </span>
            <p>
              Stori AI is a web application powered by artificial intelligence
              that enables business owners and operators, marketers and
              copywriters, students and teachers to generate flawless digital
              material in seconds.
            </p>
            <Link to="/register">Get started</Link>
          </div>
          <div className="list">
            <span>Business presentations and docs</span>
            <span>Branded social media posts and ads</span>
            <span>Blogs, newsletters and articles</span>
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
            <h2>Delegate and automate business communication</h2>
            <p>
              Always thought of creating business documents as the most time
              consuming thing? Well, not in this case! Simply delegate it to
              Stori AI.
              <br />
              <br />
              Here you do not start with a blank page. Whether this is a
              presentation, a poster or writing an article on a specific topic
              and for a desired outcome.
              <br />
              <br />
              Just instruct Stori AI what you need and we'll generate results
              instantly, applying your branding style and elements. You can then
              edit, download, or send the material directly from our dashboard.
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
              digital identity on storiai.
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
