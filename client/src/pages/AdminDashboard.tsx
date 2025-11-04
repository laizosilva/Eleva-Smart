import { useState } from "react";

interface Employee {
  id: number;
  name: string;
  email: string;
  dailyRate: number;
  status: "active" | "inactive";
}

export default function AdminDashboard() {
  const [employees, setEmployees] = useState<Employee[]>([
    { id: 1, name: "Alessandro Silva", email: "alessilva92@gmail.com", dailyRate: 10000, status: "active" },
    { id: 2, name: "Alberto Filho", email: "albertolpfilho27@gmail.com", dailyRate: 10000, status: "active" },
    { id: 3, name: "Cleiton Nunes", email: "clnunes199@gmail.com", dailyRate: 10000, status: "active" },
    { id: 4, name: "João Almeida", email: "joaoalmeida5965@gmail.com", dailyRate: 10000, status: "active" },
  ]);

  const [newEmployee, setNewEmployee] = useState({ name: "", email: "", dailyRate: "" });
  const [editingId, setEditingId] = useState<number | null>(null);
  const [editingRate, setEditingRate] = useState<string>("");

  const handleAddEmployee = () => {
    if (!newEmployee.name || !newEmployee.email || !newEmployee.dailyRate) {
      alert("Preencha todos os campos");
      return;
    }

    const newEmp: Employee = {
      id: Math.max(...employees.map(e => e.id), 0) + 1,
      name: newEmployee.name,
      email: newEmployee.email,
      dailyRate: parseFloat(newEmployee.dailyRate) * 100, // Converter para centavos
      status: "active",
    };

    setEmployees([...employees, newEmp]);
    setNewEmployee({ name: "", email: "", dailyRate: "" });
    alert("✓ Colaborador adicionado com sucesso!");
  };

  const handleUpdateRate = (id: number) => {
    if (!editingRate) {
      alert("Digite um valor");
      return;
    }

    setEmployees(
      employees.map(emp =>
        emp.id === id ? { ...emp, dailyRate: parseFloat(editingRate) * 100 } : emp
      )
    );
    setEditingId(null);
    setEditingRate("");
    alert("✓ Valor da diária atualizado!");
  };

  const handleDeleteEmployee = (id: number) => {
    if (confirm("Tem certeza que deseja remover este colaborador?")) {
      setEmployees(employees.filter(emp => emp.id !== id));
      alert("✓ Colaborador removido!");
    }
  };

  const formatCurrency = (cents: number) => {
    return `R$ ${(cents / 100).toFixed(2)}`;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-4">
      <div className="max-w-6xl mx-auto space-y-6">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">Painel Administrativo</h1>
          <p className="text-gray-600">Gerencie colaboradores e valores de diária</p>
        </div>

        {/* Add New Employee Section */}
        <div className="bg-white rounded-lg shadow-lg p-6">
          <h2 className="text-2xl font-bold mb-4">Adicionar Novo Colaborador</h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <input
              type="text"
              placeholder="Nome"
              value={newEmployee.name}
              onChange={(e) => setNewEmployee({ ...newEmployee, name: e.target.value })}
              className="p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <input
              type="email"
              placeholder="Email"
              value={newEmployee.email}
              onChange={(e) => setNewEmployee({ ...newEmployee, email: e.target.value })}
              className="p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <input
              type="number"
              placeholder="Diária (R$)"
              value={newEmployee.dailyRate}
              onChange={(e) => setNewEmployee({ ...newEmployee, dailyRate: e.target.value })}
              className="p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <button
              onClick={handleAddEmployee}
              className="bg-green-600 hover:bg-green-700 text-white font-semibold rounded-lg transition"
            >
              + Adicionar
            </button>
          </div>
        </div>

        {/* Employees List */}
        <div className="bg-white rounded-lg shadow-lg p-6">
          <h2 className="text-2xl font-bold mb-4">Colaboradores ({employees.length})</h2>
          <div className="space-y-4">
            {employees.map((emp) => (
              <div key={emp.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg border border-gray-200">
                <div className="flex-1">
                  <p className="font-semibold text-gray-900">{emp.name}</p>
                  <p className="text-sm text-gray-600">{emp.email}</p>
                </div>

                {editingId === emp.id ? (
                  <div className="flex items-center gap-2">
                    <input
                      type="number"
                      placeholder="Novo valor"
                      value={editingRate}
                      onChange={(e) => setEditingRate(e.target.value)}
                      className="p-2 border border-gray-300 rounded-lg w-32 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    <button
                      onClick={() => handleUpdateRate(emp.id)}
                      className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition"
                    >
                      Salvar
                    </button>
                    <button
                      onClick={() => setEditingId(null)}
                      className="bg-gray-400 hover:bg-gray-500 text-white px-4 py-2 rounded-lg transition"
                    >
                      Cancelar
                    </button>
                  </div>
                ) : (
                  <div className="flex items-center gap-4">
                    <div className="text-right">
                      <p className="text-2xl font-bold text-green-600">{formatCurrency(emp.dailyRate)}</p>
                      <p className="text-xs text-gray-500">Diária</p>
                    </div>
                    <button
                      onClick={() => {
                        setEditingId(emp.id);
                        setEditingRate((emp.dailyRate / 100).toString());
                      }}
                      className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition"
                    >
                      ✏️ Editar
                    </button>
                    <button
                      onClick={() => handleDeleteEmployee(emp.id)}
                      className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg transition"
                    >
                      🗑️ Remover
                    </button>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Summary */}
        <div className="bg-white rounded-lg shadow-lg p-6">
          <h2 className="text-2xl font-bold mb-4">Resumo</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="p-4 bg-blue-50 rounded-lg">
              <p className="text-sm text-gray-600">Total de Colaboradores</p>
              <p className="text-3xl font-bold text-blue-600">{employees.length}</p>
            </div>
            <div className="p-4 bg-green-50 rounded-lg">
              <p className="text-sm text-gray-600">Folha de Pagamento Diária</p>
              <p className="text-3xl font-bold text-green-600">
                {formatCurrency(employees.reduce((sum, e) => sum + e.dailyRate, 0))}
              </p>
            </div>
            <div className="p-4 bg-purple-50 rounded-lg">
              <p className="text-sm text-gray-600">Folha Semanal</p>
              <p className="text-3xl font-bold text-purple-600">
                {formatCurrency(employees.reduce((sum, e) => sum + e.dailyRate * 5, 0))}
              </p>
            </div>
            <div className="p-4 bg-orange-50 rounded-lg">
              <p className="text-sm text-gray-600">Folha Mensal</p>
              <p className="text-3xl font-bold text-orange-600">
                {formatCurrency(employees.reduce((sum, e) => sum + e.dailyRate * 20, 0))}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
