import React from "react";
import './Card.css';

 const PromotionCard = ({ promotion }) => {
    return(
        <div className="promotion-card">
            <img src={promotion.imageUrl}
                 className="promotion-card__img"
                 alt={promotion.title}
            />
            <id className="promotion-card__info">
                <h1 className="promotion-card__title">PromotionCard { promotion.title }</h1>
                <span className="promotion-card__price">R$ {promotion.price}</span>
                <footer className="promotion-card__footer">
                    {promotion.comments.length > 0 && (
                        <div className="promotion-card__comment">{promotion.comments[0].comment}</div>
                    )}
                    <div className="promotion-card__comments-count">
                        {promotion.comments.length} {' '}
                        {promotion.comments.length > 1 ? 'Comentários' : 'Comentário'}
                    </div>
                    <a href={promotion.url} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="promotion-card__link"> 
                        Ir para o site
                    </a>
                </footer>
            </id>
            
        </div>
    );

 }

 export default PromotionCard;