import { Route, Routes, Navigate } from "react-router-dom";
import "./App.css";
import LoginPage from "./components/login/LoginPage";
import HomePage from "./components/home/HomePage";
import SettingsPage from "./components/home/settings/SettingsPage";
import PaymentsPage from "./components/home/payments/PaymentsPage";
import BillsPage from "./components/home/bills/BillsPage";
import ClientsPage from "./components/home/clients/ClientsPage";
import ReportsPage from "./components/home/reports/ReportsPage";
import { ProtectedRoute } from "./helpers/ProtectedRoute";
import Dashboardpage from "./components/home/dashboard/DashboardPage";
import CatalogsPage from "./components/home/catalogs/CatalogsPage";
import UserCatalog from "./components/home/catalogs/components/user/UserCatalog";
import ClientCatalog from "./components/home/catalogs/components/client/ClientCatalog";
import BankAccount from "./components/home/catalogs/components/bankaccount/BankAccount";
import ChargeCatalog from "./components/home/catalogs/components/charge/ChargeCatalog";
import TariffCatalog from "./components/home/catalogs/components/tariff/TariffCatalog";
import CustomerSerices from "./components/home/catalogs/components/services/CustomerSerices";
import CaptureInterface from "./components/capture/CaptureInterface";
import Records from "./components/home/records/Records";
import PeriodCatalog from "./components/home/catalogs/components/periods/PeriodCatalog";
import ServicesList from "./components/capture/pages/ServicesList/ServicesList";
import ServiceCapture from "./components/capture/pages/ServicePage/ServiceCapture";

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
          <Route path="" element={<Navigate to={"/mobile/services"}></Navigate>} />
          <Route
            path="services"
            element={
              <ProtectedRoute>
                <ServicesList />
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
            path="records"
            element={
              <ProtectedRoute>
                <Records />
              </ProtectedRoute>
            }
          />
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
              path="services/:customerId?"
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
