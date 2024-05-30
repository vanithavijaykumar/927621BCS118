import React, { useState, useEffect } from 'react';
import ProductCard from '../components/ProductCard';
import FilterBar from '../components/FilterBar';
import Pagination from '../components/Pagination';
import { fetchProducts } from '../api';

const AllProductsPage = () => {
  const [products, setProducts] = useState([]);
  const [filters, setFilters] = useState({}); // Manage filters state
  const [pagination, setPagination] = useState({ currentPage: 1, totalPages: 1 });

  useEffect(() => {
    fetchData();
  }, [filters, pagination.currentPage]); // Fetch data when filters or pagination changes

  const fetchData = async () => {
    const data = await fetchProducts(filters, pagination.currentPage);
    setProducts(data.products);
    setPagination({ currentPage: data.currentPage, totalPages: data.totalPages });
  };

  const handleFilterChange = (newFilters) => {
    setFilters(newFilters);
  };

  const handlePageChange = (newPage) => {
    setPagination({ ...pagination, currentPage: newPage });
  };

  return (
    <div>
      <FilterBar onChange={handleFilterChange} />
      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
      <Pagination
        currentPage={pagination.currentPage}
        totalPages={pagination.totalPages}
        onPageChange={handlePageChange}
      />
    </div>
  );
};

export default AllProductsPage;