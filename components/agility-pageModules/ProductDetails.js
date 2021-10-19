import React from "react";
import { renderHTML } from "@agility/nextjs";
import { AgilityImage } from "@agility/nextjs"

const ProductDetails = ({ dynamicPageItem }) => {
  // post fields
  const product = dynamicPageItem.fields;
  // category
  const category = product.category?.fields.title || "Uncategorized";

  // format date
  const dateStr = new Date(product.date).toLocaleDateString();

  return (
   
    <div className="container flex flex-col items-center px-5 py-16 mx-auto md:flex-row lg:px-28">
        <div className="flex flex-col items-start mb-16 text-left lg:flex-grow md:w-1/2 lg:pr-24 md:pr-16 md:mb-0">
            <h1 className="mb-8 text-2xl font-black tracking-tighter text-black md:text-5xl title-font">{product.title}</h1>
            <p className="mb-8 text-base leading-relaxed text-left text-blueGray-600 "> Deploy your mvp in minutes, not days. WT offers you a a wide selection swapable sections for your landing page. </p>
            <div className="flex flex-col justify-center lg:flex-row">
                <button className="flex items-center px-6 py-2 mt-auto font-semibold text-white transition duration-500 ease-in-out transform bg-blue-600 rounded-lg hover:bg-blue-700 focus:shadow-outline focus:outline-none focus:ring-2 ring-offset-current ring-offset-2" onClick={clicked}> Show me </button>
            </div>
        </div>
        <div className="w-full lg:w-1/3 lg:max-w-lg md:w-1/2">
            <img className="object-cover object-center rounded-lg " alt="hero" src={product.image.url} />
        </div>
    </div>
  );
};

const clicked = () =>{
    alert('clicked')
}
export default ProductDetails;
