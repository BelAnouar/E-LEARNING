import { createBrowserRouter } from "react-router-dom";
import Error from "../components/Error";
import Books from "../pages/Books";
import Contact from "../pages/contact";
import Courses from "../pages/coursesPage";
import FAQ from "../pages/FAQ";
import Home from "../pages/homePage";
import Lesson from "../pages/leson";
import Programs from "../pages/Program&Degrees";
import Register from "../pages/Register";
import SignIn from "../pages/signin";
import FilterCard from "../pages/filtercard";
import Sidbar from "../components/sidebare";
import AddCours from "../pages/admin/addcours";
import Content from "../pages/admin/content";
import RegisterAdmin from "../pages/admin/RegisterAdmn";

import AuthGuard from "../pages/guards/AuthGuard";
import CoursesDashboard from "../pages/admin/courses-dashboard";
import AdminDashboard from "../pages/admin/admin-dashboard";
import Media from "../pages/admin/media";
import ProgramsAdmin from "../pages/admin/programs-admin";
import Categories from "../pages/admin/categories";
import Applications from "../pages/admin/applications";


const router = createBrowserRouter([
  {
    path: '*',
    element: <Error />
  },
  {
    path: '/',
    element: (
      <AuthGuard roles={['user', 'student']}>
        <Home />
      </AuthGuard>
    )
  },
  {
    path: '/courses',
    element: (
      <AuthGuard roles={['user', 'student']}>
        <Courses />
      </AuthGuard>
    )
  },
  {
    path: "/Books",
    element: (
      <AuthGuard roles={['user', 'student']}>
        <Books />
      </AuthGuard>
    )
  },
  {
    path: "/dascc",
    element: (
      <AuthGuard adminOnly={true}>
        <CoursesDashboard />
      </AuthGuard>
    )
  },
  {
    path: "/Program&Degrees",
    element: (
      <AuthGuard roles={['user', 'student']}>
        <Programs />
      </AuthGuard>
    )
  },
  {
    path: "/SignIn",
    element: <SignIn />
  },
  {
    path: "/Register",
    element: <Register />
  },
  {
    path: "/lesson/:idCours",
    element: (
      <AuthGuard roles={['user', 'student']}>
        <Lesson />
      </AuthGuard>
    )
  },
  {
    path: "/contact",
    element: <Contact />
  },

  {
    path: "/FAQ",
    element: <FAQ />
  },
  {
    path: "/Find",
    element: (
      <AuthGuard roles={['user', 'student']}>
        <FilterCard />
      </AuthGuard>
    )
  },
  {
    element: (
      <AuthGuard adminOnly={true}>
        <Sidbar />
      </AuthGuard>
    ),
 children: [
  { path: "/admin", element: <AdminDashboard /> },
  { path: "/admin/addcours", element: <AddCours /> },
  { path: "/admin/content/:idcour", element: <Content /> },
  { path: "/admin/register", element: <RegisterAdmin /> },
  { path: "/admin/media/:idCour", element: <Media /> },
  { path: "/admin/programs", element: <ProgramsAdmin /> },
  { path: "/admin/categories", element: <Categories /> },
  { path: "/admin/applications", element: <Applications /> },
]
  }
]);

export default router;