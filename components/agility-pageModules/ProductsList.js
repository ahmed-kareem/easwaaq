import React from "react";
import Link from "next/link";

const ProductsList = ({ module, customData }) => {
  // get posts
  const {prods} = customData
  

  // if there are no posts, display message on frontend
  if (prods.length <= 0) {
      console.log("hello")
    return (
      <div className="mt-44 px-6 flex flex-col items-center justify-center">
        <h1 className="text-3xl text-center font-bold">No posts available.</h1>
        <div className="my-10">
          <Link href={"/"}>
            <a className="px-4 py-3 my-3 border border-transparent text-base leading-6 font-medium rounded-md text-white bg-primary-600 hover:bg-primary-500 focus:outline-none focus:border-primary-700 focus:shadow-outline-primary transition duration-300">
              Return Home
            </a>
          </Link>
        </div>
      </div>
    );
  }

  return (
      
      <div>
       {prods.map((product)=>(       
        <div className="md:flex shadow-lg  mx-6 md:mx-auto my-40 max-w-lg md:max-w-2xl h-64">
        <img className="h-full w-full md:w-1/3  object-cover rounded-lg rounded-r-none pb-5/6" src={product.imageSrc} alt="bag" />
        <div className="w-full md:w-2/3 px-4 py-4 bg-white rounded-lg">
           <div className="flex items-center">
              <h2 className="text-xl text-gray-800 font-medium mr-auto"><Link href={'products/'+ product.title}>{product.title}</Link></h2>
             
           </div>
           <p className="text-sm text-gray-700 mt-4">
              Lorem, ipsum dolor sit amet consectetur Amet veritatis ipsam reiciendis numquam tempore commodi ipsa suscipit laboriosam, sit earum at sequ adipisicing elit. Amet veritatis ipsam reiciendis numquam tempore commodi ipsa suscipit laboriosam, sit earum at sequi.
           </p>
           <div className="flex items-center justify-end mt-4 top-auto">
              <button className=" bg-blue-600 text-gray-200 px-2 py-2 rounded-md " onClick={clicked}>Add to cart</button>
           </div>
        </div>
     </div>
       ))
    }
    </div>
  );
};

const clicked = () => {
    alert("clicked!")
}
// function to resole product urls
const resolvePostUrls = function (sitemap, products) {
  let dynamicUrls = {};
  products.forEach((product) => {
    Object.keys(sitemap).forEach((path) => {
      if (sitemap[path].contentID === product.contentID) {
        dynamicUrls[product.contentID] = path;
      }
    });
  });
  return dynamicUrls;
};

ProductsList.getCustomInitialProps = async ({
  agility,
  channelName,
  languageCode,
}) => {
  // set up api
  const api = agility;

  try {
    // get sitemap...
    let sitemap = await api.getSitemapFlat({
      channelName: channelName,
      languageCode,
    });

    // get posts...
    let rawproducts = await api.getContentList({
      referenceName: "productslist",
      languageCode,
	  contentLinkDepth: 2,
	  depth: 2,
	  take: 50
    });

    // resolve dynamic urls
    const dynamicUrls = resolvePostUrls(sitemap, rawproducts.items);

    const prods = rawproducts.items.map((product) => {
      //category
      const category = product.fields.category?.fields.title || "Uncategorized"

      // date
      const date = new Date(product.fields.date).toLocaleDateString();

      // url
      const url = dynamicUrls[product.contentID] || "#";

      // product image src
      let imageSrc = product.fields.image.url;

      // post image alt
      let imageAlt = product.fields.image?.label || null;

      return {
        contentID: product.contentID,
        title: product.fields.title,
        date,
        url,
        category,
        imageSrc,
        imageAlt,
      };
    });

    return {
        prods,
    };
  } catch (error) {
    if (console) console.error(error);
  }
};

export default ProductsList;
