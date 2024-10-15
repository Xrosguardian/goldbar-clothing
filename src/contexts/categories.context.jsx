import { createContext, useState, useEffect } from "react";
import SHOP_DATA from "../shop-data";

import { getCategoriesAndDocuments } from "../utils/firebase/firebase.utils";
import CategoryItem from "../components/directory-item/directory-item.component";


export const CategoriesContext = createContext({
    categoriesMap:{},
})

export const CategoriesProvider = ({children}) => {
    const [categoriesMap, setCategoriesMap] = useState({});
    //wE ONLY USE THIS ONCE AND ITS NOT RECOMMENDED TO DO THIS BECAUSE IT IS COMMINTING TO DB EVERYTIME
    // useEffect(()=>{
    //     addCollectionAndDocuments('categories', SHOP_DATA);
    // },[]);

    useEffect(()=>{
        const getCategoriesMap = async()=>{

            const catergoryMap = await getCategoriesAndDocuments()
            // console.log(catergoryMap);
            setCategoriesMap(catergoryMap)
        }
        getCategoriesMap()
    },[])
    const value = {categoriesMap}

    return(
        <CategoriesContext.Provider value={value}>{children}</CategoriesContext.Provider>
    )
}