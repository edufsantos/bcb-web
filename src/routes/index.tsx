import React from "react";
import {
  BrowserRouter,
  Navigate,
  Route,
  Routes as RoutesDOM,
} from "react-router-dom";
import LoginAdmin from "../pages/auth/login/Admin";
import PlanList from "@pages/admin/plan/List";
import FormPlan from "@pages/admin/plan/Form";
import CustomPlanList from "@pages/customer/plan/List";
import { LayoutAdminCustomer } from "@components/layouts/Customer";
import Main from "@pages/auth/Main";
import Home from "@pages/admin/Home";
import LoginCutomer from "@pages/auth/login/Customers";
import LayoutAuth from "@components/layouts/Auth";
import CreateAccountEmployee from "@pages/auth/createAccount/Admin";
import MessageList from "@pages/customer/messages/List";
import { LayoutAdminEmployee } from "@components/layouts/Admin";
import CustomerList from "@pages/admin/customer/List";
import CustomerForm from "@pages/admin/customer/Form";
import CreateAccountCustomer from "@pages/auth/createAccount/Customer";

const Routes: React.FC = () => {
  return (
    <BrowserRouter>
      <RoutesDOM>
        <Route path="auth" element={<LayoutAuth />}>
          <Route path="" element={<Main />} />
          <Route
            path="employee/create-account"
            element={<CreateAccountEmployee />}
          />
          <Route path="employee/login" element={<LoginAdmin />} />
          <Route path="customer/login" element={<LoginCutomer />} />
          <Route
            path="customer/create-account"
            element={<CreateAccountCustomer />}
          />
          <Route path="*" element={<Navigate to="" />} />
        </Route>
        <Route path="admin/customer" element={<LayoutAdminCustomer />}>
          <Route path="messages" element={<MessageList />} />
          <Route path="plan/list" element={<CustomPlanList />} />
          <Route path="*" element={<Navigate to="messages" />} />
        </Route>
        <Route path="admin/employee" element={<LayoutAdminEmployee />}>
          <Route path="home" element={<Home />} />
          <Route path="plan/list" element={<PlanList />} />
          <Route path="plan/edit/:id" element={<FormPlan />} />
          <Route path="customer/list" element={<CustomerList />} />
          <Route path="customer/edit/:id" element={<CustomerForm />} />
          <Route path="*" element={<Navigate to="home" />} />
        </Route>
        <Route path="*" element={<Navigate to="/admin/customer" />} />
      </RoutesDOM>
    </BrowserRouter>
  );
};

export default Routes;
