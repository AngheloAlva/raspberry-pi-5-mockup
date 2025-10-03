import { useState } from 'react';
import { Navbar } from './components/Navbar';
import { Sidebar } from './components/Sidebar';
import { Dashboard } from './views/Dashboard';
import { Reports } from './views/Reports';
import { Configuration } from './views/Configuration';
import { Welcome } from './views/Welcome';

function App() {
  const [showWelcome, setShowWelcome] = useState(true);
  const [activeView, setActiveView] = useState('dashboard');

  const renderView = () => {
    switch (activeView) {
      case 'dashboard':
        return <Dashboard />;
      case 'reports':
        return <Reports />;
      case 'config':
        return <Configuration />;
      default:
        return <Dashboard />;
    }
  };

  if (showWelcome) {
    return <Welcome onEnter={() => setShowWelcome(false)} />;
  }

  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      
      <div className="flex">
        <Sidebar activeView={activeView} onViewChange={setActiveView} />
        
        <main className="flex-1 p-4 md:p-6 bg-gray-50">
          <div className="max-w-7xl mx-auto">
            {renderView()}
          </div>
        </main>
      </div>

      {/* Footer */}
      <footer className="bg-white border-t border-gray-200 mt-8">
        <div className="max-w-7xl mx-auto px-6 py-3">
          <p className="text-center text-xs text-gray-500">
            Proyecto de Monitoreo Ambiental – Maqueta de Demostración
          </p>
        </div>
      </footer>
    </div>
  );
}

export default App;
