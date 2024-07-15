const { default: axios } = require("axios");

const axiosClient = axios.create({
  baseURL: process.env.NEXT_PUBLIC_BACKEND_BASE_URL + "/api",
});
const getCategory = async () => {
  try {
    const data = await axiosClient.get("/categroys?populate=*");
    return data?.data;
  } catch (error) {
    console.log(error);
  }
};
const getSlider = async () => {
  try {
    const data = await axiosClient.get("/sliders?populate=*");
    return data?.data;
  } catch (error) {
    console.log(error);
  }
};
const getProductItem = async () => {
  try {
    const data = await axiosClient.get("/product-items?populate=*");
    return data?.data;
  } catch (error) {
    console.log(error);
  }
};
const getProductByCategory = async () => {
  try {
    const data = await axiosClient.get("/categroys/id?populate=*");
    // console.log(data)
    return data?.data;
  } catch (error) {
    console.log(error);
  }
};
const registerUser = (userName, email, password) =>
  axiosClient.post("/auth/local/register", {
    username: userName,
    email: email,
    password: password,
  });

const SignIn = (email, password) =>
  axiosClient.post("/auth/local", {
    identifier: email,
    password: password,
  });

const addToCart = (data, jwt) =>
  axiosClient.post("/user-carts", data, {
    headers: {
      Authorization: "Bearer " + jwt,
    },
  });

const getCartItems = (userid, jwt) =>
  axiosClient
    .get(
      "/user-carts?filters[users_permissions_user][$eq]=" +
        userid +
        "&[populate][product_item][populate][images][populate][0]=url",
      {
        headers: {
          Authorization: "Bearer " + jwt,
        },
      }
    )
    .then((resp) => {
      const data = resp.data.data;
      const cartItemList = data.map((item, index) => ({
        name: item.attributes?.product_item?.data?.attributes?.name,
        quantity: item.attributes?.quantity,
        amount: item.attributes?.amount,
        images:
          item.attributes?.product_item?.data?.attributes?.images?.data[0]
            ?.attributes?.url,
        actualPrice: item.attributes?.product_item?.data?.attributes?.mrp,
        id: item.id,
        product_item: item.attributes?.product_item?.data?.id,
        Qunatity: item.attributes?.quantity,
        price: item.attributes?.amount,
      }));
      return cartItemList;
    });

const deleteCartItems = (id, jwt) =>
  axiosClient.delete("/user-carts/" + id, {
    headers: {
      Authorization: "Bearer " + jwt,
    },
  });
const createOrder = (data, jwt) =>
  axiosClient.post("/orders", data, {
    headers: {
      Authorization: "Bearer " + jwt,
    },
  });

const getMyOrderDetails = (userid,jwt) =>
  axiosClient.get(
    "/orders?filters[userid][$eq]=" +
      userid +
      "&populate[OrderItemList][populate][product_item][populate][images]=url",
      {headers:{
        Authorization:"Bearer "+jwt
      }}
  ).then(resp=>{
    const response=resp.data.data;
    const orders=response.map((item)=>({
      id:item.id,
      totalOrderAmount:item.attributes.totalOrderAmount,
      paymentid:item.attributes.paymentid,
      OrderItemList:item.attributes.OrderItemList,
      createdAt:item.attributes.createdAt,
     images:item.attributes?.OrderItemList[0]?.product_item?.data?.attributes?.images?.data[0]?.attributes?.url
    }))
    return orders
  })
export default {
  getCategory,
  getSlider,
  getProductItem,
  getProductByCategory,
  registerUser,
  SignIn,
  addToCart,
  getCartItems,
  deleteCartItems,
  createOrder,
  getMyOrderDetails
};
