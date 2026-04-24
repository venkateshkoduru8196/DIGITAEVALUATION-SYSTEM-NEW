import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import Login from "./pages/loginpage/Login";
import Register from "./pages/Registrationpage/Register";
import Dashboard from "./pages/Dashboard/Dashboard";
import Colleges from "./pages/Colleges/Colleges";
import ProtectedRoute from "./routes/ProtectedRoute";
import { AuthProvider } from "./context/AuthContext";
import Students from "./pages/Students/Students";
import Branches from "./pages/Branches/Branches";
import Courses from "./pages/Courses/Courses";
import Subjects from "./pages/Subjects/Subjects";
import CourseSubjects from "./pages/Coursesubjects/Coursesubjects";
import Faculty from "./pages/Faculty/Faculty";
import Exams from "./pages/Exams/Exams";
import Answersheets from "./pages/Answersheets/Answersheets";
import FacultySubject from "./pages/FaultySubject/FacultySubject";


function App() {
  return (
    <AuthProvider>
      <BrowserRouter>

      <Toaster position="top-right" />
        <Routes>
          {/* PUBLIC ROUTES */}
          <Route path="/" element={<Login />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />

          {/* PROTECTED ROUTES */}
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            }
          />
          <Route
            path="/colleges"
            element={
              <ProtectedRoute allowedRoles={["Admin", "User"]}>
                <Colleges />
              </ProtectedRoute>
            }
          />


          <Route
            path="/students"
            element={
              <ProtectedRoute allowedRoles={["Admin", "User"]}>
                <Students />
              </ProtectedRoute>
            }
          />

          <Route
            path="/branches"
            element={
              <ProtectedRoute allowedRoles={["Admin", "User"]}>
                <Branches />
              </ProtectedRoute>
            }
          />


           <Route
            path="/courses"
            element={
              <ProtectedRoute allowedRoles={["Admin", "User"]}>
                <Courses />
              </ProtectedRoute>
            }
          />
           
            <Route
            path="/subjects"
            element={
              <ProtectedRoute allowedRoles={["Admin", "User"]}>
                <Subjects />
              </ProtectedRoute>
            }
          />


           <Route
            path="/coursesubjects"
            element={
              <ProtectedRoute allowedRoles={["Admin", "User"]}>
                <CourseSubjects />
              </ProtectedRoute>
            }
          />

           <Route
            path="/faculty"
            element={
              <ProtectedRoute allowedRoles={["Admin", "User"]}>
                <Faculty />
              </ProtectedRoute>
            }
          />



           <Route
            path="/exams"
            element={
              <ProtectedRoute allowedRoles={["Admin", "User"]}>
                <Exams/>
              </ProtectedRoute>
            }
          />


           <Route
            path="/answersheets"
            element={
              <ProtectedRoute allowedRoles={["Admin", "User"]}>
                <Answersheets/>
              </ProtectedRoute>
            }
          />


           <Route
            path="/facultysubjects"
            element={
              <ProtectedRoute allowedRoles={["Admin", "User"]}>
                <FacultySubject/>
              </ProtectedRoute>
            }
          />





        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
