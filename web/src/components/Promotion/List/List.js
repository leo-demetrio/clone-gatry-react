import React, { useState } from "react";
import PromotionCard from 'components/Promotion/Card/Card';
import UIModal from 'components/UI/Modal/Modal';
import './List.css';

const PromotionList = ({ promotions, loading, error }) => {
    const [promotionId, setPromotionId] = useState(null);
    if (error) {
        return <div>Algo deu errado...</div>
    }
    if(loading || promotions === null) {
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
            <UIModal 
                isOpen={Boolean(promotionId)}
                onClickClose={() => setPromotionId(null)}
            >
                <h1>Comments</h1>
            </UIModal>
        </div>
    )
}


export default PromotionList;