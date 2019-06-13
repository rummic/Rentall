import React from 'react';
import { Button } from 'react-bootstrap';
import NumberFormat from 'react-number-format';
import { Link } from 'react-router-dom';

const searchOffer = (props) => {
    const item = props.offers
    const param = props.param
    return (
            <div className="offerts1 searchFoto">
                <div className="offcon" >
                    <div className="offoto">
                        <img src={(item.photos[0] === undefined ? 'https://screenshotlayer.com/images/assets/placeholder.png' : "https://localhost:44359/" + item.photos[0])} alt="foto" /></div>
                    <div className="ofdesc">{item.title}<hr />
                        <div className="ofinf">
                            <div className="localization"> {item.city}, {item.street}</div>
                            <ul>
                                <li>Powierzchnia : {item.area} m²</li>
                                <li>Piętro : {item.level}</li>
                                <li>Liczba pokoi : {item.roomCount}</li>
                                <li>Kategoria : {item.categoryName}</li>
                                <li>Rodzaj ogłoszenia : {item.offerTypeType}</li>
                            </ul>
                        </div>
                    </div>
                    <div className="ofdes">
                        <div className="ofprice"><NumberFormat value={item.price} displayType={'text'} thousandSeparator={' '} suffix={' zł'} /> </div>
                        <div className="ofbutton"><Link to={{ pathname: '/search/'+item.id+"/"+param}}><Button>Szczegóły</Button></Link></div>
                    </div>
                    <div className="clearfix"></div>
                </div>
            </div>
        )
}

export default searchOffer;
