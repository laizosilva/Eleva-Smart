import { useState, useEffect } from "react";

export default function Timecard() {
  const [selectedWork, setSelectedWork] = useState<string>("");
  const [isClockedIn, setIsClockedIn] = useState(false);
  const [latitude, setLatitude] = useState<number | null>(null);
  const [longitude, setLongitude] = useState<number | null>(null);
  const [address, setAddress] = useState<string>("");
  const [locationError, setLocationError] = useState<string>("");
  const [works, setWorks] = useState<any[]>([
    { id: 1, name: "Obra Principal", status: "active" },
    { id: 2, name: "Obra Secundária", status: "active" },
  ]);

  // Obter geolocalização
  useEffect(() => {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          setLatitude(position.coords.latitude);
          setLongitude(position.coords.longitude);
          setLocationError("");

          // Tentar obter endereço (reverse geocoding)
          try {
            const response = await fetch(
              `https://nominatim.openstreetmap.org/reverse?format=json&lat=${position.coords.latitude}&lon=${position.coords.longitude}`
            );
            const data = await response.json();
            setAddress(data.address?.road || data.address?.city || "Localização obtida");
          } catch (err) {
            setAddress("Localização obtida");
          }
        },
        (err) => {
          // Permitir continuar mesmo sem GPS
          setLocationError(`Aviso: ${err.message}. Você pode continuar sem GPS.`);
          setAddress("GPS não disponível");
        },
        {
          enableHighAccuracy: true,
          timeout: 10000,
          maximumAge: 0,
        }
      );
    }
  }, []);

  const handleClockIn = () => {
    if (!selectedWork) {
      alert("Selecione uma obra antes de iniciar o serviço");
      return;
    }
    setIsClockedIn(true);
    alert("✓ Entrada registrada com sucesso!");
  };

  const handleClockOut = () => {
    setIsClockedIn(false);
    alert("✓ Saída registrada com sucesso!");
  };

  const selectedWorkData = works.find((w) => w.id === parseInt(selectedWork));

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-4">
      <div className="max-w-2xl mx-auto space-y-6">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">Cartão de Ponto</h1>
          <p className="text-gray-600">Registre sua entrada e saída</p>
        </div>

        {/* Location Status */}
        {locationError && (
          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
            <p className="text-sm text-yellow-800">
              ⚠️ {locationError}
            </p>
          </div>
        )}

        {latitude && longitude && (
          <div className="bg-white rounded-lg shadow-md p-4">
            <div className="flex items-center gap-2 text-sm text-gray-600">
              <span>📍 {address}</span>
            </div>
            <div className="mt-2 text-xs text-gray-500">
              Lat: {latitude.toFixed(4)}, Lon: {longitude.toFixed(4)}
            </div>
          </div>
        )}

        {/* Work Selection Card */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-semibold mb-4">Selecione a Obra</h2>
          <select
            value={selectedWork}
            onChange={(e) => setSelectedWork(e.target.value)}
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="">-- Selecione uma obra --</option>
            {works.map((work) => (
              <option key={work.id} value={work.id}>
                {work.name}
              </option>
            ))}
          </select>

          {selectedWorkData && (
            <div className="mt-4 p-3 bg-blue-50 rounded-lg border border-blue-200">
              <p className="text-sm font-medium text-blue-900">Obra Selecionada:</p>
              <p className="text-sm text-blue-700 mt-1">{selectedWorkData.name}</p>
              <span className="inline-block mt-2 px-3 py-1 bg-blue-600 text-white text-xs rounded-full">
                {selectedWorkData.status === "active" ? "Ativa" : "Pausada"}
              </span>
            </div>
          )}
        </div>

        {/* Main Clock In/Out Card */}
        <div className="bg-white rounded-lg shadow-lg p-6">
          <h2 className="text-2xl font-bold mb-2">
            {isClockedIn ? "Você está MARCADO" : "Iniciar Serviço"}
          </h2>
          <p className="text-gray-600 mb-6">
            {isClockedIn 
              ? "Clique em sair para encerrar o expediente" 
              : "Selecione a obra e clique em entrar para iniciar"}
          </p>

          <div className="flex gap-4">
            <button
              onClick={handleClockIn}
              disabled={isClockedIn || !selectedWork}
              className="flex-1 h-16 text-lg bg-green-600 hover:bg-green-700 disabled:bg-gray-400 text-white font-semibold rounded-lg transition"
            >
              ✓ Entrar
            </button>
            <button
              onClick={handleClockOut}
              disabled={!isClockedIn}
              className="flex-1 h-16 text-lg bg-red-600 hover:bg-red-700 disabled:bg-gray-400 text-white font-semibold rounded-lg transition"
            >
              ⊗ Sair
            </button>
          </div>
        </div>

        {/* Summary Card */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <h3 className="text-lg font-semibold mb-4">Resumo do Dia</h3>
          <div className="grid grid-cols-2 gap-4">
            <div className="p-4 bg-blue-50 rounded-lg">
              <p className="text-sm text-gray-600">Horas Trabalhadas</p>
              <p className="text-2xl font-bold text-blue-600">0.00h</p>
            </div>
            <div className="p-4 bg-green-50 rounded-lg">
              <p className="text-sm text-gray-600">Ganho do Dia</p>
              <p className="text-2xl font-bold text-green-600">R$ 0,00</p>
            </div>
          </div>
        </div>

        {/* Info Card */}
        <div className="bg-blue-50 rounded-lg p-4 border border-blue-200">
          <p className="text-sm text-blue-900">
            💡 <strong>Dica:</strong> Permita o acesso à localização para melhor precisão no registro de ponto.
          </p>
        </div>
      </div>
    </div>
  );
}
