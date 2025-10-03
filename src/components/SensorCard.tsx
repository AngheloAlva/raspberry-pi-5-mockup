import { Card } from './Card';
import type { LucideIcon } from 'lucide-react';

interface SensorCardProps {
  title: string;
  value: number;
  unit: string;
  icon: LucideIcon;
  color: string;
  alertThreshold?: number;
}

export const SensorCard = ({ 
  title, 
  value, 
  unit, 
  icon: Icon, 
  color,
  alertThreshold 
}: SensorCardProps) => {
  const isAlert = alertThreshold !== undefined && value > alertThreshold;

  return (
    <Card className={`transition-all ${isAlert ? 'ring-2 ring-red-500' : ''}`}>
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <p className="text-sm font-semibold text-gray-600 mb-3">{title}</p>
          <p className="mt-2 text-4xl font-bold text-gray-900">
            {value.toFixed(1)}
            <span className="text-xl ml-2 text-gray-500">{unit}</span>
          </p>
          {isAlert && (
            <p className="mt-3 text-xs text-red-600 font-semibold">⚠️ Alerta: Umbral excedido</p>
          )}
        </div>
        <div className={`p-4 rounded-xl ${color}`}>
          <Icon className="w-7 h-7 text-white" />
        </div>
      </div>
    </Card>
  );
};
