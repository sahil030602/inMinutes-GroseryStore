import React from 'react'
import GlobalApi from '../_utils/GlobalApi'
import ProductItem from './ProductItem'


const ProductList = async() => {
    const products = await GlobalApi.getProductItem()
  return (
   <div className='mt-10'>
  <h1 className="text-green-600 font-extrabold text-xl">Shop by the use of Category</h1>
     <div className='grid grid-cols-2md:grid-cols-3 lg:grid-cols-4 gap-5 mt-5'>
        {products?.data.map((product,index)=>(
            <ProductItem product={product} key={index}/>
        ))}
      
    </div>
   </div>
  )
}

export default ProductList
