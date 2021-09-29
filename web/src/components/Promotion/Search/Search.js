import React, { useState, useEffect, useRef } from "react";
import { Link } from 'react-router-dom';
import './Search.css';
import PromotionList from "../List/List";
import useApi from "components/utils/useApi";
import UIInfinitiScroll from "components/UI/InfiniteScroll/InfinitiScroll";

const baseParams = {
    _embed: 'comments',
    _order: 'desc',
    _sort: 'id',
    _limit: 3,
}
const PromotionSearch = () => {
    const [page,setPage] = useState(1);
    const mountRef = useRef(null);
    const [search, setSearch] = useState('');    
    const [load, loadInfo] = useApi({
        deBounceDelay: 300,
        url: '/promotions',
        method: 'get',
        params: {
           ...baseParams,
            _page: 1,
            title_like: search || undefined
        }
    });
   
    useEffect(() => {
        load({
            debounced: mountRef.current,
            params: {
                ...baseParams,
                _page: 1,
                title_like: search || undefined
            }
        })
       if(!mountRef.current) {
           mountRef.current = true;
       }
        //eslint-disable-next-line react-hooks/exhaustive-deps
    },[search]);

    function fetchMore() {
        const newPage = page + 1;
        load({
          isFetchMore: true,
          params: {
            ...baseParams,
            _page: newPage,
            title_like: search || undefined
          },
          updateRequestInfo: (newRequestInfo, prevRequestInfo) => ({
              ...newRequestInfo,
              data: [
                ...prevRequestInfo.data,
                ...newRequestInfo.data,
              ]
          }), 
        });
        setPage(newPage);
    }

    return (
        <div className="promotion-search">
            <header className="promotion-search__header">
                <h1>Promo show</h1>
                <Link to="/create">Nova Promoção</Link>
            </header>
            <input 
                className="promotion-search__input"
                type="search"
                placeholder="Buscar"
                value={search}
                onChange={(ev) => setSearch(ev.target.value)}
            />
            <PromotionList 
                promotions={loadInfo.data} 
                loading={loadInfo.loading}
                error={loadInfo.error}
            />
            {loadInfo.data && !loadInfo.loading && loadInfo.data?.length < loadInfo.total && (
                <UIInfinitiScroll fetchMore={fetchMore} />
            )}
         </div>
    )
}

export default PromotionSearch;