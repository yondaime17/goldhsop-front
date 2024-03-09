import React, { useState, useEffect } from 'react'
import Products from '../../components/products/Products'
import { useParams } from 'react-router-dom';
import queryString from 'query-string';

const Searched = ({ products, categories }) => {
    const { category, standard, minPrice, maxPrice, minWeight, maxWeight, seller } = useParams();

    // Initialize variables to store the extracted values
    const [categoryValues, setCategoryValues] = useState([]);
    const [standardValues, setStandardValues] = useState([]);
    
    const [filteredProducts, setFilteredProducts] = useState(products);
    // const queryParams = queryString.parse(window.location.search);
    let filtered = [];


    useEffect(() => {
        category === "any" ? setCategoryValues([]) : setCategoryValues(category.split("_"))
        standard === "any" ? setStandardValues([]) : setStandardValues(standard.split("_"))



        categoryValues.length > 0 ?
        filtered = products.filter((el) => {
            return categoryValues.some((c) => {
              return c === el.category;
            }); 

    }) : null

    setFilteredProducts(filtered)


    }, [category, standard]);
    
    
    



    return (
        <div className='searched_page page'>
            <Products products={filteredProducts} searched={true}/>
        </div>
    );
}

export default Searched;
