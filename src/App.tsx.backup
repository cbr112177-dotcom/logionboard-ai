import { Routes, Route, Navigate } from "react-router-dom"
import { lazy, Suspense } from "react"
import LandingPage from "./pages/LandingPage"
import LoginPage from "./pages/LoginPage"
import RegisterPage from "./pages/RegisterPage"
import DashboardPage from "./pages/DashboardPage"
import Layout from "./components/Layout"
const EmployeesPage = lazy(() => import("./pages/EmployeesPage"))
const OnboardingWizardPage = lazy(() => import("./pages/OnboardingWizardPage"))
const EmployeeDetailPage = lazy(() => import("./pages/EmployeeDetailPage"))
const DocumentManagerPage = lazy(() => import("./pages/DocumentManagerPage"))
const TrainingPage = lazy(() => import("./pages/TrainingPage"))
const TrainingModulePage = lazy(() => import("./pages/TrainingModulePage"))
const CompliancePage = lazy(() => import("./pages/CompliancePage"))
const AIChatPage = lazy(() => import("./pages/AIChatPage"))
const CheckInsPage = lazy(() => import("./pages/CheckInsPage"))
const AnalyticsPage = lazy(() => import("./pages/AnalyticsPage"))
const SettingsPage = lazy(() => import("./pages/SettingsPage"))
const BillingPage = lazy(() => import("./pages/BillingPage"))
function ProtectedRoute({children}:{children:React.ReactNode}){
  if(!sessionStorage.getItem("logionboard_user")) return <Navigate to="/login" replace/>
  return <Layout>{children}</Layout>
}
export default function App(){return(
  <Suspense fallback={<div className="flex h-screen items-center justify-center"><div className="animate-spin h-8 w-8 border-4 border-[#1E3A5F] border-t-transparent rounded-full"/></div>}>
    <Routes>
      <Route path="/" element={<LandingPage/>}/>
      <Route path="/login" element={<LoginPage/>}/>
      <Route path="/register" element={<RegisterPage/>}/>
      <Route path="/dashboard" element={<ProtectedRoute><DashboardPage/></ProtectedRoute>}/>
      <Route path="/employees" element={<ProtectedRoute><EmployeesPage/></ProtectedRoute>}/>
      <Route path="/employees/new" element={<ProtectedRoute><OnboardingWizardPage/></ProtectedRoute>}/>
      <Route path="/employees/:id" element={<ProtectedRoute><EmployeeDetailPage/></ProtectedRoute>}/>
      <Route path="/documents" element={<ProtectedRoute><DocumentManagerPage/></ProtectedRoute>}/>
      <Route path="/training" element={<ProtectedRoute><TrainingPage/></ProtectedRoute>}/>
      <Route path="/training/:id" element={<ProtectedRoute><TrainingModulePage/></ProtectedRoute>}/>
      <Route path="/compliance" element={<ProtectedRoute><CompliancePage/></ProtectedRoute>}/>
      <Route path="/chat" element={<ProtectedRoute><AIChatPage/></ProtectedRoute>}/>
      <Route path="/checkins" element={<ProtectedRoute><CheckInsPage/></ProtectedRoute>}/>
      <Route path="/analytics" element={<ProtectedRoute><AnalyticsPage/></ProtectedRoute>}/>
      <Route path="/settings" element={<ProtectedRoute><SettingsPage/></ProtectedRoute>}/>
      <Route path="/billing" element={<ProtectedRoute><BillingPage/></ProtectedRoute>}/>
    </Routes>
  </Suspense>
)
}
