import React, { useState } from "react";
import PromotionCard from 'components/Promotion/Card/Card';
import PromotionModal from "../Modal/Modal";
import './List.css';

const PromotionList = ({ promotions, loading, error }) => {
    const [promotionId, setPromotionId] = useState(null);
    if (error) {
        return <div>Algo deu errado...</div>
    }
    if(promotions === null) {
        return <div>Carregando...</div>
    }

    if(promotions.length === 0) {
        return <div>Nenhum resultado encontrado</div>
    }


    return (
        <div className="promotion-list">
            {promotions.map(promotion => (
                    <PromotionCard 
                        promotion={promotion} 
                        onClickComments={() => setPromotionId(promotion.id)} 
                    />
            ))}
            {loading && <div>Caregando mais promoções...</div>}
            {promotionId && (
                <PromotionModal 
                    promotionId={promotionId} 
                    onClickClose={() => setPromotionId(null)} 
                />
            )}
        </div>
    );
}


export default PromotionList;