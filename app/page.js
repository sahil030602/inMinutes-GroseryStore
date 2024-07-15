import Banner from "./_components/Banner";
import Categories from "./_components/Categories";
import Footer from "./_components/Footer";
import ProductList from "./_components/ProductList";
import Slider from "./_components/Slider";

export default  async function Home() {  
    return (
      <div className=" p-2 px-16">
        <Slider />
        <Categories/>
        <ProductList/>
        <Banner/> 
        <Footer/> 
      </div>
  );
}
