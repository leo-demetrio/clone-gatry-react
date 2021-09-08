import React, { useEffect, useState} from 'react';
import axios from 'axios';
import PromotionCard from 'components/Promotion/Card/Card';

const PagesPromotionSearch = () => {
  const [promotions, setPromotions] = useState([]);
  useEffect(() => {
    axios.get('http://localhost:5000/promotions?_embed=comments')
        .then(res => {
          setPromotions(res.data);
        });
  },[]);

    return (
        <div className="App" 
        style={{
         maxWidth: 700,
         margin: '30px auto',
        }}>
          {promotions.map(promotion => (
             <PromotionCard promotion={promotion} />
          ))}
        </div>        
   );
}

export default PagesPromotionSearch;