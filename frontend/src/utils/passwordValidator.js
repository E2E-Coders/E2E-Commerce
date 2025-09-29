// Utilitário para validação de senha forte
// Implementa critérios rigorosos de segurança baseados em melhores práticas

export const passwordStrengthConfig = {
  minLength: 8,
  maxLength: 128,
  requireUppercase: true,
  requireLowercase: true,
  requireNumbers: true,
  requireSpecialChars: true,
  forbiddenPatterns: [
    'password', '123456', 'qwerty', 'abc123', 'admin', 'user',
    'senha', 'password123', '12345678', 'qwerty123'
  ]
}

export const validatePasswordStrength = (password) => {
  const errors = []
  const warnings = []
  let score = 0

  // Verificar comprimento mínimo
  if (password.length < passwordStrengthConfig.minLength) {
    errors.push(`Senha deve ter pelo menos ${passwordStrengthConfig.minLength} caracteres`)
  } else {
    score += 1
  }

  // Verificar comprimento máximo
  if (password.length > passwordStrengthConfig.maxLength) {
    errors.push(`Senha deve ter no máximo ${passwordStrengthConfig.maxLength} caracteres`)
  }

  // Verificar letra maiúscula
  if (passwordStrengthConfig.requireUppercase && !/[A-Z]/.test(password)) {
    errors.push('Senha deve conter pelo menos uma letra maiúscula')
  } else if (/[A-Z]/.test(password)) {
    score += 1
  }

  // Verificar letra minúscula
  if (passwordStrengthConfig.requireLowercase && !/[a-z]/.test(password)) {
    errors.push('Senha deve conter pelo menos uma letra minúscula')
  } else if (/[a-z]/.test(password)) {
    score += 1
  }

  // Verificar números
  if (passwordStrengthConfig.requireNumbers && !/\d/.test(password)) {
    errors.push('Senha deve conter pelo menos um número')
  } else if (/\d/.test(password)) {
    score += 1
  }

  // Verificar caracteres especiais
  if (passwordStrengthConfig.requireSpecialChars && !/[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(password)) {
    errors.push('Senha deve conter pelo menos um caractere especial (!@#$%^&*)')
  } else if (/[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(password)) {
    score += 1
  }

  // Verificar padrões proibidos
  const lowerPassword = password.toLowerCase()
  for (const pattern of passwordStrengthConfig.forbiddenPatterns) {
    if (lowerPassword.includes(pattern.toLowerCase())) {
      errors.push('Senha não pode conter padrões comuns ou previsíveis')
      break
    }
  }

  // Verificar sequências
  if (/(.)\1{2,}/.test(password)) {
    warnings.push('Evite repetir o mesmo caractere consecutivamente')
  }

  if (/123|234|345|456|567|678|789|890|abc|bcd|cde|def/.test(lowerPassword)) {
    warnings.push('Evite sequências óbvias de caracteres')
  }

  // Calcular força da senha
  let strength = 'weak'
  if (score >= 5 && errors.length === 0) {
    strength = 'strong'
  } else if (score >= 3 && errors.length === 0) {
    strength = 'medium'
  }

  // Bonus para comprimento extra
  if (password.length >= 12) {
    score += 1
  }
  if (password.length >= 16) {
    score += 1
  }

  return {
    isValid: errors.length === 0,
    strength,
    score: Math.min(score, 7),
    errors,
    warnings,
    suggestions: generateSuggestions(password, errors)
  }
}

const generateSuggestions = (password, errors) => {
  const suggestions = []
  
  if (errors.some(e => e.includes('maiúscula'))) {
    suggestions.push('Adicione pelo menos uma letra maiúscula (A-Z)')
  }
  
  if (errors.some(e => e.includes('minúscula'))) {
    suggestions.push('Adicione pelo menos uma letra minúscula (a-z)')
  }
  
  if (errors.some(e => e.includes('número'))) {
    suggestions.push('Adicione pelo menos um número (0-9)')
  }
  
  if (errors.some(e => e.includes('especial'))) {
    suggestions.push('Adicione pelo menos um caractere especial (!@#$%^&*)')
  }
  
  if (errors.some(e => e.includes('caracteres'))) {
    suggestions.push('Use pelo menos 8 caracteres para maior segurança')
  }

  if (password.length < 12) {
    suggestions.push('Considere usar 12+ caracteres para máxima segurança')
  }

  return suggestions
}

export const getPasswordStrength = (password) => {
  if (!password) {
    return {
      strength: 'Muito Fraca',
      score: 0,
      percentage: 0
    }
  }

  let score = 0
  
  // Critérios de pontuação
  if (password.length >= 8) score += 1
  if (password.length >= 12) score += 1
  if (/[a-z]/.test(password)) score += 1
  if (/[A-Z]/.test(password)) score += 1
  if (/[0-9]/.test(password)) score += 1
  if (/[^A-Za-z0-9]/.test(password)) score += 1
  
  // Penalizar padrões repetitivos
  if (/(.)\1{2,}/.test(password)) score -= 1
  if (/123|abc|qwe/i.test(password)) score -= 1
  
  // Bonus para diversidade
  const uniqueChars = new Set(password).size
  if (uniqueChars >= password.length * 0.7) score += 1
  
  const maxScore = 7
  const percentage = Math.max(0, Math.min(100, (score / maxScore) * 100))
  
  let strength = 'Muito Fraca'
  if (percentage >= 70) strength = 'Forte'
  else if (percentage >= 40) strength = 'Média'
  else if (percentage > 0) strength = 'Fraca'
  
  return {
    strength,
    score: Math.max(0, score),
    percentage: Math.round(percentage)
  }
}

export const getPasswordStrengthColor = (strength) => {
  switch (strength) {
    case 'strong':
      return 'text-green-600'
    case 'medium':
      return 'text-yellow-600'
    case 'weak':
    default:
      return 'text-red-600'
  }
}

export const getPasswordStrengthText = (strength) => {
  switch (strength) {
    case 'strong':
      return 'Senha Forte 💪'
    case 'medium':
      return 'Senha Média ⚠️'
    case 'weak':
    default:
      return 'Senha Fraca ❌'
  }
}