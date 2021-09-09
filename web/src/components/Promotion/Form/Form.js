import React, { useState } from "react";
import { useHistory } from "react-router";
import axios from 'axios';
import './Form.css';

const initialValue = {
    title: '',
    url: '',
    imageUrl: '',
    price: 0
}

const PromotionForm = () => {
    const [values, setValues] = useState(initialValue);
    const history = useHistory();

    function onChange(ev) {
        const { name, value } = ev.target;
        setValues({ ...values, [name]: value });
    }
    function onSubmit(ev){
        ev.preventDefault();
        axios.post('http://localhost:5000/promotions', values)
            .then(res => {
                history.push('/');
            });
    }

    return (
        <div>
            <h1>Promo show</h1>
            <h2>Nova Promoção</h2>

            <form  onSubmit={onSubmit}>
                <div className="promotion-form__group">
                    <label htmlFor="title">Título</label>
                    <input id="title" type="text" name="title" onChange={onChange} />
                </div>
                <div className="promotion-form__group">
                    <label htmlFor="url">Url</label>
                    <input id="url" type="text" name="url" onChange={onChange} />
                </div>
                <div className="promotion-form__group">
                    <label htmlFor="imageUrl">Imagem (Url)</label>
                    <input id="imageUrl" type="text" name="imageUrl" onChange={onChange} />
                </div>
                <div className="promotion-form__group">
                    <label htmlFor="price">Preço</label>
                    <input id="price" type="number" name="price" onChange={onChange}  />
                </div>
                <div>
                    <button>Salvar</button>
                </div>
            </form>
        </div>
    )
}

export default PromotionForm;