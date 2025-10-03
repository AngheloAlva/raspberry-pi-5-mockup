import { create } from 'zustand';

export interface SensorData {
  co: number;
  co2: number;
  sox: number;
  timestamp: number;
}

export interface AlertConfig {
  co: number;
  co2: number;
  sox: number;
}

interface SensorStore {
  currentData: SensorData;
  historicalData: SensorData[];
  isOnline: boolean;
  alertConfig: AlertConfig;
  updateSensorData: () => void;
  setAlertConfig: (config: AlertConfig) => void;
  initializeHistoricalData: () => void;
}

// Generate random sensor value with some variation
const generateValue = (base: number, variance: number): number => {
  return Math.max(0, base + (Math.random() - 0.5) * variance);
};

export const useSensorStore = create<SensorStore>((set, get) => ({
  currentData: {
    co: 35,
    co2: 420,
    sox: 8,
    timestamp: Date.now(),
  },
  historicalData: [],
  isOnline: true,
  alertConfig: {
    co: 50,
    co2: 1000,
    sox: 20,
  },

  updateSensorData: () => {
    const { currentData, historicalData } = get();
    
    const newData: SensorData = {
      co: generateValue(currentData.co, 10),
      co2: generateValue(currentData.co2, 50),
      sox: generateValue(currentData.sox, 3),
      timestamp: Date.now(),
    };

    set({
      currentData: newData,
      historicalData: [...historicalData.slice(-287), newData], // Keep last 24h (288 points at 5min intervals)
      isOnline: Math.random() > 0.05, // 95% uptime simulation
    });
  },

  setAlertConfig: (config: AlertConfig) => {
    set({ alertConfig: config });
  },

  initializeHistoricalData: () => {
    const data: SensorData[] = [];
    const now = Date.now();
    const interval = 5 * 60 * 1000; // 5 minutes

    // Generate 24 hours of historical data (288 points)
    for (let i = 287; i >= 0; i--) {
      data.push({
        co: generateValue(35, 15),
        co2: generateValue(420, 100),
        sox: generateValue(8, 5),
        timestamp: now - i * interval,
      });
    }

    set({ historicalData: data });
  },
}));
