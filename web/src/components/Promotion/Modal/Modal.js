import React, {useEffect, useState} from "react";
import UIModal from 'components/UI/Modal/Modal';
import useApi from "components/utils/useApi";
import PromotionsModalCommentsTree from "./CommentsTree/CommentsTree";
import './Modal.css';

const PromotionModal = ({ promotionId, onClickClose }) => {
    const [comment,setComment] = useState('');
    const [load, loadInfo] = useApi({
        url: 'comments',
        params: {
            promotionId,
            _expand: 'user'
        }
    });
    const [sendComment,sendCommentInfo] = useApi({
        url: 'comments',
        method: 'post'
    });
    useEffect(() => {
        load();
    }, []);
    function onSubmit(ev) {
        ev.preventDefault();
        try{
            sendComment({
                data: {
                    userId: 1,
                    promotionId,
                    comment,
                }
            });
            setComment('');
            load();
        }catch(e) {

        }
    }
    
    return (
        <UIModal 
            isOpen
            onClickClose={onClickClose}
        >
               <form 
                    className="promotion-modal__comment-form"
                    onSubmit={onSubmit}
                >
                   <textarea 
                    placeholder="Comentar..."
                    onChange={ev => setComment(ev.target.value)}                    
                    value={comment}
                ></textarea>
                   <button 
                        type="submit"
                        disabled={sendCommentInfo.loading}
                    >
                        {sendCommentInfo.loadin? 'Enviando...': 'Enviar'}
                    </button>
               </form>

                <PromotionsModalCommentsTree
                    comments={loadInfo.data}
                />
        </UIModal>
    );
}

export default PromotionModal;