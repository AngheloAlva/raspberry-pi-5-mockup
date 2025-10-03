import { Activity, ArrowRight, Gauge, LineChart, Settings } from "lucide-react";

interface WelcomeProps {
    onEnter: () => void;
}

export const Welcome = ({ onEnter }: WelcomeProps) => {
    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center p-6">
            <div className="max-w-3xl w-full">
                {/* Header */}
                <div className="text-center mb-8">
                    <div className="flex items-center justify-center gap-3 mb-4">
                        <Activity className="w-12 h-12 text-gray-900" />
                        <h1 className="text-4xl font-bold text-gray-900">
                            Monitoreo Ambiental
                        </h1>
                    </div>
                    <p className="text-lg text-gray-600">
                        Sistema de Sensores con Raspberry Pi 5
                    </p>
                </div>

                {/* Main Card */}
                <div className="bg-white rounded-lg border border-gray-200 p-8 mb-6">
                    <h2 className="text-2xl font-semibold text-gray-900 mb-4">
                        Bienvenido al Sistema de Monitoreo
                    </h2>
                    
                    <p className="text-gray-600 mb-6 leading-relaxed">
                        Este dashboard te permite monitorear en tiempo real los niveles de 
                        contaminantes ambientales capturados por sensores conectados a una 
                        Raspberry Pi 5. Visualiza datos de CO, CO₂ y SOx, configura alertas 
                        personalizadas y analiza tendencias históricas.
                    </p>

                    {/* Features */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
                        <div className="flex flex-col items-center text-center p-4 bg-gray-50 rounded-md">
                            <Gauge className="w-8 h-8 text-gray-700 mb-2" />
                            <h3 className="text-sm font-semibold text-gray-900 mb-1">
                                Tiempo Real
                            </h3>
                            <p className="text-xs text-gray-600">
                                Monitoreo continuo de sensores
                            </p>
                        </div>

                        <div className="flex flex-col items-center text-center p-4 bg-gray-50 rounded-md">
                            <LineChart className="w-8 h-8 text-gray-700 mb-2" />
                            <h3 className="text-sm font-semibold text-gray-900 mb-1">
                                Reportes Históricos
                            </h3>
                            <p className="text-xs text-gray-600">
                                Análisis de datos de 24 horas
                            </p>
                        </div>

                        <div className="flex flex-col items-center text-center p-4 bg-gray-50 rounded-md">
                            <Settings className="w-8 h-8 text-gray-700 mb-2" />
                            <h3 className="text-sm font-semibold text-gray-900 mb-1">
                                Configuración
                            </h3>
                            <p className="text-xs text-gray-600">
                                Alertas personalizables
                            </p>
                        </div>
                    </div>

                    {/* CTA Button */}
                    <button
                        onClick={onEnter}
                        className="w-full flex items-center justify-center gap-2 px-6 py-4 bg-gray-900 text-white rounded-md hover:bg-gray-800 transition-colors font-medium"
                    >
                        <span>Acceder al Dashboard</span>
                        <ArrowRight className="w-5 h-5" />
                    </button>
                </div>

                {/* Footer Note */}
                <p className="text-center text-xs text-gray-500">
                    Proyecto de Monitoreo Ambiental – Maqueta de Demostración
                </p>
            </div>
        </div>
    );
};
