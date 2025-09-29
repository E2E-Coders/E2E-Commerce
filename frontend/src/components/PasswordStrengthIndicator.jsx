import React from 'react'
import { validatePasswordStrength, getPasswordStrengthColor, getPasswordStrengthText } from '../utils/passwordValidator'
import { CheckCircle, XCircle, AlertCircle } from 'lucide-react'

const PasswordStrengthIndicator = ({ password, showDetails = true }) => {
  const validation = validatePasswordStrength(password)
  
  if (!password) return null

  const getProgressWidth = () => {
    return `${(validation.score / 7) * 100}%`
  }

  const getProgressColor = () => {
    switch (validation.strength) {
      case 'strong':
        return 'bg-green-500'
      case 'medium':
        return 'bg-yellow-500'
      case 'weak':
      default:
        return 'bg-red-500'
    }
  }

  return (
    <div className="mt-2 space-y-2">
      {/* Barra de Progresso */}
      <div className="w-full bg-gray-200 rounded-full h-2">
        <div 
          className={`h-2 rounded-full transition-all duration-300 ${getProgressColor()}`}
          style={{ width: getProgressWidth() }}
        />
      </div>

      {/* Indicador de Força */}
      <div className={`text-sm font-medium ${getPasswordStrengthColor(validation.strength)}`}>
        {getPasswordStrengthText(validation.strength)}
      </div>

      {showDetails && (
        <>
          {/* Erros */}
          {validation.errors.length > 0 && (
            <div className="space-y-1">
              {validation.errors.map((error, index) => (
                <div key={index} className="flex items-center text-red-600 text-sm">
                  <XCircle size={16} className="mr-2 flex-shrink-0" />
                  <span>{error}</span>
                </div>
              ))}
            </div>
          )}

          {/* Avisos */}
          {validation.warnings.length > 0 && (
            <div className="space-y-1">
              {validation.warnings.map((warning, index) => (
                <div key={index} className="flex items-center text-yellow-600 text-sm">
                  <AlertCircle size={16} className="mr-2 flex-shrink-0" />
                  <span>{warning}</span>
                </div>
              ))}
            </div>
          )}

          {/* Sugestões */}
          {validation.suggestions.length > 0 && validation.errors.length === 0 && (
            <div className="space-y-1">
              {validation.suggestions.map((suggestion, index) => (
                <div key={index} className="flex items-center text-blue-600 text-sm">
                  <CheckCircle size={16} className="mr-2 flex-shrink-0" />
                  <span>{suggestion}</span>
                </div>
              ))}
            </div>
          )}

          {/* Critérios de Validação */}
          <div className="mt-3 p-3 bg-gray-50 rounded-lg">
            <h4 className="text-sm font-medium text-gray-700 mb-2">Critérios de Segurança:</h4>
            <div className="grid grid-cols-1 gap-1 text-xs">
              <CriteriaItem 
                met={password.length >= 8} 
                text="Mínimo 8 caracteres" 
              />
              <CriteriaItem 
                met={/[A-Z]/.test(password)} 
                text="Pelo menos 1 letra maiúscula" 
              />
              <CriteriaItem 
                met={/[a-z]/.test(password)} 
                text="Pelo menos 1 letra minúscula" 
              />
              <CriteriaItem 
                met={/\d/.test(password)} 
                text="Pelo menos 1 número" 
              />
              <CriteriaItem 
                met={/[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(password)} 
                text="Pelo menos 1 caractere especial" 
              />
            </div>
          </div>
        </>
      )}
    </div>
  )
}

const CriteriaItem = ({ met, text }) => (
  <div className={`flex items-center ${met ? 'text-green-600' : 'text-gray-400'}`}>
    {met ? (
      <CheckCircle size={14} className="mr-2" data-testid="check-icon" />
    ) : (
      <XCircle size={14} className="mr-2" data-testid="x-icon" />
    )}
    <span>{text}</span>
  </div>
)

export default PasswordStrengthIndicator