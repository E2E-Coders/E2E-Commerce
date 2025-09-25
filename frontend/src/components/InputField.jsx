import { useState, useEffect } from 'react'
import { Eye, EyeOff, Check, X } from 'lucide-react'

const InputField = ({
  type = 'text',
  name,
  value,
  onChange,
  placeholder,
  label,
  icon: Icon,
  required = false,
  validation,
  showPasswordToggle = false,
  className = '',
  ...props
}) => {
  const [showPassword, setShowPassword] = useState(false)
  const [isValid, setIsValid] = useState(null)
  const [errorMessage, setErrorMessage] = useState('')
  const [isTouched, setIsTouched] = useState(false)

  // Validação em tempo real
  useEffect(() => {
    if (isTouched && validation && value) {
      const result = validation(value)
      setIsValid(result.isValid)
      setErrorMessage(result.message || '')
    } else if (isTouched && required && !value) {
      setIsValid(false)
      setErrorMessage('Este campo é obrigatório')
    } else if (!isTouched || !value) {
      setIsValid(null)
      setErrorMessage('')
    }
  }, [value, validation, required, isTouched])

  const handleBlur = () => {
    setIsTouched(true)
  }

  const handleChange = (e) => {
    onChange(e)
    if (!isTouched) setIsTouched(true)
  }

  const inputType = showPasswordToggle && showPassword ? 'text' : type
  const fieldClass = `auth-form-group ${
    isValid === true ? 'field-valid' : 
    isValid === false ? 'field-invalid' : ''
  } ${className}`

  return (
    <div className={fieldClass}>
      {label && (
        <label className="auth-form-label" htmlFor={name}>
          {label}
          {required && <span className="text-red-500 ml-1">*</span>}
        </label>
      )}
      
      <div className="auth-input-container">
        {Icon && (
          <Icon 
            className="auth-input-icon" 
            size={20} 
          />
        )}
        
        <input
          id={name}
          name={name}
          type={inputType}
          value={value}
          onChange={handleChange}
          onBlur={handleBlur}
          placeholder={placeholder}
          className="auth-input"
          {...props}
        />
        
        {/* Ícone de validação */}
        {isValid === true && (
          <Check 
            className="auth-input-icon-right text-green-500" 
            size={20} 
          />
        )}
        
        {isValid === false && (
          <X 
            className="auth-input-icon-right text-red-500" 
            size={20} 
          />
        )}
        
        {/* Toggle de senha */}
        {showPasswordToggle && (
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="auth-input-icon-right"
            style={{ right: isValid !== null ? '2.5rem' : '1rem' }}
          >
            {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
          </button>
        )}
      </div>
      
      {/* Mensagem de erro */}
      {isValid === false && errorMessage && (
        <div className="auth-error">
          {errorMessage}
        </div>
      )}
    </div>
  )
}

export default InputField