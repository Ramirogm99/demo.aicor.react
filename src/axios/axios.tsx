//TUNNEL_URL = "https://pedidos.campoaras.net/api/"
// DEV_BASE_URL = "http://192.168.1.93/inpaluc-pedidos/public/api/"

const instance = {
  baseURL: process.env.REACT_APP_URL,
  timeout: 20000,
  // cors: true,
  headers: {
    "Content-Type": "application/json",
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE,PATCH,OPTIONS",
  },
}