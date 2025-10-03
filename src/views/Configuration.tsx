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
    <div className="flex flex-col gap-4">
      {/* Header */}
      <Card>
        <div className="flex items-center gap-2">
          <Settings className="w-4 h-4 text-gray-700" />
          <div>
            <h2 className="text-base font-semibold text-gray-900">
              Configuración de Sensores
            </h2>
            <p className="text-xs text-gray-500">
              Ajusta los umbrales de alerta para cada contaminante
            </p>
          </div>
        </div>
      </Card>

      {/* Alert Configuration */}
      <Card>
        <div className="flex items-center gap-2 mb-4">
          <Bell className="w-4 h-4 text-gray-700" />
          <h3 className="text-sm font-semibold text-gray-900">
            Umbrales de Alerta
          </h3>
        </div>

        <div className="flex flex-col gap-4">
          {/* CO Configuration */}
          <div className="flex flex-col gap-2">
            <div className="flex items-center justify-between">
              <label className="text-xs font-medium text-gray-700">
                Monóxido de Carbono (CO)
              </label>
              <span className="text-xs font-semibold text-gray-900">
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
              className="w-full h-2 bg-gray-200 rounded appearance-none cursor-pointer accent-gray-900"
            />
            <p className="text-xs text-gray-500">
              Rango: 10 - 100 ppm. Valor recomendado: 50 ppm
            </p>
          </div>

          {/* CO2 Configuration */}
          <div className="flex flex-col gap-2">
            <div className="flex items-center justify-between">
              <label className="text-xs font-medium text-gray-700">
                Dióxido de Carbono (CO₂)
              </label>
              <span className="text-xs font-semibold text-gray-900">
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
              className="w-full h-2 bg-gray-200 rounded appearance-none cursor-pointer accent-gray-900"
            />
            <p className="text-xs text-gray-500">
              Rango: 400 - 2000 ppm. Valor recomendado: 1000 ppm
            </p>
          </div>

          {/* SOx Configuration */}
          <div className="flex flex-col gap-2">
            <div className="flex items-center justify-between">
              <label className="text-xs font-medium text-gray-700">
                Óxidos de Azufre (SOx)
              </label>
              <span className="text-xs font-semibold text-gray-900">
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
              className="w-full h-2 bg-gray-200 rounded appearance-none cursor-pointer accent-gray-900"
            />
            <p className="text-xs text-gray-500">
              Rango: 5 - 50 ppm. Valor recomendado: 20 ppm
            </p>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center gap-3 mt-6">
          <button
            onClick={handleSave}
            className="flex items-center gap-1.5 px-4 py-2 bg-gray-900 text-white rounded-md hover:bg-gray-800 transition-colors text-sm font-medium"
          >
            <Save className="w-3.5 h-3.5" />
            <span>Guardar Configuración</span>
          </button>
          
          <button
            onClick={handleReset}
            className="px-4 py-2 bg-gray-100 text-gray-700 rounded-md hover:bg-gray-200 transition-colors text-sm font-medium"
          >
            Restablecer Valores
          </button>
        </div>

        {saved && (
          <div className="mt-3 p-3 bg-emerald-50 border border-emerald-200 rounded-md">
            <p className="text-xs text-emerald-700 font-medium">
              ✓ Configuración guardada exitosamente
            </p>
          </div>
        )}
      </Card>

      {/* Information Card */}
      <Card>
        <div className="flex items-start gap-2">
          <AlertTriangle className="w-4 h-4 text-amber-600 mt-0.5" />
          <div>
            <h4 className="text-xs font-semibold text-gray-900 mb-2">
              Información sobre Umbrales
            </h4>
            <ul className="flex flex-col gap-1.5 text-xs text-gray-600">
              <li>• <strong>CO:</strong> Niveles superiores a 50 ppm pueden ser peligrosos en exposiciones prolongadas.</li>
              <li>• <strong>CO₂:</strong> Niveles superiores a 1000 ppm pueden causar somnolencia y reducir la concentración.</li>
              <li>• <strong>SOx:</strong> Niveles superiores a 20 ppm pueden irritar el sistema respiratorio.</li>
            </ul>
          </div>
        </div>
      </Card>

      {/* Sensor Information */}
      <Card>
        <h4 className="text-xs font-semibold text-gray-900 mb-3">
          Información del Sistema
        </h4>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          <div className="p-3 bg-gray-50 rounded-md">
            <p className="text-xs text-gray-500 mb-1">Dispositivo</p>
            <p className="text-xs font-semibold text-gray-900">Raspberry Pi 5</p>
          </div>
          <div className="p-3 bg-gray-50 rounded-md">
            <p className="text-xs text-gray-500 mb-1">Frecuencia de muestreo</p>
            <p className="text-xs font-semibold text-gray-900">3 segundos</p>
          </div>
          <div className="p-3 bg-gray-50 rounded-md">
            <p className="text-xs text-gray-500 mb-1">Sensores activos</p>
            <p className="text-xs font-semibold text-gray-900">3 (CO, CO₂, SOx)</p>
          </div>
          <div className="p-3 bg-gray-50 rounded-md">
            <p className="text-xs text-gray-500 mb-1">Modo de operación</p>
            <p className="text-xs font-semibold text-gray-900">Simulación</p>
          </div>
        </div>
      </Card>
    </div>
  );
};
