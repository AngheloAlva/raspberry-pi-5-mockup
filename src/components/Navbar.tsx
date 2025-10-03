import { Activity } from "lucide-react";
import { useSensorStore } from "../store/sensorStore";

export const Navbar = () => {
    const isOnline = useSensorStore((state) => state.isOnline);

    return (
        <nav className="bg-white border-b border-gray-200">
            <div className="px-6 py-3">
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                        <Activity className="w-5 h-5 text-gray-700" />
                        <h1 className="text-lg font-semibold text-gray-900">
                            Monitoreo Ambiental
                        </h1>
                    </div>

                    <div className="flex items-center gap-1.5">
                        {isOnline ? (
                            <>
                                <div className="w-1.5 h-1.5 bg-emerald-500 rounded-full"></div>
                                <span className="text-xs font-medium text-gray-600">
                                    Online
                                </span>
                            </>
                        ) : (
                            <>
                                <div className="w-1.5 h-1.5 bg-gray-400 rounded-full"></div>
                                <span className="text-xs font-medium text-gray-600">
                                    Offline
                                </span>
                            </>
                        )}
                    </div>
                </div>
            </div>
        </nav>
    );
};
