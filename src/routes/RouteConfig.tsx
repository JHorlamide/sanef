import { lazy, Suspense } from "react";
import { Route, Routes } from "react-router-dom";
import {
  HOME,
  MEDIA,
  ABOUT_US,
  CONTACT_US,
  OUR_PARTNERS,
  VALUE_ADDED_SERVICES,
  BECOME_AGENT,
  MEDIA_NEWS_DETAILS,
  MEDIA_EVENT_DETAILS,
  BANKS,
  LOGIN,
  FORGOT_PASSWORD,
  RESET_PASSWORD,
  REGULATORS,
  SUPER_AGENT,
  GOVERNMENTS,
  AGENTS,
  STRATEGIC_PARTNERS,
  ADMIN_SETTINGS,
  ADD_BANK,
  EDIT_BANK,
  ADD_SUPER_AGENT,
  EDIT_SUPER_AGENT,
  ADD_REGULATOR,
  EDIT_REGULATOR,
  ADD_STRATEGIC_PARTNERS,
  EDIT_STRATEGIC_PARTNERS,
  ADD_GOVERNMENT,
  EDIT_GOVERNMENT,
  ADD_AGENT,
  EDIT_AGENT
} from "./ROUTES_CONSTANTS";
import AuthLayoutAuth from "components/AuthLayout";
import PersistLogin from "components/PersistLogin";
import NotFound from "pages/NotFound";
import PreLoader from "components/layout/PreLoader/PreLoader";

const Home = lazy(() => import("pages/Home"));
const About = lazy(() => import("pages/About"));
const OurPartners = lazy(() => import("pages/OurPartners"));
const ValueAddedServices = lazy(() => import("pages/ValueAddedServices"));
const Media = lazy(() => import("pages/Media"));
const ContactUs = lazy(() => import("pages/Contact"));
const BecomeAnAgent = lazy(() => import("pages/BecomeAnAgent"));
const NewsDetails = lazy(() => import("pages/Media/components/NewsDetails"));
const EventDetails = lazy(() => import("pages/Media/components/EventDetails"));
const Login = lazy(() => import("pages/Auth/Login/Login"));
const ForgotPassword = lazy(
  () => import("pages/Auth/ForgotPassword/ForgotPassword")
);
const ResetPassword = lazy(
  () => import("pages/Auth/ResetPassword/ResetPassword")
);

// Admin Settings
const AdminSettings = lazy(() => import("pages/Dashboard/pages/AdminSettings"));

// Banks
const Banks = lazy(() => import("pages/Dashboard/pages/Banks/index"));
const CreateBank = lazy(
  () => import("pages/Dashboard/pages/Banks/components/AddBank")
);
const EditBank = lazy(
  () => import("pages/Dashboard/pages/Banks/components/EditBank")
);

// SuperAgents
const SuperAgents = lazy(
  () => import("pages/Dashboard/pages/SuperAgents/index")
);
const AddSuperAgent = lazy(
  () => import("pages/Dashboard/pages/SuperAgents/components/AddSuperAgent")
);
const EditSuperAgent = lazy(
  () => import("pages/Dashboard/pages/SuperAgents/components/EditSuperAgent")
);

// Regulators
const Regulators = lazy(() => import("pages/Dashboard/pages/Regulators/index"));
const AddRegulator = lazy(
  () => import("pages/Dashboard/pages/Regulators/components/AddRegulator")
);
const EditRegulator = lazy(
  () => import("pages/Dashboard/pages/Regulators/components/EditRegulators")
);

// StrategicPartners
const StrategicPartners = lazy(
  () => import("pages/Dashboard/pages/StrategicPartners/index")
);
const AddPartner = lazy(
  () => import("pages/Dashboard/pages/StrategicPartners/components/AddPartner")
);
const EditPartner = lazy(
  () => import("pages/Dashboard/pages/StrategicPartners/components/EditPartner")
);

// Governments
const Governments = lazy(
  () => import("pages/Dashboard/pages/Governments/index")
);
const AddGovernment = lazy(
  () => import("pages/Dashboard/pages/Governments/components/AddGovernment")
);
const EditGovernment = lazy(
  () => import("pages/Dashboard/pages/Governments/components/EditGovernment")
);

// Agents
const Agents = lazy(() => import("pages/Dashboard/pages/Agents/index"));
const AddAgents = lazy(
  () => import("pages/Dashboard/pages/Agents/components/AddAgents")
);
const EditAgents = lazy(
  () => import("pages/Dashboard/pages/Agents/components/EditAgents")
);

const RouteConfig = () => {
  return (
    <Suspense fallback={<PreLoader />}>
      <Routes>
        {/* Public Routes */}
        <Route path={HOME} element={<Home />} />
        <Route path={MEDIA} element={<Media />} />
        <Route path={CONTACT_US} element={<ContactUs />} />
        <Route path={ABOUT_US} element={<About />} />
        <Route path={OUR_PARTNERS} element={<OurPartners />} />
        <Route path={VALUE_ADDED_SERVICES} element={<ValueAddedServices />} />
        <Route path={BECOME_AGENT} element={<BecomeAnAgent />} />
        <Route path={MEDIA_NEWS_DETAILS} element={<NewsDetails />} />
        <Route path={MEDIA_EVENT_DETAILS} element={<EventDetails />} />
        <Route path={LOGIN} element={<Login />} />
        <Route path={FORGOT_PASSWORD} element={<ForgotPassword />} />
        <Route path={RESET_PASSWORD} element={<ResetPassword />} />

        {/* Protected Routes */}
        <Route element={<PersistLogin />}>
          <Route element={<AuthLayoutAuth />}>
            {/* Banks */}
            <Route path={BANKS} element={<Banks />} />
            <Route path={ADD_BANK} element={<CreateBank />} />
            <Route path={EDIT_BANK} element={<EditBank />} />

            {/* Agents */}
            <Route path={AGENTS} element={<Agents />} />
            <Route path={ADD_AGENT} element={<AddAgents />} />
            <Route path={EDIT_AGENT} element={<EditAgents />} />

            {/* Strategic Partners */}
            <Route path={STRATEGIC_PARTNERS} element={<StrategicPartners />} />
            <Route path={ADD_STRATEGIC_PARTNERS} element={<AddPartner />} />
            <Route path={EDIT_STRATEGIC_PARTNERS} element={<EditPartner />} />

            {/* Admin Settings */}
            <Route path={ADMIN_SETTINGS} element={<AdminSettings />} />

            {/* Governments */}
            <Route path={GOVERNMENTS} element={<Governments />} />
            <Route path={ADD_GOVERNMENT} element={<AddGovernment />} />
            <Route path={EDIT_GOVERNMENT} element={<EditGovernment />} />

            {/* Super Agents */}
            <Route path={SUPER_AGENT} element={<SuperAgents />} />
            <Route path={ADD_SUPER_AGENT} element={<AddSuperAgent />} />
            <Route path={EDIT_SUPER_AGENT} element={<EditSuperAgent />} />

            {/* Regulators */}
            <Route path={REGULATORS} element={<Regulators />} />
            <Route path={ADD_REGULATOR} element={<AddRegulator />} />
            <Route path={EDIT_REGULATOR} element={<EditRegulator />} />
          </Route>
        </Route>

        {/* Catch All */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Suspense>
  );
};

export default RouteConfig;
