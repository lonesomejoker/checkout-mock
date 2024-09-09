import { createBrowserRouter, createRoutesFromElements, Route } from "react-router-dom";
import Home from "../pages/Home";
import UserLayout from "../layout/UserLayout";
import PaymentProcedure from "../pages/PaymentProcedure";

export const MainRouter=createBrowserRouter(
    createRoutesFromElements(
        <Route>
            <Route path="/" element={<UserLayout/>}>
            <Route index element={<Home/>}/>
            </Route>
            <Route path="/paymentprocedure" element={<PaymentProcedure/>}/>
        </Route>
    )
)