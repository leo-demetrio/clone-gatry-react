import React, { useEffect, useState } from "react";
import { useHistory } from "react-router";
import axios from 'axios';
import './Form.css';

const initialValue = {
    title: '',
    url: '',
    imageUrl: '',
    price: 0
}

const PromotionForm = ({ id }) => {
    const [values, setValues] = useState(id ? null: initialValue);
    const history = useHistory();
 

    useEffect(() => {
        if(id) {
            axios.get('http://localhost:5000/promotions/' + id)
                .then(res => {
                    setValues(res.data);
                })
                .catch(err => {
                    console.log(err)
                });
        }
    },[]);

    function onChange(ev) {
        const { name, value } = ev.target;
        setValues({ ...values, [name]: value });
    }
    function onSubmit(ev){
        ev.preventDefault();
        const method = id ? 'put' : 'post';
        const url = id
            ? `http://localhost:5000/promotions/${id}`
            : `http://localhost:5000/promotions`;

        axios[method](url, values)
            .then(res => {
                history.push('/');
            });
    }

    // if(!values) {
    //     return <div>Carregando...</div>
    // }

    return (
        <div>
            <h1>Promo show</h1>
            <h2>Nova Promoção</h2>
            {!values ? (<div>Carregando...</div>): (

            <form  onSubmit={onSubmit}>
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