import { useState } from 'react';
import axios from 'axios';
import useDeboucedPromise from './useDebounce';

const initialRequestInfo = {
    error: null,
    data: null,
    loading: false
}

export default function useApi(config) {
    const [requestInfo,setRequestInfo] = useState(initialRequestInfo);
    const deBounceAxios = useDeboucedPromise(axios,config.deBounceDelay);
    
        async function call(localConfig) {
            
            let response = null;
            const finalConfig = {
                baseURL: 'http://localhost:5000',
                ...config,
                ...localConfig
            }
            if(!finalConfig.quietly){
                setRequestInfo({
                    ...initialRequestInfo,
                    loading: true
                });
            }
            const fn = finalConfig.debounced ? deBounceAxios : axios;
            try{        
                response = await fn(finalConfig);

                setRequestInfo({
                    ...initialRequestInfo,
                    data: response.data
                });
            }catch (error) {
                setRequestInfo({
                    ...initialRequestInfo,
                    error
            });
        }
            if(config.onCompleted) {
                config.onCompleted(response);
            }
        }

    

    return [
        call,
        requestInfo
    ];
}