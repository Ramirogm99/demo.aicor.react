import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router";

import {
  getCategories,
  getProducts,
  getUserDetails,
} from "../../../axios/api.tsx";
import { AppContext } from "../../../context.tsx";
import MainLayout from "../../../components/layout/MainLayout";
import Categories from "../../../components/ui/categories.tsx";
import Products from "../../../components/ui/products";
import AddCartModal from "../../../components/ui/addCartModal.tsx";

export default function Dashboard() {
  const navigate = useNavigate();
  const [userDetails, setUserDetails] = useState({});
  const [categories, setCategories] = useState([]);
  const accessToken = useContext(AppContext).accessToken;
  const [products, setProducts] = useState([]);
  const [modalCart, setModalCart] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<string[]>([]);
  const filterProducts = (category: string[]) => {
    getProducts(category).then((data) => {
      if (data.error) {
        console.log("Error fetching products:", data.error);
        return;
      }
      setProducts(data);
    });
  };
  const resetFilters = () => {
    getProducts([]).then((data) => {
      if (data.error) {
        console.log("Error fetching products:", data.error);
        return;
      }
      setProducts(data);
    });
  };
  const openModal = (product: string[]) => {
    setSelectedProduct(product);
    setModalCart(true);
  };
  const closeModal = () => {
    setModalCart(false);
    setSelectedProduct([]);
  };
  const UserDetails = () => {
    getUserDetails(accessToken).then((data) => {
      if (data.error) {
        navigate("/");
        return;
      }
      setUserDetails(data);
    });
  };
  useEffect(() => {
    UserDetails();
    if (!accessToken) {
      navigate("/");
    }
    getProducts([]).then((data) => {
      if (data.error) {
        console.log("Error fetching products:", data.error);
        return;
      }
      setProducts(data);
    });

    getCategories().then((data) => {
      if (data.error) {
        console.log("Error fetching categories:", data.error);
        return;
      }
      setCategories(data);
    });
  }, [navigate, accessToken, userDetails.email, userDetails.name]);

  return (
    <>
      {userDetails ? (
        <>
          <MainLayout user={userDetails}>
            <div className="grid grid-cols-6 md:grid-cols-6  h-full inline-flex w-full">
              <div className="py-4 px-2 mt-5">
                <Categories
                  data={categories}
                  onFilterChange={filterProducts}
                  onFilterReset={resetFilters}
                />
              </div>
              <div className="p-4 col-span-5 w-full">
                <Products data={products} onAddToCart={openModal} />
              </div>
            </div>
          </MainLayout>
          <AddCartModal
            product={selectedProduct}
            show={modalCart}
            onClose={closeModal}
          />
        </>
      ) : (
        <div>
          <h1>Loading...</h1>
        </div>
      )}
    </>
  );
}
