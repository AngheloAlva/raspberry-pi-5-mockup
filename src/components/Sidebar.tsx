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
        <aside className="bg-gray-50 border-r border-gray-200 w-56 min-h-screen p-4">
            <nav className="flex flex-col gap-1">
                {menuItems.map((item) => {
                    const Icon = item.icon;
                    const isActive = activeView === item.id;

                    return (
                        <button
                            key={item.id}
                            onClick={() => onViewChange(item.id)}
                            className={`w-full flex items-center text-start gap-2 px-3 py-2 rounded-md transition-all text-sm ${
                                isActive
                                    ? "bg-gray-900 text-white"
                                    : "text-gray-600 hover:bg-gray-100"
                            }`}
                        >
                            <Icon className="w-4 h-4" />
                            <span className="font-medium">{item.label}</span>
                        </button>
                    );
                })}
            </nav>
        </aside>
    );
};
