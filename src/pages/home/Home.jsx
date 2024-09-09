import React, { useContext } from "react";
import Layout from "../../components/layout/Layout";
import { Mycontext } from "../../context/MyCotext";
import Hero from "../../components/hero/Hero";
import Filter from "../../components/filter/Filter";
import Product from "../../components/product/Product";
import Testimonial from "../../components/testimonial/Testimonial";
function Home() {
  const context = useContext(Mycontext);
  const { name, roll } = context;
  return (
    <div>
      <Layout>
        <Hero />
        <Filter />
        <Product />
        <Testimonial />
      </Layout>
    </div>
  );
}

export default Home;
