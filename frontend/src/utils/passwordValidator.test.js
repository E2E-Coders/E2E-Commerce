import { describe, it, expect } from 'vitest'
import { validatePasswordStrength, getPasswordStrength } from './passwordValidator'

describe('Password Validator', () => {
  describe('validatePasswordStrength', () => {
    it('deve validar senha forte corretamente', () => {
      const result = validatePasswordStrength('MinhaSenh@Forte123')
      expect(result.isValid).toBe(true)
      expect(result.strength).toBe('strong')
      expect(result.errors).toHaveLength(0)
    })

    it('deve rejeitar senha muito curta', () => {
      const result = validatePasswordStrength('Abc1!')
      expect(result.isValid).toBe(false)
      expect(result.errors).toContain('Senha deve ter pelo menos 8 caracteres')
    })

    it('deve rejeitar senha sem maiúscula', () => {
      const result = validatePasswordStrength('minhasenha123!')
      expect(result.isValid).toBe(false)
      expect(result.errors).toContain('Senha deve conter pelo menos uma letra maiúscula')
    })

    it('deve rejeitar senha sem minúscula', () => {
      const result = validatePasswordStrength('MINHASENHA123!')
      expect(result.isValid).toBe(false)
      expect(result.errors).toContain('Senha deve conter pelo menos uma letra minúscula')
    })

    it('deve rejeitar senha sem número', () => {
      const result = validatePasswordStrength('MinhaSenha!')
      expect(result.isValid).toBe(false)
      expect(result.errors).toContain('Senha deve conter pelo menos um número')
    })

    it('deve rejeitar senha sem caractere especial', () => {
      const result = validatePasswordStrength('MinhaSenha123')
      expect(result.isValid).toBe(false)
      expect(result.errors).toContain('Senha deve conter pelo menos um caractere especial (!@#$%^&*)')
    })

    it('deve rejeitar senhas comuns', () => {
      const result = validatePasswordStrength('Password123!')
      expect(result.isValid).toBe(false)
      expect(result.errors).toContain('Senha não pode conter padrões comuns ou previsíveis')
    })
  })

  describe('getPasswordStrength', () => {
    it('deve retornar força "Muito Fraca" para senha vazia', () => {
      const result = getPasswordStrength('')
      expect(result.strength).toBe('Muito Fraca')
      expect(result.score).toBe(0)
      expect(result.percentage).toBe(0)
    })

    it('deve retornar força "Fraca" para senhas simples', () => {
      const result = getPasswordStrength('abc123')
      expect(result.strength).toBe('Fraca')
      expect(result.percentage).toBeLessThan(40)
    })

    it('deve retornar força "Média" para senhas com alguns critérios', () => {
      const result = getPasswordStrength('Senha123')
      expect(result.strength).toBe('Média')
      expect(result.percentage).toBeGreaterThanOrEqual(40)
      expect(result.percentage).toBeLessThan(70)
    })

    it('deve retornar força "Forte" para senhas com todos os critérios', () => {
      const result = getPasswordStrength('MinhaSenh@Forte123')
      expect(result.strength).toBe('Forte')
      expect(result.percentage).toBeGreaterThanOrEqual(70)
    })

    it('deve penalizar senhas com padrões repetitivos', () => {
      const result1 = getPasswordStrength('Abc123!@#')
      const result2 = getPasswordStrength('Aaabbbccc123!')
      expect(result2.score).toBeLessThan(result1.score)
    })
  })
})