import React from "react";
import "./Main.scss";
import bgimg from "../../assets/images/mainBG.png";
import { Link } from "react-router-dom";
import newsites from "../../assets/images/newsites.png";
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
              გააძლიერე შენი ონლაინ ხილვადობა
              <span>მიიღე თანამედროვე საიტი სწრაფად</span>
            </span>
            <p>
              სხვადასხვა ინდუსტრიაზე მორგებული ასეულობით ნიმუშებიდან აირჩიე
              შენთვის სასურველი
            </p>
            <Link to="/register">დაიწყე</Link>
          </div>
          <div className="list">
            <span>Mobile 1st საიტები</span>
            <span>ძებნაში ოპტიმიზაცია</span>
            <span>ბრენდინგი</span>
          </div>
        </div>
        <img src={bgimg}></img>
      </div>
      <div className="section-2">
        <div className="container">
          <div className="leftContent">
            <h2>შენი საიტი მზადაა</h2>
            <p>
              მოძებნე და იპოვე სასურველი თემატიკის და მოწყობის ვებ-გვერდი
              did.ge-ზე.
              <br />
              <br />
              ჩვენთან ასეულობით საიტის მზა შაბლონია, რომელიც ნებისმიერ
              თემატიკასა და საქმიანობის სფეროზეა გათვლილი.
              <br />
              <br />
              განსხვავებული მოწყობისა და მოცულობის ნიმუშები შესაძლებლობას
              გვაძლევს თქვენ მოთხოვნებსა და ბიზნესის მასშტაბებს მაქსიმალურად
              მოვერგოთ.
              <br />
              <br />
              ნუ გადადებ - შენი საიტი უკვე მზადაა!
            </p>
          </div>
          <div className="img-wrapper">
            <img src={newsites}></img>
          </div>
        </div>
      </div>
      <div className="section-3">
        <div className="container">
          <div className="leftContent">
            <h2>შექმენი „ქონთენთი“ შენი საიტისთვის</h2>
            <p>
              კარგი ვებ-გვერდის შექმნა ყოველთვის რთულ და დამღლელ პროცესთან
              ასოცირდება, რომელიც აუცილებლად პრობლემად იქცევა? ამ შემთხვევაში
              არა
              <br />
              <br />
              აქ თქვენ შეგიძლიათ ნებისმიერი საქმიანობისთვის შეარჩიოთ ვებ-გვერდი
              საიტების მზა შაბლონებიდან და შექმნათ თქვენი პროფესიონალური იმიჯი
              ინტერნეტში
              <br />
              <br />
              ჩვენი კონტრაქტორი დიზაინერები იმუშავებენ თქვენ კონკრეტულ
              მოთხოვნებზე და შექმნიან თანამედროვე ქონთენთს თქვენი საიტისთვის.
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
            <h2>ბრენდის ელემენტები</h2>
            <p>
              თუ გსურთ, სწრაფად შექმნათ „ბრენდბუქი“, მაგრამ არა კოლოსალური
              თანხის სანაცვლოდ, მაშინ გილოცავთ, თქვენ სწორ სივრცეში მოხვდით!
              <br />
              <br />
              დაიწყეთ ბრენდის ან ბიზნესის აწყობა ნულიდან და შექმენით თქვენი
              ციფრული იდენტობა did.ge-ზე.
              <br />
              <br />
              აქ იპოვით ყველა იმ ელემენტს, რომელიც რეალურად თქვენს ბრენდს ქმნის:
              ლოგო, ფერები, ვიზუალი, „ფონტები“, სტილის ვარიაციები და სხვა.
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
            <h2>ყველაფერი ერთი დაშბორდის ქვეშ</h2>
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
                      <p>
                        მომავალში ფიქრობთ საიტის გაკეთებას? გაიგეთ პირველმა
                        შემოთავაზებების და სიახლეების შესახებ.
                      </p>
                      <Field name="email" type="email" placeholder="ელ-ფოსტა" />
                      {errors.email && touched.email ? (
                        <div>{errors.email}</div>
                      ) : null}

                      <button type="submit">გამოწერა</button>
                    </>
                  ) : (
                    <span className="thanks">
                      თქვენი შეტყობინება მიღებულია!
                    </span>
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
