import { useEffect } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { Cloud, Wind, Droplets } from 'lucide-react';
import { useSensorStore } from '../store/sensorStore';
import { Card } from '../components/Card';
import { SensorCard } from '../components/SensorCard';

export const Dashboard = () => {
  const { currentData, historicalData, alertConfig, updateSensorData, initializeHistoricalData } = useSensorStore();

  useEffect(() => {
    // Initialize historical data on mount
    initializeHistoricalData();

    // Update sensor data every 3 seconds
    const interval = setInterval(() => {
      updateSensorData();
    }, 3000);

    return () => clearInterval(interval);
  }, [updateSensorData, initializeHistoricalData]);

  // Get last 20 data points for the real-time chart
  const realtimeData = historicalData.slice(-20).map((data) => ({
    time: new Date(data.timestamp).toLocaleTimeString('es-ES', { 
      hour: '2-digit', 
      minute: '2-digit',
      second: '2-digit'
    }),
    CO: data.co,
    CO2: data.co2 / 10, // Scale down for better visualization
    SOx: data.sox,
  }));

  return (
    <div className="flex flex-col gap-4">
      {/* Sensor Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <SensorCard
          title="Monóxido de Carbono (CO)"
          value={currentData.co}
          unit="ppm"
          icon={Cloud}
          color="bg-orange-500"
          alertThreshold={alertConfig.co}
        />
        <SensorCard
          title="Dióxido de Carbono (CO₂)"
          value={currentData.co2}
          unit="ppm"
          icon={Wind}
          color="bg-blue-500"
          alertThreshold={alertConfig.co2}
        />
        <SensorCard
          title="Óxidos de Azufre (SOx)"
          value={currentData.sox}
          unit="ppm"
          icon={Droplets}
          color="bg-purple-500"
          alertThreshold={alertConfig.sox}
        />
      </div>

      {/* Real-time Chart */}
      <Card>
        <h2 className="text-base font-semibold text-gray-900 mb-3">
          Monitoreo en Tiempo Real
        </h2>
        <p className="text-xs text-gray-500 mb-4">
          Últimas lecturas de los sensores (actualización cada 3 segundos)
        </p>
        <ResponsiveContainer width="100%" height={400}>
          <LineChart data={realtimeData}>
            <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
            <XAxis 
              dataKey="time" 
              stroke="#6b7280"
              style={{ fontSize: '12px' }}
            />
            <YAxis 
              stroke="#6b7280"
              style={{ fontSize: '12px' }}
              label={{ value: 'Concentración (ppm)', angle: -90, position: 'insideLeft' }}
            />
            <Tooltip 
              contentStyle={{ 
                backgroundColor: '#1f2937', 
                border: 'none', 
                borderRadius: '8px',
                color: '#fff'
              }}
            />
            <Legend />
            <Line 
              type="monotone" 
              dataKey="CO" 
              stroke="#f97316" 
              strokeWidth={2}
              dot={false}
              name="CO (ppm)"
            />
            <Line 
              type="monotone" 
              dataKey="CO2" 
              stroke="#3b82f6" 
              strokeWidth={2}
              dot={false}
              name="CO₂ (×10 ppm)"
            />
            <Line 
              type="monotone" 
              dataKey="SOx" 
              stroke="#a855f7" 
              strokeWidth={2}
              dot={false}
              name="SOx (ppm)"
            />
          </LineChart>
        </ResponsiveContainer>
      </Card>

      {/* System Status */}
      <Card>
        <h3 className="text-sm font-semibold text-gray-900 mb-3">
          Estado del Sistema
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          <div className="flex items-center justify-between p-3 bg-gray-50 rounded-md">
            <span className="text-xs font-medium text-gray-500">Última actualización</span>
            <span className="text-xs font-semibold text-gray-900">
              {new Date(currentData.timestamp).toLocaleTimeString('es-ES')}
            </span>
          </div>
          <div className="flex items-center justify-between p-3 bg-gray-50 rounded-md">
            <span className="text-xs font-medium text-gray-500">Puntos de datos</span>
            <span className="text-xs font-semibold text-gray-900">
              {historicalData.length}
            </span>
          </div>
        </div>
      </Card>
    </div>
  );
};
