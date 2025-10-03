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
    <Card className={`transition-all ${isAlert ? 'border-red-300' : ''}`}>
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <p className="text-xs font-medium text-gray-500 mb-2">{title}</p>
          <p className="text-2xl font-semibold text-gray-900">
            {value.toFixed(1)}
            <span className="text-sm ml-1 text-gray-400">{unit}</span>
          </p>
          {isAlert && (
            <p className="mt-2 text-xs text-red-600 font-medium">Umbral excedido</p>
          )}
        </div>
        <div className={`p-2 rounded-md ${color}`}>
          <Icon className="w-4 h-4 text-white" />
        </div>
      </div>
    </Card>
  );
};
