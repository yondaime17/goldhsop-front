import React, { useState, useEffect } from 'react'
import Products from '../../components/products/Products'
import { useParams } from 'react-router-dom';
import queryString from 'query-string';

const Searched = ({ products }) => {
    const { category, standard, minPrice, maxPrice, minWeight, maxWeight } = useParams();

    // Initialize variables to store the extracted values
    const [categoryValues, setCategoryValues] = useState([]);
    const [standardValues, setStandardValues] = useState([]);
    const [minPriceValue, setMinPriceValue] = useState(null);
    const [maxPriceValue, setMaxPriceValue] = useState(null);
    const [minWeightValue, setMinWeightValue] = useState(null);
    const [maxWeightValue, setMaxWeightValue] = useState(null);

    useEffect(() => {
        // Parse query parameters from URL
        const queryParams = queryString.parse(window.location.search);
        console.log(queryParams);
    
        // Extract values for category if present
        const categoryString = queryParams.categories || '';
        const categoryValues = categoryString.split(",").map(category => category.trim());
        setCategoryValues(categoryValues.filter(category => category)); // Filter out any empty strings
    
        // Extract values for standard if present
        const standardString = queryParams.standard || '';
        const standardValues = standardString.split(",").map(standard => standard.trim());
        setStandardValues(standardValues.filter(standard => standard)); // Filter out any empty strings
    
        // Extract value for minPrice if present
        const minPriceValue = queryParams.minPrice ? parseFloat(queryParams.minPrice) : null;
        setMinPriceValue(minPriceValue);
    
        // Extract value for maxPrice if present
        const maxPriceValue = queryParams.maxPrice ? parseFloat(queryParams.maxPrice) : null;
        setMaxPriceValue(maxPriceValue);
    
        // Extract value for minWeight if present
        const minWeightValue = queryParams.minWeight ? parseFloat(queryParams.minWeight) : null;
        setMinWeightValue(minWeightValue);
    
        // Extract value for maxWeight if present
        const maxWeightValue = queryParams.maxWeight ? parseFloat(queryParams.maxWeight) : null;
        setMaxWeightValue(maxWeightValue);
    }, []);
    
    
    

    console.log(categoryValues, "values")


    return (
        <div className='searched_page page'>
            <Products products={products} searched={true}/>
        </div>
    );
}

export default Searched;
