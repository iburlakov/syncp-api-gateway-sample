import {createContext, useContext} from 'react';

const CacheContext = createContext();

function useCache() {
    return useContext(CacheContext) ;
}

export {CacheContext, useCache};