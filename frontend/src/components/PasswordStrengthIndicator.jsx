import { useMemo } from 'react'

const PasswordStrengthIndicator = ({ password }) => {
  const strength = useMemo(() => {
    if (!password) return { level: 0, text: '', class: '' }
    
    let score = 0
    const checks = {
      length: password.length >= 8,
      lowercase: /[a-z]/.test(password),
      uppercase: /[A-Z]/.test(password),
      numbers: /\d/.test(password),
      symbols: /[^A-Za-z0-9]/.test(password)
    }
    
    // Pontuação baseada nos critérios
    if (checks.length) score += 1
    if (checks.lowercase) score += 1
    if (checks.uppercase) score += 1
    if (checks.numbers) score += 1
    if (checks.symbols) score += 1
    
    // Bônus para senhas mais longas
    if (password.length >= 12) score += 1
    if (password.length >= 16) score += 1
    
    // Determinar nível de força
    if (score <= 2) {
      return { 
        level: 1, 
        text: 'Fraca', 
        class: 'password-strength-weak',
        color: '#ef4444'
      }
    } else if (score <= 4) {
      return { 
        level: 2, 
        text: 'Média', 
        class: 'password-strength-medium',
        color: '#f59e0b'
      }
    } else {
      return { 
        level: 3, 
        text: 'Forte', 
        class: 'password-strength-strong',
        color: '#10b981'
      }
    }
  }, [password])

  const requirements = [
    { text: 'Pelo menos 8 caracteres', met: password.length >= 8 },
    { text: 'Letras minúsculas', met: /[a-z]/.test(password) },
    { text: 'Letras maiúsculas', met: /[A-Z]/.test(password) },
    { text: 'Números', met: /\d/.test(password) },
    { text: 'Símbolos especiais', met: /[^A-Za-z0-9]/.test(password) }
  ]

  if (!password) return null

  return (
    <div className="password-strength">
      <div className={`password-strength-bar ${strength.class}`}>
        <div className="password-strength-fill"></div>
      </div>
      
      <div className={`password-strength-text ${strength.class}`}>
        Força da senha: {strength.text}
      </div>
      
      {/* Lista de requisitos */}
      <div className="mt-2 space-y-1">
        {requirements.map((req, index) => (
          <div 
            key={index}
            className={`flex items-center text-xs ${
              req.met ? 'text-green-600' : 'text-gray-400'
            }`}
          >
            <div 
              className={`w-2 h-2 rounded-full mr-2 ${
                req.met ? 'bg-green-500' : 'bg-gray-300'
              }`}
            />
            {req.text}
          </div>
        ))}
      </div>
    </div>
  )
}

export default PasswordStrengthIndicator