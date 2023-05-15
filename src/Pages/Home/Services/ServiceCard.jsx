import React from 'react';

const ServiceCard = ({service}) => {

    const {title, img, price} = service;
    return (
        <div>
            <div className="card w-96 h-[348px] bg-base-100 shadow-xl mt-4">
                <figure className="px-10 pt-10">
                    <img src={img} alt="Shoes" className="rounded-xl" />
                </figure>
                <div className="card-body items-center text-center">
                    <h2 className="card-title">{title}</h2>
                    <p>{price}</p>
                    <div className="card-actions">
                        <button className="btn btn-primary">Buy Now</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ServiceCard;