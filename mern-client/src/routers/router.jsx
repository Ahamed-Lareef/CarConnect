import {
    createBrowserRouter,
    RouterProvider,
  } from "react-router-dom";
import App from "../App";
import Home from "../home/home";
import Subscription from "../subscription/Subscription";
import About from "../components/About";
import Booking from "../booking/Booking";
import Contact from "../components/Contact";
import CustomerLogin from "../CustomerLogin";
import CustomerSignup from "../CustomerSignup";
import LoginDashboard from "../LoginDashboard";
import ServiceProviderLogin from "../ServiceProviderLogin";
import ServiceProviderSignup from "../ServiceProviderSignup";
import AdminLogin from "../AdminLogin";
import CustomerDashboard from "../dashboard/CustomerDashboard";
import StationRegistration from "../StationRegistration";
import MyBookings from "../components/MyBookings";
import Login from "../Login";
import ServiceProviderDashboard from "../dashboard/ServiceProviderDashboard";

  const router = createBrowserRouter([
    {
      path: "/",
      element: <App/>,
      children: [
        { 
            path: "/", 
            element: <Home/>
        },
        {
          path: "/booking",
          element: <Booking/>
        },
        {
            path: "/subscription",
            element: <Subscription/>
        },
        {
          path: "/about",
          element: <About/>
        },
        {
          path: "/contact",
          element: <Contact/>
        },
    
        {
          path: "/signup",
          element: <CustomerSignup/>
        },
        {
          path: "/serviceProviderDashboard",
          element: <ServiceProviderDashboard/>
        },
        {
          path: "/loginServiceProvider",
          element: <ServiceProviderLogin/>
        },
        {
          path: "/signupServiceProvider",
          element: <ServiceProviderSignup/>
        },
        {
          path: "/login",
          element: <Login/>
        },
        {
          path: "/dashboardCustomer",
          element: <CustomerDashboard/>
        },
        {
          path: "/bookings",
          element: <Booking/>
        },
        {
          path: "/stationRegistration",
          element: <StationRegistration/>
        },
        {
          path: "/myBookings",
          element: <MyBookings/>
        },
       
      ]   
    },
  ]);

  export default router;