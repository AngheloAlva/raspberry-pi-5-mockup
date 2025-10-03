import { useState } from 'react';
import { useSensorStore } from '../store/sensorStore';
import { Card } from '../components/Card';
import { Settings, Bell, Save, AlertTriangle } from 'lucide-react';

export const Configuration = () => {
  const { alertConfig, setAlertConfig } = useSensorStore();
  
  const [localConfig, setLocalConfig] = useState(alertConfig);
  const [saved, setSaved] = useState(false);

  const handleSave = () => {
    setAlertConfig(localConfig);
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  const handleReset = () => {
    const defaultConfig = { co: 50, co2: 1000, sox: 20 };
    setLocalConfig(defaultConfig);
    setAlertConfig(defaultConfig);
  };

  return (
    <div className="flex flex-col gap-8">
      {/* Header */}
      <Card>
        <div className="flex items-center gap-3">
          <Settings className="w-6 h-6 text-emerald-600" />
          <div>
            <h2 className="text-2xl font-bold text-gray-900">
              Configuración de Sensores
            </h2>
            <p className="text-sm text-gray-600">
              Ajusta los umbrales de alerta para cada contaminante
            </p>
          </div>
        </div>
      </Card>

      {/* Alert Configuration */}
      <Card>
        <div className="flex items-center gap-2 mb-6">
          <Bell className="w-5 h-5 text-emerald-600" />
          <h3 className="text-xl font-semibold text-gray-900">
            Umbrales de Alerta
          </h3>
        </div>

        <div className="flex flex-col gap-8">
          {/* CO Configuration */}
          <div className="flex flex-col gap-4">
            <div className="flex items-center justify-between">
              <label className="text-sm font-semibold text-gray-700">
                Monóxido de Carbono (CO)
              </label>
              <span className="text-sm font-bold text-gray-900">
                {localConfig.co} ppm
              </span>
            </div>
            <input
              type="range"
              min="10"
              max="100"
              step="5"
              value={localConfig.co}
              onChange={(e) => setLocalConfig({ ...localConfig, co: Number(e.target.value) })}
              className="w-full h-3 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-orange-500"
            />
            <p className="text-xs text-gray-500">
              Rango: 10 - 100 ppm. Valor recomendado: 50 ppm
            </p>
          </div>

          {/* CO2 Configuration */}
          <div className="flex flex-col gap-4">
            <div className="flex items-center justify-between">
              <label className="text-sm font-semibold text-gray-700">
                Dióxido de Carbono (CO₂)
              </label>
              <span className="text-sm font-bold text-gray-900">
                {localConfig.co2} ppm
              </span>
            </div>
            <input
              type="range"
              min="400"
              max="2000"
              step="50"
              value={localConfig.co2}
              onChange={(e) => setLocalConfig({ ...localConfig, co2: Number(e.target.value) })}
              className="w-full h-3 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-blue-500"
            />
            <p className="text-xs text-gray-500">
              Rango: 400 - 2000 ppm. Valor recomendado: 1000 ppm
            </p>
          </div>

          {/* SOx Configuration */}
          <div className="flex flex-col gap-4">
            <div className="flex items-center justify-between">
              <label className="text-sm font-semibold text-gray-700">
                Óxidos de Azufre (SOx)
              </label>
              <span className="text-sm font-bold text-gray-900">
                {localConfig.sox} ppm
              </span>
            </div>
            <input
              type="range"
              min="5"
              max="50"
              step="1"
              value={localConfig.sox}
              onChange={(e) => setLocalConfig({ ...localConfig, sox: Number(e.target.value) })}
              className="w-full h-3 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-purple-500"
            />
            <p className="text-xs text-gray-500">
              Rango: 5 - 50 ppm. Valor recomendado: 20 ppm
            </p>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center gap-4 mt-8">
          <button
            onClick={handleSave}
            className="flex items-center gap-2 px-8 py-4 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition-colors font-medium shadow-md"
          >
            <Save className="w-4 h-4" />
            <span>Guardar Configuración</span>
          </button>
          
          <button
            onClick={handleReset}
            className="px-8 py-4 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors font-medium"
          >
            Restablecer Valores
          </button>
        </div>

        {saved && (
          <div className="mt-4 p-4 bg-green-50 border border-green-200 rounded-lg">
            <p className="text-sm text-green-800 font-medium">
              ✓ Configuración guardada exitosamente
            </p>
          </div>
        )}
      </Card>

      {/* Information Card */}
      <Card>
        <div className="flex items-start gap-3">
          <AlertTriangle className="w-5 h-5 text-yellow-500 mt-1" />
          <div>
            <h4 className="text-sm font-semibold text-gray-900 mb-3">
              Información sobre Umbrales
            </h4>
            <ul className="flex flex-col gap-2 text-sm text-gray-600">
              <li>• <strong>CO:</strong> Niveles superiores a 50 ppm pueden ser peligrosos en exposiciones prolongadas.</li>
              <li>• <strong>CO₂:</strong> Niveles superiores a 1000 ppm pueden causar somnolencia y reducir la concentración.</li>
              <li>• <strong>SOx:</strong> Niveles superiores a 20 ppm pueden irritar el sistema respiratorio.</li>
            </ul>
          </div>
        </div>
      </Card>

      {/* Sensor Information */}
      <Card>
        <h4 className="text-base font-semibold text-gray-900 mb-5">
          Información del Sistema
        </h4>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <div className="p-4 bg-gray-50 rounded-lg">
            <p className="text-xs text-gray-600 mb-2">Dispositivo</p>
            <p className="text-sm font-semibold text-gray-900">Raspberry Pi 5</p>
          </div>
          <div className="p-4 bg-gray-50 rounded-lg">
            <p className="text-xs text-gray-600 mb-2">Frecuencia de muestreo</p>
            <p className="text-sm font-semibold text-gray-900">3 segundos</p>
          </div>
          <div className="p-4 bg-gray-50 rounded-lg">
            <p className="text-xs text-gray-600 mb-2">Sensores activos</p>
            <p className="text-sm font-semibold text-gray-900">3 (CO, CO₂, SOx)</p>
          </div>
          <div className="p-4 bg-gray-50 rounded-lg">
            <p className="text-xs text-gray-600 mb-2">Modo de operación</p>
            <p className="text-sm font-semibold text-gray-900">Simulación</p>
          </div>
        </div>
      </Card>
    </div>
  );
};
