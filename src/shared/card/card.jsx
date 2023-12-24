import React, { useState } from 'react';
import axios, { formToJSON } from 'axios';
import { useNavigate } from 'react-router-dom';
import { PaymentTypeCard } from './PaymentTypeCard';
import exit from '../../assets/images/exit.png'

import './card.scss';
import './paymenttypecard.css';
import { API, WEB } from '../../env';
import { Eye, Heart, Check, Delete, Edit } from '../SVG';

const prices = [35, 49, 69];
const sizes = ['S', 'M', 'L'];

export const Card = ({
  type,
  site,
  template,
  category,
  onChoose,
  onDelete,
  token,
  list,
}) => {
  const [fav, setFav] = useState(false);
  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => {
    setIsModalOpen(true);
    localStorage.setItem('product', JSON.stringify(site))
  };

  const closeModal = () => {
    setIsModalOpen(false);
    localStorage.removeItem('product')
  };

  const paymentType = [
    // {
    //   id: "1",
    //   paymentType: "subscriptionpay" ,
    //   name:"subscription",
    //   descriptionText: "some description text",
    //   duration:1
    // },
    {
      id: "2",
      paymentType:"justpay" ,
      name:'6 month',
      descriptionText: "some description text",
      duration:6
    },
    {
      id: "3",
      paymentType:"justpay" ,
      name:'12 month',
      descriptionText: "some description text",
      duration:12
    }
  ]

  template = site ? site.template : template;
  category = site ? site.category : category;

  const updateFavorite = () => {
    const headers = { Authorization: `Bearer ${token}` };

    axios
      .post(
        API + 'favorite',
        { template: template.id, category: category.id },
        { headers }
      )
      .then(() => setFav(!fav));
  };

  const deleteSite = () => {
    const headers = { Authorization: `Bearer ${token}` };

    axios
      .delete(API + 'site/' + site.id, { headers })
      .then(
        () => onDelete(site.id)
        // console.log("ppp")
        );
  };

  const openterms = () =>{
    return(
      <div>
        hello
      </div>
    )
  }
  return (
    <div key={template.id} className="card-item">
      <a
        className="image-wrap"
        href={template.old_url}
        rel="noreferrer"
        target="_blank"
      >
        <img src={WEB + 'storage/' + template.image} />
      </a>
      <div className="content">
        <div className="head">
          <h3>
            {category.title} {sizes[template.size]} - {prices[template.size]}{' '}
            ლარი
          </h3>
        </div>
        <div className="footer">
          <div className="info">
            <div className="info-item">
              ზომა: <span>{sizes[template.size]}</span>
            </div>
            <div className="info-item">
              ფასი: <span>{prices[template.size]} ლარი</span>
            </div>
          </div>
          <div className="action">
            <a
              href={template.old_url}
              className="action-item"
              rel="noreferrer"
              target="_blank"
            >
              <Eye />
            </a>
            {type === 'choose' && (
              <>
                <button
                  className={['action-item', fav && 'active'].join(' ')}
                  onClick={updateFavorite}
                >
                  <Heart />
                </button>
                <button
                  className="action-item action-item-last choose"
                  onClick={onChoose}
                >
                  <Check />
                  არჩევა
                </button>
              </>
            )}
            {type === 'dashboard' && (
              <div className="action">
                {site.status === 'draft' ? (
                  <>
                    <button
                      className={['action-item', fav && 'active'].join(' ')}
                      onClick={deleteSite}
                    >
                      <Delete />
                    </button>
                    <button
                      className="action-item action-item-last edit"
                      onClick={() => {
                        console.log(site.template)
                        localStorage.setItem('product', JSON.stringify(site) )
                        navigate(`/form/${site.id}`)}
                      } 
                    >
                      <Edit />
                      შევსება
                    </button>
                  </>
                ) : site.status === 'pending' ? (
                <div>
                <button
                  className="action-item action-item-last"
                  onClick={openModal}
                >
                  <Edit />
                  დაიწყე გადახდა
                </button>

                {isModalOpen && (
                    <div className="modal-content">
                      <h1>Get a plan for your project</h1>

                      <div className='box-container' >
                        {paymentType.map((item) => (
                          <PaymentTypeCard
                            key={item.id} // Remember to provide a unique key for each item when using map
                            id={item.id}
                            name={item.name}
                            descriptionText={item.descriptionText}
                            duration={item.duration}
                            price={prices[template.size]}
                            paymentType = {item.paymentType}
                          />
                        ))}
                      </div>

                      <button  className="exit" onClick={closeModal}>
                          <img src={exit} alt="" />
                      </button>
                    </div>
                )}
                </div>
                ) : site.status === 'active' ? (
                  <> </>
                ) : null}
              </div>
            )}

          </div>
        </div>
      </div>
    </div>
  );
};

