import Cookies from "js-cookie";
const instance = {
  baseURL: "http://laravel.demo.aicor.com/api",
  timeout: 20000,
};
export async function sendUserDetails(email: string, name: string) {
  const response = await fetch(`${instance.baseURL}/auth/login`, {
    method: "POST",
    credentials: "include",
    mode: "cors",
    headers: {
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "POST",
    },
    body: JSON.stringify({ email, name }),
  });
  if (!response.ok) {
    throw new Error("Network response was not ok");
  }
  return response.json();
}
export const handleGoogleLogin = async () => {
  const callbackUrl = `${window.location.origin}`;
  const googleClientId =
    "847950741061-9prq1l8s07j1v57t5q6jpt60b66e9b65.apps.googleusercontent.com";
  const targetUrl = `https://accounts.google.com/o/oauth2/auth?redirect_uri=${encodeURIComponent(
    callbackUrl
  )}&response_type=token&client_id=${googleClientId}&scope=openid%20email%20profile`;
  window.location.href = targetUrl;
};
export const getUserDetails = async (accessToken: string | undefined) => {
  if (!accessToken) return;

  const response = await fetch(
    `https://www.googleapis.com/oauth2/v1/userinfo?alt=json&access_token=${accessToken}`
  );
  const data = await response.json();

  return data;
};
export const getCategories = async () => {
  const response = await fetch(`${instance.baseURL}/category`);
  const data = await response.json();
  return data;
};
export const getProducts = async (category: string[]) => {
  const response = await fetch(`${instance.baseURL}/product`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE,PATCH,OPTIONS",
    },
    body: JSON.stringify({ category }),
  });
  const data = await response.json();
  return data;
};

export const SentCartToPayment = async (email: string[]) => {
  const cart = JSON.parse(Cookies.get("cart") || "[]");

  if (!cart || cart.length === 0) {
    throw new Error("Cart is empty");
  }
  if (!Array.isArray(cart)) {
    throw new Error("Cart data is not in the expected format");
  }
  const response = await fetch(`${instance.baseURL}/order/payment-done`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE,PATCH,OPTIONS",
    },
    body: JSON.stringify({ cart: cart, userdata: email }),
  });
  const data = await response.json();
  return data;
};
export const getOrderHistory = async (email: string) => {
  const response = await fetch(`${instance.baseURL}/order`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE,PATCH,OPTIONS",
    },
    body: JSON.stringify({ email }),
  });
  if (!response.ok) {
    throw new Error("Failed to fetch order history");
  }
  const data = await response.json();
  return data;
};
