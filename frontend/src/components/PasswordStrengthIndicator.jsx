import React from 'react'
import { validatePasswordStrength, getPasswordStrengthColor, getPasswordStrengthText } from '../utils/passwordValidator'
import { CheckCircle, XCircle, AlertCircle } from 'lucide-react'

const PasswordStrengthIndicator = ({ password, showDetails = true }) => {
  const validation = validatePasswordStrength(password)
  
  if (!password) return null

  const getProgressWidth = () => {
    return `${(validation.score / 7) * 100}%`
  }

  const getProgressClass = () => {
    switch (validation.strength) {
      case 'strong':
        return 'password-strength-progress strong'
      case 'medium':
        return 'password-strength-progress medium'
      case 'weak':
      default:
        return 'password-strength-progress weak'
    }
  }

  const getTextClass = () => {
    switch (validation.strength) {
      case 'strong':
        return 'password-strength-text strong'
      case 'medium':
        return 'password-strength-text medium'
      case 'weak':
      default:
        return 'password-strength-text weak'
    }
  }

  return (
    <div className="password-strength-container">
      {/* Barra de Progresso */}
      <div className="password-strength-bar">
        <div 
          className={getProgressClass()}
          style={{ width: getProgressWidth() }}
        />
      </div>

      {/* Indicador de Força */}
      <div className={getTextClass()}>
        {getPasswordStrengthText(validation.strength)}
      </div>

      {showDetails && (
        <>
          {/* Feedback de Erros, Avisos e Sugestões */}
          {(validation.errors.length > 0 || validation.warnings.length > 0 || validation.suggestions.length > 0) && (
            <div className="password-feedback">
              {validation.errors.map((error, index) => (
                <div key={`error-${index}`} className="password-feedback-item error">
                  <XCircle size={12} className="mr-1.5 flex-shrink-0 mt-0.5" />
                  <span>{error}</span>
                </div>
              ))}

              {validation.warnings.map((warning, index) => (
                <div key={`warning-${index}`} className="password-feedback-item warning">
                  <AlertCircle size={12} className="mr-1.5 flex-shrink-0 mt-0.5" />
                  <span>{warning}</span>
                </div>
              ))}

              {validation.suggestions.map((suggestion, index) => (
                <div key={`suggestion-${index}`} className="password-feedback-item suggestion">
                  <CheckCircle size={12} className="mr-1.5 flex-shrink-0 mt-0.5" />
                  <span>{suggestion}</span>
                </div>
              ))}
            </div>
          )}

          {/* Critérios de Validação */}
          <div className="password-criteria">
            <div className="password-criteria-title">Requisitos de segurança:</div>
            <div className="space-y-1">
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
  <div className={`password-criteria-item ${met ? 'met' : 'unmet'}`}>
    {met ? (
      <CheckCircle size={12} className="mr-1.5 flex-shrink-0" data-testid="check-icon" />
    ) : (
      <XCircle size={12} className="mr-1.5 flex-shrink-0" data-testid="x-icon" />
    )}
    <span>{text}</span>
  </div>
)

export default PasswordStrengthIndicator