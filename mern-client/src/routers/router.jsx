import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import Home from "../home/home";
import Subscription from "../subscription/Subscription";
import About from "../components/About";
import Booking from "../booking/Booking";
import Contact from "../components/Contact";
import CustomerLogin from "../CustomerLogin"; // Assuming this is the login component you want to use
import CustomerSignup from "../CustomerSignup";
import LoginDashboard from "../LoginDashboard";
import ServiceProviderLogin from "../ServiceProviderLogin";
import ServiceProviderSignup from "../ServiceProviderSignup";
import AdminLogin from "../AdminLogin";
import CustomerDashboard from "../dashboard/CustomerDashboard";
import StationRegistration from "../StationRegistration";
import MyBookings from "../components/MyBookings";
import Login from "../Login"; // The login page component
import ServiceProviderDashboard from "../dashboard/ServiceProviderDashboard";
import Payment from "../booking/Payment";
import PaymentSuccess from "../booking/PaymentSuccess";
import LoginForm from "../LoginForm";
import ProtectedPage from "../ProtectedPage";
import SignUp from "../SignUp";
import ProviderStations from "../components/ProviderStations";
import AdminDashboard from "../dashboard/adminDashboard";

const router = createBrowserRouter([
  
  {
    path: "/",
    element: <App />,
    children: [
      { path: "/", element: <Home /> },
      { path: "/booking", element: <Booking /> },
      { path: "/subscription", element: <Subscription /> },
      { path: "/about", element: <About /> },
      { path: "/contact", element: <Contact /> },
      { path: "/signup", element: <SignUp /> },
      { path: "/login", element: <Login /> },
      { path: "/serviceProviderDashboard", element: <ServiceProviderDashboard /> },
      { path: "/loginServiceProvider", element: <ServiceProviderLogin /> },
      { path: "/signupServiceProvider", element: <ServiceProviderSignup /> },
      { path: "/dashboardCustomer", element: <CustomerDashboard /> },
      { path: "/bookings", element: <Booking /> },
      { path: "/stationRegistration", element: <StationRegistration /> },
      { path: "/myBookings", element: <MyBookings /> },
      { path: "/payments", element: <Payment /> },
      { path: "/paymentSuccess", element: <PaymentSuccess /> },
      { path: "/protected", element: <ProtectedPage /> },
      { path: "/customerDashboard", element: <CustomerDashboard /> },
      { path: "/loginForm", element: <LoginForm /> },
      {path: "/stations", element: <StationRegistration /> },
      {path: "/providerStations", element: <ProviderStations /> },
      {path: "/adminLogin", element: <AdminLogin /> },
      {path: "/adminDashboard", element: <AdminDashboard /> },
      
    ]
  }
]);

export default router;
