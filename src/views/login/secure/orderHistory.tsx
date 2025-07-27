import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { getUserDetails, getOrderHistory } from "../../../axios/api.tsx";
import MainLayout from "../../../components/layout/MainLayout";
import { AppContext } from "../../../context.tsx";
import HistoryCard from "../../../components/ui/historyCard.tsx";
export const OrderHistory = () => {
  const [userDetails, setUserDetails] = useState(null);
  const [orderHistory, setOrderHistory] = useState([]);
  const accessToken = useContext(AppContext).accessToken;
  useEffect(() => {
    getUserDetails(accessToken).then((user) => {
      setUserDetails(user);
      if (user) {
        getOrderHistory(user.email).then((orders) => {
          console.log(orders[0]);
          setOrderHistory(orders);
        });
      }
    });
  }, []);

  return (
    <>
      {userDetails ? (
        <>
          <MainLayout user={userDetails}>
            <div className="grid grid-cols-2 grid-rows-auto md:grid-cols-2  h-full w-full">
              {orderHistory.map((order) => (
                <HistoryCard order={order} key={order.id} />
              ))}
            </div>
          </MainLayout>
        </>
      ) : (
        <div>
          <h1>Loading...</h1>
        </div>
      )}
    </>
  );
};
