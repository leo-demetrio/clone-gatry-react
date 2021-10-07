import React, { useEffect, useState } from "react";
import { useHistory } from "react-router";
import './Form.css';
import useApi from "components/utils/useApi";
import Field from 'components/Form/Field/Field';
import { Formik, Form } from "formik";
import schema from './schema';

const initialValue = {
    title: '',
    url: '',
    imageUrl: '',
    price: 0
}

const PromotionForm = ({ id }) => {
    // const [values, setValues] = useState(id ? null: initialValue);
    const history = useHistory();
    const [load, loadInfo] = useApi({
        url: `/promotions/${id}`,
        method: 'get',
        // onCompleted: (res) => {
        //     setValues(res.data);
        // }
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
    
    function onSubmit(formValues){        
        save({
            data: formValues
        });
    }

    const values = id ? loadInfo.data : initialValue;


    return (
        <div>
            <h1>Promo show</h1>
            <h2>Nova Promoção</h2>
            {!values ? (<div>Carregando...</div>): (
            
            <Formik 
                initialValues={values}
                validationSchema={schema}
                onSubmit={onSubmit}
                render={() => (
                <Form>
                    {saveInfo.loading && <span>Salvando dados...</span>}
                    <div className="promotion-form__group">
                        <Field type="text" name="title" label="Título" />
                    </div>
                    <div className="promotion-form__group">
                        <Field type="text" name="url" label="Url" />
                    </div>
                    <div className="promotion-form__group">
                        <Field type="text" name="imageUrl" label="Imagem (Url)" />
                    </div>
                    <div className="promotion-form__group">
                        <Field type="number" name="price" label="Preço" />
                    </div>
                    <div>
                        <button>Salvar</button>
                    </div>
                </Form>
                )} />
            )}
        </div>
    )
}

export default PromotionForm;