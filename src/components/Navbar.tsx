import { Activity, Wifi, WifiOff } from "lucide-react";
import { useSensorStore } from "../store/sensorStore";

export const Navbar = () => {
    const isOnline = useSensorStore((state) => state.isOnline);

    return (
        <nav className="bg-gradient-to-r from-emerald-600 to-teal-600 text-white shadow-lg">
            <div className="px-6 py-4">
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        <Activity className="w-8 h-8" />
                        <div>
                            <h1 className="text-2xl font-bold">
                                Monitoreo Ambiental – Raspberry Pi 5
                            </h1>
                            <p className="text-sm text-emerald-100">
                                Sistema de Sensores en Tiempo Real
                            </p>
                        </div>
                    </div>

                    <div className="flex items-center gap-2">
                        {isOnline ? (
                            <>
                                <Wifi className="w-5 h-5" />
                                <span className="text-sm font-medium">
                                    Online
                                </span>
                                <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                            </>
                        ) : (
                            <>
                                <WifiOff className="w-5 h-5" />
                                <span className="text-sm font-medium">
                                    Offline
                                </span>
                                <div className="w-2 h-2 bg-red-400 rounded-full"></div>
                            </>
                        )}
                    </div>
                </div>
            </div>
        </nav>
    );
};
