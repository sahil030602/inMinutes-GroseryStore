import GlobalApi from '@/app/_utils/GlobalApi'
import React from 'react'
import TopCategory from '../_components/TopCategory'
import ProductList from '@/app/_components/ProductList'

const ProductCategory = async({params}) => {
  console.log(decodeURIComponent(params?.categoryName));
    const productList= await  GlobalApi.getProductByCategory(decodeURIComponent(params?.categoryName))
    const data = await GlobalApi.getCategory();

  return (
    <div>
        <h1 className='p-4 font-bold text-5xl bg-primary text-white text-center h-[80px]'>  {params.categoryName}</h1>
        <TopCategory data ={data} selectedCategory={decodeURIComponent(params?.categoryName)}/>
        <div className='p-5 md:p-10'>
        <ProductList productList={productList}/>
        </div>
    </div>
  )
}

export default ProductCategory
