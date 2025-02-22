import { Route, Routes, Navigate } from "react-router-dom";
import "./App.css";
import LoginPage from "./pages/login/LoginPage";
import HomePage from "./pages/home/HomePage";
import SettingsPage from "./pages/home/settings/SettingsPage";
import PaymentsPage from "./pages/home/payments/PaymentsPage";
import BillsPage from "./pages/home/bills/BillsPage";
import ClientsPage from "./pages/home/clients/ClientsPage";
import ReportsPage from "./pages/home/reports/ReportsPage";
import { ProtectedRoute } from "./helpers/ProtectedRoute";
import Dashboardpage from "./pages/home/dashboard/DashboardPage";
import CatalogsPage from "./pages/home/catalogs/CatalogsPage";
import UserCatalog from "./pages/home/catalogs/components/user/UserCatalog";
import ClientCatalog from "./pages/home/catalogs/components/client/ClientCatalog";
import BankAccount from "./pages/home/catalogs/components/bankaccount/BankAccount";
import ChargeCatalog from "./pages/home/catalogs/components/charge/ChargeCatalog";
import TariffCatalog from "./pages/home/catalogs/components/tariff/TariffCatalog";
import CustomerSerices from "./pages/home/catalogs/components/services/CustomerSerices";
import CaptureInterface from "./pages/capture/CaptureInterface";
import PeriodCatalog from "./pages/home/catalogs/components/periods/PeriodCatalog";
import ServicesList from "./pages/home/services/components/ServicesList";
import ServiceCapture from "./pages/capture/pages/ServicePage/ServiceCapture";
import ServicesPage from "./pages/home/services/ServicesPage";
import MobileServiceList from "./pages/capture/pages/MobileServiceList/MobileServiceList";
import ServiceDetail from "./pages/home/services/components/ServiceDetail";

const App = () => {
  return (
    <div className="relative">
      <Routes>
        <Route
          path="/mobile"
          element={
            <ProtectedRoute>
              <CaptureInterface />
            </ProtectedRoute>
          }
        >
          <Route
            path=""
            element={<Navigate to={"/mobile/services"}></Navigate>}
          />
          <Route
            path="services"
            element={
              <ProtectedRoute>
                <MobileServiceList />
              </ProtectedRoute>
            }
          />
          <Route
            path="services/:serviceId"
            element={
              <ProtectedRoute>
                <ServiceCapture />
              </ProtectedRoute>
            }
          />
        </Route>
        <Route
          path="/"
          element={
            <ProtectedRoute>
              <HomePage />
            </ProtectedRoute>
          }
        >
          <Route
            path=""
            element={
              <ProtectedRoute>
                <Dashboardpage />
              </ProtectedRoute>
            }
          />

          <Route
            path="services"
            element={
              <ProtectedRoute>
                <ServicesPage />
              </ProtectedRoute>
            }
          >
            <Route path="" element={<Navigate to={"list"}></Navigate>} />
            <Route
              path="list"
              element={
                <ProtectedRoute>
                  <ServicesList />
                </ProtectedRoute>
              }
            />
            <Route
              path=":serviceId"
              element={
                <ProtectedRoute>
                  <ServiceDetail />
                </ProtectedRoute>
              }
            />
          </Route>
          <Route
            path="catalogs"
            element={
              <ProtectedRoute>
                <CatalogsPage />
              </ProtectedRoute>
            }
          >
            <Route path="" element={<Navigate to={"users"}></Navigate>} />
            <Route
              path="customer/:customerId?/services"
              element={
                <ProtectedRoute>
                  <CustomerSerices />
                </ProtectedRoute>
              }
            />
            <Route
              path="users"
              element={
                <ProtectedRoute>
                  <UserCatalog />
                </ProtectedRoute>
              }
            />
            <Route
              path="periods"
              element={
                <ProtectedRoute>
                  <PeriodCatalog />
                </ProtectedRoute>
              }
            />
            <Route
              path="clients"
              element={
                <ProtectedRoute>
                  <ClientCatalog />
                </ProtectedRoute>
              }
            />
            <Route
              path="banks"
              element={
                <ProtectedRoute>
                  <BankAccount />
                </ProtectedRoute>
              }
            />
            <Route
              path="tariffs"
              element={
                <ProtectedRoute>
                  <TariffCatalog />
                </ProtectedRoute>
              }
            />
            <Route
              path="charges"
              element={
                <ProtectedRoute>
                  <ChargeCatalog />
                </ProtectedRoute>
              }
            />
          </Route>
          <Route
            path="settings"
            element={
              <ProtectedRoute>
                <SettingsPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="payments"
            element={
              <ProtectedRoute>
                <PaymentsPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="bills"
            element={
              <ProtectedRoute>
                <BillsPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="clients"
            element={
              <ProtectedRoute>
                <ClientsPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="reports"
            element={
              <ProtectedRoute>
                <ReportsPage />
              </ProtectedRoute>
            }
          />
        </Route>
        <Route path="login" element={<LoginPage />} />
      </Routes>
    </div>
  );
};

export default App;
