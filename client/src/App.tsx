import { useState } from "react";
import Timecard from "./pages/Timecard";
import AdminDashboard from "./pages/AdminDashboard";
import WorkManagement from "./pages/WorkManagement";

export default function App() {
  const [currentPage, setCurrentPage] = useState<"timecard" | "admin" | "works">("timecard");
  const [userName, setUserName] = useState("Laizo Silva");
  const [userRole, setUserRole] = useState<"admin" | "user">("admin");

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navigation */}
      <nav className="bg-white shadow-md">
        <div className="max-w-6xl mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-8">
            <h1 className="text-2xl font-bold text-blue-600">Eleva Smart</h1>
            <div className="flex gap-4">
              <button
                onClick={() => setCurrentPage("timecard")}
                className={`px-4 py-2 rounded-lg font-semibold transition ${
                  currentPage === "timecard"
                    ? "bg-blue-600 text-white"
                    : "text-gray-600 hover:bg-gray-100"
                }`}
              >
                Meu Ponto
              </button>
              {userRole === "admin" && (
                <>
                  <button
                    onClick={() => setCurrentPage("admin")}
                    className={`px-4 py-2 rounded-lg font-semibold transition ${
                      currentPage === "admin"
                        ? "bg-blue-600 text-white"
                        : "text-gray-600 hover:bg-gray-100"
                    }`}
                  >
                    Admin
                  </button>
                  <button
                    onClick={() => setCurrentPage("works")}
                    className={`px-4 py-2 rounded-lg font-semibold transition ${
                      currentPage === "works"
                        ? "bg-blue-600 text-white"
                        : "text-gray-600 hover:bg-gray-100"
                    }`}
                  >
                    Obras
                  </button>
                </>
              )}
            </div>
          </div>

          {/* User Info */}
          <div className="flex items-center gap-4">
            <div className="text-right">
              <p className="font-semibold text-gray-900">{userName}</p>
              <p className="text-xs text-gray-500">{userRole === "admin" ? "Administrador" : "Colaborador"}</p>
            </div>
            <button
              onClick={() => alert("Logout realizado")}
              className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg font-semibold transition"
            >
              Sair
            </button>
          </div>
        </div>
      </nav>

      {/* Page Content */}
      <main>
        {currentPage === "timecard" && <Timecard />}
        {currentPage === "admin" && <AdminDashboard />}
        {currentPage === "works" && <WorkManagement />}
      </main>
    </div>
  );
}
