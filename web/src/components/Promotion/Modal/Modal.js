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
    async function onSubmit(ev) {
        ev.preventDefault();
        try{
            await sendComment({
                data: {
                    userId: 1,
                    promotionId,
                    comment,
                }
            });
            setComment('');
            load({ quietly: true});
        }catch(e) {

        }
    }
    async function sendAnswer(commentAnswer,parentId){
        await sendComment({
            data: {
                userId: 1,
                promotionId,
                comment: commentAnswer,
                parentId
            }
        });
        load({ quietly: true});
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
                    disabled={sendCommentInfo.loading}
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
                    sendComment={sendAnswer}
                />
        </UIModal>
    );
}

export default PromotionModal;