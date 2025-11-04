import { useState } from "react";

interface Work {
  id: number;
  name: string;
  description: string;
  progress: number;
  status: "planning" | "in_progress" | "paused" | "completed";
  startDate: string;
  lastUpdated: string;
}

export default function WorkManagement() {
  const [works, setWorks] = useState<Work[]>([
    {
      id: 1,
      name: "Obra Principal",
      description: "Construção do prédio principal",
      progress: 35,
      status: "in_progress",
      startDate: "2024-01-15",
      lastUpdated: "2024-11-03",
    },
    {
      id: 2,
      name: "Obra Secundária",
      description: "Acabamento e pintura",
      progress: 15,
      status: "in_progress",
      startDate: "2024-02-01",
      lastUpdated: "2024-11-03",
    },
  ]);

  const [newWork, setNewWork] = useState({ name: "", description: "" });
  const [editingId, setEditingId] = useState<number | null>(null);
  const [editingProgress, setEditingProgress] = useState<number>(0);

  const handleAddWork = () => {
    if (!newWork.name) {
      alert("Digite o nome da obra");
      return;
    }

    const newWorkObj: Work = {
      id: Math.max(...works.map(w => w.id), 0) + 1,
      name: newWork.name,
      description: newWork.description,
      progress: 0,
      status: "planning",
      startDate: new Date().toISOString().split("T")[0],
      lastUpdated: new Date().toISOString().split("T")[0],
    };

    setWorks([...works, newWorkObj]);
    setNewWork({ name: "", description: "" });
    alert("✓ Obra adicionada com sucesso!");
  };

  const handleUpdateProgress = (id: number, newProgress: number) => {
    setWorks(
      works.map(work =>
        work.id === id
          ? {
              ...work,
              progress: newProgress,
              lastUpdated: new Date().toISOString().split("T")[0],
              status: newProgress === 100 ? "completed" : "in_progress",
            }
          : work
      )
    );
  };

  const handleUpdateStatus = (id: number, newStatus: Work["status"]) => {
    setWorks(
      works.map(work =>
        work.id === id
          ? { ...work, status: newStatus, lastUpdated: new Date().toISOString().split("T")[0] }
          : work
      )
    );
  };

  const handleDeleteWork = (id: number) => {
    if (confirm("Tem certeza que deseja remover esta obra?")) {
      setWorks(works.filter(work => work.id !== id));
      alert("✓ Obra removida!");
    }
  };

  const getStatusColor = (status: Work["status"]) => {
    switch (status) {
      case "planning":
        return "bg-gray-100 text-gray-800";
      case "in_progress":
        return "bg-blue-100 text-blue-800";
      case "paused":
        return "bg-yellow-100 text-yellow-800";
      case "completed":
        return "bg-green-100 text-green-800";
    }
  };

  const getStatusLabel = (status: Work["status"]) => {
    switch (status) {
      case "planning":
        return "Planejamento";
      case "in_progress":
        return "Em Andamento";
      case "paused":
        return "Pausada";
      case "completed":
        return "Concluída";
    }
  };

  const getProgressColor = (progress: number) => {
    if (progress < 25) return "bg-red-500";
    if (progress < 50) return "bg-orange-500";
    if (progress < 75) return "bg-yellow-500";
    if (progress < 100) return "bg-blue-500";
    return "bg-green-500";
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-4">
      <div className="max-w-6xl mx-auto space-y-6">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">Gerenciamento de Obras</h1>
          <p className="text-gray-600">Acompanhe o progresso de cada obra</p>
        </div>

        {/* Add New Work Section */}
        <div className="bg-white rounded-lg shadow-lg p-6">
          <h2 className="text-2xl font-bold mb-4">Adicionar Nova Obra</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <input
              type="text"
              placeholder="Nome da obra"
              value={newWork.name}
              onChange={(e) => setNewWork({ ...newWork, name: e.target.value })}
              className="p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <input
              type="text"
              placeholder="Descrição"
              value={newWork.description}
              onChange={(e) => setNewWork({ ...newWork, description: e.target.value })}
              className="p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <button
              onClick={handleAddWork}
              className="bg-green-600 hover:bg-green-700 text-white font-semibold rounded-lg transition"
            >
              + Adicionar Obra
            </button>
          </div>
        </div>

        {/* Works List */}
        <div className="space-y-4">
          {works.map((work) => (
            <div key={work.id} className="bg-white rounded-lg shadow-lg p-6">
              {/* Header */}
              <div className="flex items-start justify-between mb-4">
                <div className="flex-1">
                  <h3 className="text-2xl font-bold text-gray-900">{work.name}</h3>
                  <p className="text-gray-600 mt-1">{work.description}</p>
                  <div className="flex items-center gap-4 mt-3">
                    <span className={`px-3 py-1 rounded-full text-sm font-semibold ${getStatusColor(work.status)}`}>
                      {getStatusLabel(work.status)}
                    </span>
                    <span className="text-sm text-gray-500">
                      Iniciada em: {new Date(work.startDate).toLocaleDateString("pt-BR")}
                    </span>
                    <span className="text-sm text-gray-500">
                      Atualizada em: {new Date(work.lastUpdated).toLocaleDateString("pt-BR")}
                    </span>
                  </div>
                </div>
                <button
                  onClick={() => handleDeleteWork(work.id)}
                  className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg transition"
                >
                  🗑️ Remover
                </button>
              </div>

              {/* Progress Section */}
              <div className="space-y-4">
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <label className="text-lg font-semibold text-gray-900">Progresso da Obra</label>
                    <span className="text-3xl font-bold text-blue-600">{work.progress}%</span>
                  </div>

                  {/* Progress Bar */}
                  <div className="w-full bg-gray-200 rounded-full h-8 overflow-hidden">
                    <div
                      className={`h-full ${getProgressColor(work.progress)} transition-all duration-300 flex items-center justify-center`}
                      style={{ width: `${work.progress}%` }}
                    >
                      {work.progress > 10 && (
                        <span className="text-white font-bold text-sm">{work.progress}%</span>
                      )}
                    </div>
                  </div>
                </div>

                {/* Progress Slider */}
                <div className="space-y-2">
                  <input
                    type="range"
                    min="0"
                    max="100"
                    value={work.progress}
                    onChange={(e) => handleUpdateProgress(work.id, parseInt(e.target.value))}
                    className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-blue-600"
                  />
                  <div className="flex justify-between text-xs text-gray-500">
                    <span>0%</span>
                    <span>25%</span>
                    <span>50%</span>
                    <span>75%</span>
                    <span>100%</span>
                  </div>
                </div>

                {/* Quick Progress Buttons */}
                <div className="flex gap-2 flex-wrap">
                  {[0, 25, 50, 75, 100].map((percent) => (
                    <button
                      key={percent}
                      onClick={() => handleUpdateProgress(work.id, percent)}
                      className={`px-4 py-2 rounded-lg font-semibold transition ${
                        work.progress === percent
                          ? "bg-blue-600 text-white"
                          : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                      }`}
                    >
                      {percent}%
                    </button>
                  ))}
                </div>
              </div>

              {/* Status Controls */}
              <div className="mt-6 pt-6 border-t border-gray-200">
                <label className="block text-sm font-semibold text-gray-900 mb-3">Alterar Status</label>
                <div className="flex gap-2 flex-wrap">
                  {(["planning", "in_progress", "paused", "completed"] as const).map((status) => (
                    <button
                      key={status}
                      onClick={() => handleUpdateStatus(work.id, status)}
                      className={`px-4 py-2 rounded-lg font-semibold transition ${
                        work.status === status
                          ? `${getStatusColor(status)} ring-2 ring-offset-2 ring-gray-400`
                          : `${getStatusColor(status)} opacity-60 hover:opacity-100`
                      }`}
                    >
                      {getStatusLabel(status)}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Summary */}
        <div className="bg-white rounded-lg shadow-lg p-6">
          <h2 className="text-2xl font-bold mb-4">Resumo de Obras</h2>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
            <div className="p-4 bg-blue-50 rounded-lg">
              <p className="text-sm text-gray-600">Total de Obras</p>
              <p className="text-3xl font-bold text-blue-600">{works.length}</p>
            </div>
            <div className="p-4 bg-green-50 rounded-lg">
              <p className="text-sm text-gray-600">Concluídas</p>
              <p className="text-3xl font-bold text-green-600">{works.filter(w => w.status === "completed").length}</p>
            </div>
            <div className="p-4 bg-yellow-50 rounded-lg">
              <p className="text-sm text-gray-600">Em Andamento</p>
              <p className="text-3xl font-bold text-yellow-600">{works.filter(w => w.status === "in_progress").length}</p>
            </div>
            <div className="p-4 bg-orange-50 rounded-lg">
              <p className="text-sm text-gray-600">Pausadas</p>
              <p className="text-3xl font-bold text-orange-600">{works.filter(w => w.status === "paused").length}</p>
            </div>
            <div className="p-4 bg-purple-50 rounded-lg">
              <p className="text-sm text-gray-600">Progresso Médio</p>
              <p className="text-3xl font-bold text-purple-600">
                {Math.round(works.reduce((sum, w) => sum + w.progress, 0) / works.length)}%
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
