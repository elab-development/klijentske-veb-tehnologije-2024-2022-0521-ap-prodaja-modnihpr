"use client";

import { useState, useEffect } from "react";
import Container from "@/components/Container";
import { AllProducts } from "../../../type";
import ProductsData from "@/components/ProductsData";
import { useRouter } from "next/navigation";

type Props = {
  searchParams: { [key: string]: string | string[] | undefined };
};

const PRODUCTS_PER_PAGE = 8;

const ProductPage = ({ searchParams }: Props) => {
  const router = useRouter();
  const initialPage = parseInt(searchParams.page as string || "1", 10);
  
  // State for product data, filters, pagination, and displayed products
  const [data, setData] = useState<AllProducts[]>([]);
  const [displayedProducts, setDisplayedProducts] = useState<AllProducts[]>([]);
  const [currentPage, setCurrentPage] = useState<number>(initialPage);
  const [totalPages, setTotalPages] = useState<number>(1);
  const [filters, setFilters] = useState<{
    category: string;
    rating: string;
    price: string;
  }>({
    category: '',
    rating: '',
    price: ''
  });

  useEffect(() => {
    // Update filters from searchParams when the component mounts
    setFilters({
      category: searchParams.category as string || '',
      rating: searchParams.rating as string || '',
      price: searchParams.price as string || ''
    });

    const fetchProducts = async () => {
      try {
        const res = await fetch("https://fakestoreapiserver.reactbd.com/smart");
        if (!res.ok) {
          throw new Error("Failed to fetch products");
        }
        const products = await res.json();
        
        setData(products);
        const totalPages = Math.ceil(products.length / PRODUCTS_PER_PAGE);
        setTotalPages(totalPages);
        
        // Update displayed products for the current page
        updateDisplayedProducts(initialPage);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    fetchProducts();
  }, [initialPage, searchParams]);

  useEffect(() => {
    updateDisplayedProducts(currentPage);
  }, [filters, currentPage]);

  const updateDisplayedProducts = (page: number) => {
    let filteredData = data;

    if (filters.category) {
      filteredData = filteredData.filter(product => product.category === filters.category);
    }

    if (filters.rating) {
      filteredData = filteredData.filter(product => product.rating === parseInt(filters.rating, 10));
    }

    // Sort by price if the price filter is set
    if (filters.price === 'low-to-high') {
      filteredData = filteredData.sort((a, b) => a.price - b.price);
    } else if (filters.price === 'high-to-low') {
      filteredData = filteredData.sort((a, b) => b.price - a.price);
    }

    const startIndex = (page - 1) * PRODUCTS_PER_PAGE;
    const endIndex = startIndex + PRODUCTS_PER_PAGE;
    setDisplayedProducts(filteredData.slice(startIndex, endIndex));

    // Update total pages based on filtered data
    const totalPages = Math.ceil(filteredData.length / PRODUCTS_PER_PAGE);
    setTotalPages(totalPages);
  };

  const handleFilterChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFilters(prevFilters => ({
      ...prevFilters,
      [name]: value
    }));
    
    const queryParams: Record<string, string> = {
      ...filters,
      [name]: value,
      page: currentPage.toString()
    };

    const query = new URLSearchParams(queryParams).toString();
    router.push(`?${query}`);
  };

  const handlePageChange = (newPage: number) => {
    setCurrentPage(newPage);

    const queryParams: Record<string, string> = {
      ...filters,
      page: newPage.toString()
    };

    const query = new URLSearchParams(queryParams).toString();
    router.push(`?${query}`);
  };

  return (
    <div>
      <Container>
        <div>
          <p className="text-xl py-1 font-semibold">All Products</p>
          <div className="mb-4 flex flex-wrap gap-4">
            <label className="flex items-center space-x-2">
              <span className="text-lg font-medium">Category:</span>
              <select name="category" value={filters.category} onChange={handleFilterChange} className="p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500">
                <option value="">All</option>
                <option value="women">Women</option>
                <option value="men">Men</option>
                <option value="kids">Kids</option>
              </select>
            </label>
            <label className="flex items-center space-x-2">
              <span className="text-lg font-medium">Rating:</span>
              <select name="rating" value={filters.rating} onChange={handleFilterChange} className="p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500">
                <option value="">All</option>
                <option value="1">1</option>
                <option value="2">2</option>
                <option value="3">3</option>
                <option value="4">4</option>
                <option value="5">5</option>
              </select>
            </label>
            <label className="flex items-center space-x-2">
              <span className="text-lg font-medium">Price:</span>
              <select name="price" value={filters.price} onChange={handleFilterChange} className="p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500">
                <option value="">Sort by Price</option>
                <option value="low-to-high">Low to High</option>
                <option value="high-to-low">High to Low</option>
              </select>
            </label>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4">
            {displayedProducts.length > 0 ? (
              displayedProducts.map((item: AllProducts) => (
                <ProductsData key={item._id} item={item} />
              ))
            ) : (
              <p>No products available</p>
            )}
          </div>
          <div className="flex justify-center py-4">
            <nav>
              <ul className="flex space-x-2">
                {Array.from({ length: totalPages }, (_, index) => (
                  <li key={index + 1}>
                    <button
                      onClick={() => handlePageChange(index + 1)}
                      className={`px-4 py-2 border rounded-md ${currentPage === index + 1 ? 'bg-blue-500 text-white' : 'bg-white text-blue-500'}`}
                    >
                      {index + 1}
                    </button>
                  </li>
                ))}
              </ul>
            </nav>
          </div>
        </div>
      </Container>
    </div>
  );
};

export default ProductPage;
