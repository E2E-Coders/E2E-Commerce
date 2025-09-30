import React from 'react';
import { Link } from 'react-router-dom';
import { AlertTriangle, Home, ArrowLeft } from 'lucide-react';

function Unauthorized() {
  return (
    <div className="container">
      <div className="max-w-md mx-auto mt-20 text-center">
        <div className="card">
          <div className="card-body">
            <AlertTriangle className="mx-auto text-red-500 mb-4" size={64} />
            <h1 className="text-2xl font-bold text-gray-800 mb-2">
              Acesso Negado
            </h1>
            <p className="text-gray-600 mb-6">
              Você não tem permissão para acessar esta página.
            </p>
            
            <div className="space-y-3">
              <Link 
                to="/" 
                className="btn btn-primary w-full flex items-center justify-center gap-2"
              >
                <Home size={20} />
                Voltar ao Início
              </Link>
              
              <button 
                onClick={() => window.history.back()} 
                className="btn btn-secondary w-full flex items-center justify-center gap-2"
              >
                <ArrowLeft size={20} />
                Voltar
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Unauthorized;