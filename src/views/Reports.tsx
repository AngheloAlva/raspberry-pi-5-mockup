import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, AreaChart, Area } from 'recharts';
import { useSensorStore } from '../store/sensorStore';
import { Card } from '../components/Card';
import { Calendar, TrendingUp } from 'lucide-react';

export const Reports = () => {
  const historicalData = useSensorStore((state) => state.historicalData);

  // Sample every 12th point to show 24 hours in manageable chunks (every hour)
  const chartData = historicalData
    .filter((_, index) => index % 12 === 0)
    .map((data) => ({
      time: new Date(data.timestamp).toLocaleTimeString('es-ES', { 
        hour: '2-digit', 
        minute: '2-digit'
      }),
      date: new Date(data.timestamp).toLocaleDateString('es-ES'),
      CO: data.co,
      CO2: data.co2,
      SOx: data.sox,
    }));

  // Calculate statistics
  const calculateStats = (key: 'co' | 'co2' | 'sox') => {
    if (historicalData.length === 0) return { min: 0, max: 0, avg: 0 };
    
    const values = historicalData.map(d => d[key]);
    return {
      min: Math.min(...values),
      max: Math.max(...values),
      avg: values.reduce((a, b) => a + b, 0) / values.length,
    };
  };

  const coStats = calculateStats('co');
  const co2Stats = calculateStats('co2');
  const soxStats = calculateStats('sox');

  return (
    <div className="flex flex-col gap-8">
      {/* Header */}
      <Card>
        <div className="flex items-center gap-3">
          <Calendar className="w-6 h-6 text-emerald-600" />
          <div>
            <h2 className="text-2xl font-bold text-gray-900">
              Reportes Históricos
            </h2>
            <p className="text-sm text-gray-600">
              Evolución de contaminantes en las últimas 24 horas
            </p>
          </div>
        </div>
      </Card>

      {/* Statistics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <Card>
          <div className="flex items-start justify-between">
            <div>
              <p className="text-sm font-semibold text-gray-600 mb-4">CO - Estadísticas 24h</p>
              <div className="mt-3 flex flex-col gap-2">
                <p className="text-xs text-gray-500">Mín: {coStats.min.toFixed(1)} ppm</p>
                <p className="text-xs text-gray-500">Máx: {coStats.max.toFixed(1)} ppm</p>
                <p className="text-lg font-bold text-gray-900">
                  Promedio: {coStats.avg.toFixed(1)} ppm
                </p>
              </div>
            </div>
            <TrendingUp className="w-5 h-5 text-orange-500" />
          </div>
        </Card>

        <Card>
          <div className="flex items-start justify-between">
            <div>
              <p className="text-sm font-semibold text-gray-600 mb-4">CO₂ - Estadísticas 24h</p>
              <div className="mt-3 flex flex-col gap-2">
                <p className="text-xs text-gray-500">Mín: {co2Stats.min.toFixed(1)} ppm</p>
                <p className="text-xs text-gray-500">Máx: {co2Stats.max.toFixed(1)} ppm</p>
                <p className="text-lg font-bold text-gray-900">
                  Promedio: {co2Stats.avg.toFixed(1)} ppm
                </p>
              </div>
            </div>
            <TrendingUp className="w-5 h-5 text-blue-500" />
          </div>
        </Card>

        <Card>
          <div className="flex items-start justify-between">
            <div>
              <p className="text-sm font-semibold text-gray-600 mb-4">SOx - Estadísticas 24h</p>
              <div className="mt-3 flex flex-col gap-2">
                <p className="text-xs text-gray-500">Mín: {soxStats.min.toFixed(1)} ppm</p>
                <p className="text-xs text-gray-500">Máx: {soxStats.max.toFixed(1)} ppm</p>
                <p className="text-lg font-bold text-gray-900">
                  Promedio: {soxStats.avg.toFixed(1)} ppm
                </p>
              </div>
            </div>
            <TrendingUp className="w-5 h-5 text-purple-500" />
          </div>
        </Card>
      </div>

      {/* CO Chart */}
      <Card>
        <h3 className="text-xl font-semibold text-gray-900 mb-6">
          Monóxido de Carbono (CO) - 24 Horas
        </h3>
        <ResponsiveContainer width="100%" height={300}>
          <AreaChart data={chartData}>
            <defs>
              <linearGradient id="colorCO" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#f97316" stopOpacity={0.8}/>
                <stop offset="95%" stopColor="#f97316" stopOpacity={0.1}/>
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
            <XAxis dataKey="time" stroke="#6b7280" style={{ fontSize: '12px' }} />
            <YAxis stroke="#6b7280" style={{ fontSize: '12px' }} />
            <Tooltip 
              contentStyle={{ 
                backgroundColor: '#1f2937', 
                border: 'none', 
                borderRadius: '8px',
                color: '#fff'
              }}
            />
            <Area 
              type="monotone" 
              dataKey="CO" 
              stroke="#f97316" 
              fillOpacity={1} 
              fill="url(#colorCO)"
              name="CO (ppm)"
            />
          </AreaChart>
        </ResponsiveContainer>
      </Card>

      {/* CO2 Chart */}
      <Card>
        <h3 className="text-xl font-semibold text-gray-900 mb-6">
          Dióxido de Carbono (CO₂) - 24 Horas
        </h3>
        <ResponsiveContainer width="100%" height={300}>
          <AreaChart data={chartData}>
            <defs>
              <linearGradient id="colorCO2" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.8}/>
                <stop offset="95%" stopColor="#3b82f6" stopOpacity={0.1}/>
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
            <XAxis dataKey="time" stroke="#6b7280" style={{ fontSize: '12px' }} />
            <YAxis stroke="#6b7280" style={{ fontSize: '12px' }} />
            <Tooltip 
              contentStyle={{ 
                backgroundColor: '#1f2937', 
                border: 'none', 
                borderRadius: '8px',
                color: '#fff'
              }}
            />
            <Area 
              type="monotone" 
              dataKey="CO2" 
              stroke="#3b82f6" 
              fillOpacity={1} 
              fill="url(#colorCO2)"
              name="CO₂ (ppm)"
            />
          </AreaChart>
        </ResponsiveContainer>
      </Card>

      {/* SOx Chart */}
      <Card>
        <h3 className="text-xl font-semibold text-gray-900 mb-6">
          Óxidos de Azufre (SOx) - 24 Horas
        </h3>
        <ResponsiveContainer width="100%" height={300}>
          <AreaChart data={chartData}>
            <defs>
              <linearGradient id="colorSOx" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#a855f7" stopOpacity={0.8}/>
                <stop offset="95%" stopColor="#a855f7" stopOpacity={0.1}/>
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
            <XAxis dataKey="time" stroke="#6b7280" style={{ fontSize: '12px' }} />
            <YAxis stroke="#6b7280" style={{ fontSize: '12px' }} />
            <Tooltip 
              contentStyle={{ 
                backgroundColor: '#1f2937', 
                border: 'none', 
                borderRadius: '8px',
                color: '#fff'
              }}
            />
            <Area 
              type="monotone" 
              dataKey="SOx" 
              stroke="#a855f7" 
              fillOpacity={1} 
              fill="url(#colorSOx)"
              name="SOx (ppm)"
            />
          </AreaChart>
        </ResponsiveContainer>
      </Card>

      {/* Combined Chart */}
      <Card>
        <h3 className="text-xl font-semibold text-gray-900 mb-6">
          Comparativa de Todos los Contaminantes
        </h3>
        <ResponsiveContainer width="100%" height={400}>
          <LineChart data={chartData}>
            <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
            <XAxis dataKey="time" stroke="#6b7280" style={{ fontSize: '12px' }} />
            <YAxis stroke="#6b7280" style={{ fontSize: '12px' }} />
            <Tooltip 
              contentStyle={{ 
                backgroundColor: '#1f2937', 
                border: 'none', 
                borderRadius: '8px',
                color: '#fff'
              }}
            />
            <Legend />
            <Line type="monotone" dataKey="CO" stroke="#f97316" strokeWidth={2} name="CO (ppm)" />
            <Line type="monotone" dataKey="CO2" stroke="#3b82f6" strokeWidth={2} name="CO₂ (ppm)" />
            <Line type="monotone" dataKey="SOx" stroke="#a855f7" strokeWidth={2} name="SOx (ppm)" />
          </LineChart>
        </ResponsiveContainer>
      </Card>
    </div>
  );
};
