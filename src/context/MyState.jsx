import React, { useContext, useEffect, useState } from "react";
import { Mycontext } from "./MyCotext";
import { toast } from "react-toastify";
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDocs,
  onSnapshot,
  orderBy,
  query,
  QuerySnapshot,
  setDoc,
} from "firebase/firestore";
import { fireDb } from "../firebase/FirebaseConfig";

export default function MyState({ children }) {
  const [mode, setMode] = useState("light");
  const toggleMode = () => {
    if (mode === "light") {
      setMode("dark");
      document.body.style.backgroundColor = "rgb(17,24,39)";
    } else {
      setMode("light");
      document.body.style.backgroundColor = "white";
    }
  };

  const [loading, setLoading] = useState(false);
  const [products, setProducts] = useState({
    title: null,
    price: null,
    imageurl: null,
    category: null,
    description: null,
    time: new Date().toLocaleString("en-us", {
      month: "short",
      day: "2-digit",
      year: "numeric",
    }),
  });

  const addProduct = async () => {
    setLoading(true);
    if (
      products.title === null ||
      products.price === null ||
      products.imageurl === null ||
      products.category === null ||
      products.description === null
    ) {
      toast.error("All fields are required");
    }
    try {
      const productRef = collection(fireDb, "products");
      await addDoc(productRef, products);
      toast.success("product added successfully");
      setTimeout(() => {
        window.location.href = "/";
      }, 1000);
      getProduct();
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };
  const [product, setProduct] = useState([]);
  const getProduct = async () => {
    setLoading(true);
    try {
      const q = query(
        collection(fireDb, "products"),
        orderBy("time")
        // limit(5)
      );
      const data = onSnapshot(q, (QuerySnapshot) => {
        let productsArray = [];
        QuerySnapshot.forEach((doc) => {
          productsArray.push({ ...doc.data(), id: doc.id });
        });
        setProduct(productsArray);
        setLoading(false);
      });
      return () => data;
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  useEffect(() => {
    getProduct();
  }, []);

  const edithandle = (item) => {
    setProducts(item);
  };
  const updateProduct = async () => {
    setLoading(true);
    try {
      await setDoc(doc(fireDb, "products", products.id), products);
      toast.success("product updated successfully");
      getProduct();
      setTimeout(() => {
        window.location.href = "/dashboard";
      }, 1000);
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  const deletePorduct = async (item) => {
    setLoading(true);
    try {
      await deleteDoc(doc(fireDb, "products", item.id));
      toast.success("Product deleted successfully");
      getProduct();
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  const [order, setOrder] = useState([]);

  const getOrderData = async () => {
    setLoading(true);
    try {
      const result = await getDocs(collection(fireDb, "order"));
      const ordersArray = [];
      result.forEach((doc) => {
        ordersArray.push(doc.data());
        setLoading(false);
      });
      setOrder(ordersArray);
      console.log(ordersArray);
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };
  const [user, setUser] = useState([]);

  const getUserData = async () => {
    setLoading(true);
    try {
      const result = await getDocs(collection(fireDb, "users"));
      const usersArray = [];
      result.forEach((doc) => {
        usersArray.push(doc.data());
        setLoading(false);
      });
      setUser(usersArray);
      console.log(usersArray);
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };
  useEffect(() => {
    getOrderData();
    getUserData();
  }, []);

  const [searchkey, setSearchkey] = useState("");
  const [filterType, setFilterType] = useState("");
  const [filterPrice, setFilterPrice] = useState("");

  return (
    <div>
      <Mycontext.Provider
        value={{
          mode,
          toggleMode,
          loading,
          setLoading,
          products,
          setProducts,
          addProduct,
          product,
          edithandle,
          updateProduct,
          deletePorduct,
          order,
          user,
          searchkey,
          setSearchkey,
          filterType,
          setFilterType,
          filterPrice,
          setFilterPrice,
        }}
      >
        {children}
      </Mycontext.Provider>
    </div>
  );
}
