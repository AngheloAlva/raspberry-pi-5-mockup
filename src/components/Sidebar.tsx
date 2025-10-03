import { LayoutDashboard, FileText, Settings } from "lucide-react";

interface SidebarProps {
    activeView: string;
    onViewChange: (view: string) => void;
}

export const Sidebar = ({ activeView, onViewChange }: SidebarProps) => {
    const menuItems = [
        { id: "dashboard", label: "Dashboard", icon: LayoutDashboard },
        { id: "reports", label: "Reportes Históricos", icon: FileText },
        { id: "config", label: "Configuración de Sensores", icon: Settings },
    ];

    return (
        <aside className="bg-gray-900 text-gray-100 w-72 min-h-screen p-6">
            <nav className="flex flex-col gap-3">
                {menuItems.map((item) => {
                    const Icon = item.icon;
                    const isActive = activeView === item.id;

                    return (
                        <button
                            key={item.id}
                            onClick={() => onViewChange(item.id)}
                            className={`w-full flex items-center text-start gap-3 px-5 py-4 rounded-lg transition-all ${
                                isActive
                                    ? "bg-emerald-600 text-white shadow-lg"
                                    : "text-gray-300 hover:bg-gray-800 hover:text-white"
                            }`}
                        >
                            <Icon className="w-5 h-5" />
                            <span className="font-medium">{item.label}</span>
                        </button>
                    );
                })}
            </nav>
        </aside>
    );
};
