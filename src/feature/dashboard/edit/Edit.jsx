import React from 'react';
import save from '../../../assets/svg/check.svg';
import { Button } from '../components/button/Button';
import './Edit.scss';
import img from '../../../assets/images/img.png';

export const Edit = () => {
  return (
    <div id="edit">
      <div className="titleControl">
        <h2>Fb post Name</h2>
        <div className="form">
          <div className="saveButton">
            <Button icon={save} />
          </div>
          <div className="buttons">
            <button className="btn">Delete</button>
            <button className="btn">Publish</button>
          </div>
        </div>
      </div>
      <div className="editForm">
        <form>
          <div className="imgForm">
            <div className="uploadedImg">
              <div className="imgUpload">
                <div>
                  <span>Drag and drop your photos or</span>
                  <input type="file"></input>
                </div>
                <span>3 photos maximum</span>
              </div>
              <div className="imgBox">
                <span>File name</span>
                <img src={img}></img>
              </div>
              <div className="imgBox">
                <span>File name</span>
                <img src={img}></img>
              </div>
            </div>
            <div className="generImg">
              <span>Suggested Photo will be genarated here</span>
              <img src={img}></img>
              <button>Regenerate</button>
            </div>
          </div>

          <div className="textGenerate">
            <div>
              <h2>Generate Facebook post</h2>
              <div className="checkboxWrapper">
                <label className="label">
                  Apply Emojis
                  <input type="radio" checked="checked" name="radio" />
                  <span className="checkmark"></span>
                </label>
                <label className="label">
                  Apply Logo
                  <input type="radio" name="radio" />
                  <span className="checkmark"></span>
                </label>
                <label className="label">
                  Apply Branding Style
                  <input type="radio" name="radio" />
                  <span className="checkmark"></span>
                </label>
                <label className="label">
                  Generate Text on Photo
                  <input type="radio" name="radio" />
                  <span className="checkmark"></span>
                </label>
              </div>
            </div>
            <div className="keyword">
              <h2>Keywords</h2>
              <div className="keywordInput">
                <input type="text"></input>
                <button>Go</button>
              </div>
            </div>
            <div className="regentext">
              <h2>Your Text</h2>
              <div className="textView">
                {/* <input type="text"></input> */}
                <p>
                  Dogs have proven themselves time and again to be loyal, kind,
                  understanding, and have an indomitable spirit. They greet us
                  happily after what may have been the worst day of our lives
                  and make us feel better with a wag of their tail and a playful
                  grin.
                </p>
                <div className="buttons">
                  <button className="btn">Regenerate</button>
                  <button className="btn">Edit</button>
                  <button className="btn">Submit</button>
                </div>
              </div>
            </div>
            <div className="regenphototext">
              <h2>On photo text field</h2>
              <div className="textView">
                <input type="text"></input>
                {/* <p>
                    Dogs have proven themselves time and again to be loyal,
                    kind, understanding, and have an indomitable spirit. They
                    greet us happily after what may have been the worst day of
                    our lives and make us feel better with a wag of their tail
                    and a playful grin.
                  </p> */}
                <div className="buttons">
                  <button className="btn">Regenerate</button>
                  <button className="btn">Edit</button>
                  <button className="btn">Submit</button>
                </div>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};
