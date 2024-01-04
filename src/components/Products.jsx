import ProductCard from "../components/ProductCard";
import { useGetProductsQuery } from "../redux/api/dummyApi"
import PropTypes from 'prop-types'
import { skipToken } from '@reduxjs/toolkit/query/react'
import { useDebounce } from 'use-debounce'


const Products = ({ query = '', lower, upper }) => {
  const [searchTerm] = useDebounce(query, 1500)
  const { data } = useGetProductsQuery(searchTerm ?? skipToken);
  const filtered = data && data.products.filter(p => (
    p.price <= upper && p.price >= lower
    // p.price <= upper && p.price >= lower && p.title.toLowerCase().includes(query.toLowerCase())
  ))
  console.log(filtered);

  return (
    <div className="products-container">
      {data && filtered.map((p) => (
        <ProductCard
          key={p.id}
          title={p.title}
          id={p.id}
          price={p.price}
          description={p.description.substring(0, 40) + '...'}
          url={p.thumbnail}
        />
      ))}
    </div>
  )
}

export default Products;

Products.propTypes = {
  query: PropTypes.string,
  lower: PropTypes.number,
  upper: PropTypes.number
}
