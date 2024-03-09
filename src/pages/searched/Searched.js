import React, { useState, useEffect } from 'react';
import Products from '../../components/products/Products';
import { useParams } from 'react-router-dom';

import { Helmet } from 'react-helmet';

const Searched = ({ products }) => {
    const { category, standard, minPrice, maxPrice, minWeight, maxWeight, seller } = useParams();

    // Initialize variables to store the extracted values
    const [filteredProducts, setFilteredProducts] = useState(products);

    useEffect(() => {
        let filtered = [...products]; // Create a copy of the products array

        // Filter by category
        if (category && category !== "any") {
            const categoryValues = category.split("_");
            filtered = filtered.filter(product => categoryValues.includes(product.category));
        }

        // Filter by standard
        if (standard && standard !== "any") {
            const standardValue = parseInt(standard); // Convert standard to number
            filtered = filtered.filter(product => product.probe === standardValue);
        }

        // Filter by price
        if (minPrice && minPrice !== "any") {
            filtered = filtered.filter(product => product.price >= parseInt(minPrice));
        }
        if (maxPrice && maxPrice !== "any") {
            filtered = filtered.filter(product => product.price <= parseInt(maxPrice));
        }

        // Filter by weight
        if (minWeight && minWeight !== "any") {
            filtered = filtered.filter(product => product.weight >= parseInt(minWeight));
        }
        if (maxWeight && maxWeight !== "any") {
            filtered = filtered.filter(product => product.weight <= parseInt(maxWeight));
        }

        // Filter by seller
        if (seller && seller !== "any") {
            filtered = filtered.filter(product => product.owner === seller);
        }

        setFilteredProducts(filtered);
    }, [category, standard, minPrice, maxPrice, minWeight, maxWeight, seller, products]);

    return (
        <div className='searched_page page'>
            <Helmet>
                <title>Shopgold</title>
                <meta property="og:title" content="Shopgold.ge - Filtered by user choice" />
                <meta property="og:description" content="Buy/sell gold items - ოქროს ნივთების ყიდვა/გაყიდვა" />
                <meta property="og:image" content="https://res.cloudinary.com/dgyqivinq/image/upload/v1705410493/goldshop/srzisor9pwh2abgyfheh.jpg" />
            </Helmet>
            <Products products={filteredProducts} searched={true}/>
        </div>
    );
}

export default Searched;
