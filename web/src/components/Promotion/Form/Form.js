import React, { useEffect, useState } from "react";
import { useHistory } from "react-router";
import './Form.css';
import useApi from "components/utils/useApi";

const initialValue = {
    title: '',
    url: '',
    imageUrl: '',
    price: 0
}

const PromotionForm = ({ id }) => {
    const [values, setValues] = useState(id ? null: initialValue);
    const history = useHistory();
    const [load] = useApi({
        url: `/promotions/${id}`,
        method: 'get',
        onCompleted: (res) => {
            setValues(res.data);
        }
    });
    const [save,saveInfo] = useApi({
        url: id
            ? `/promotions/${id}`
            : `/promotions`,
        method: id ? 'put' : 'post',
        onCompleted: (response) => {
            if(!response.error) {
                history.push('/');
            }
        }
    });
 

    useEffect(() => {
        if(id) {
            load();
        }
        //eslint-disable-next-line react-hooks/exhaustive-deps
    },[id]);
    

    function onChange(ev) {
        const { name, value } = ev.target;
        setValues({ ...values, [name]: value });
    }
    function onSubmit(ev){        
        ev.preventDefault();
        save({
            data: values
        });
    }


    return (
        <div>
            <h1>Promo show</h1>
            <h2>Nova Promoção</h2>
            {!values ? (<div>Carregando...</div>): (

            <form  onSubmit={onSubmit}>
                {saveInfo.loading && <span>Salvando dados...</span>}
                <div className="promotion-form__group">
                    <label htmlFor="title">Título</label>
                    <input id="title" value={values.title} type="text" name="title" onChange={onChange} />
                </div>
                <div className="promotion-form__group">
                    <label htmlFor="url">Url</label>
                    <input id="url" value={values.url} type="text" name="url" onChange={onChange} />
                </div>
                <div className="promotion-form__group">
                    <label htmlFor="imageUrl">Imagem (Url)</label>
                    <input id="imageUrl" value={values.imageUrl} type="text" name="imageUrl" onChange={onChange} />
                </div>
                <div className="promotion-form__group">
                    <label htmlFor="price">Preço</label>
                    <input id="price" value={values.price} type="number" name="price" onChange={onChange}  />
                </div>
                <div>
                    <button>Salvar</button>
                </div>
            </form>
            )}
        </div>
    )
}

export default PromotionForm;