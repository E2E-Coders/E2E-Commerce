import React from 'react'
import { render, screen } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import PasswordStrengthIndicator from './PasswordStrengthIndicator'

describe('PasswordStrengthIndicator', () => {
  it('deve renderizar o componente com senha válida', () => {
    render(<PasswordStrengthIndicator password="test123" />)
    // Verifica se o componente renderiza sem erros
    expect(screen.getByText('Critérios de Segurança:')).toBeInTheDocument()
  })

  it('deve mostrar critérios de validação', () => {
    render(<PasswordStrengthIndicator password="test" />)
    
    expect(screen.getByText('Critérios de Segurança:')).toBeInTheDocument()
    expect(screen.getByText('Mínimo 8 caracteres')).toBeInTheDocument()
    expect(screen.getByText('Pelo menos 1 letra maiúscula')).toBeInTheDocument()
    expect(screen.getByText('Pelo menos 1 letra minúscula')).toBeInTheDocument()
    expect(screen.getByText('Pelo menos 1 número')).toBeInTheDocument()
    expect(screen.getByText('Pelo menos 1 caractere especial')).toBeInTheDocument()
  })

  it('deve mostrar barra de progresso', () => {
    const { container } = render(<PasswordStrengthIndicator password="Senha123" />)
    const progressBar = container.querySelector('.bg-gray-200')
    expect(progressBar).toBeInTheDocument()
  })

  it('deve sugerir melhorias para senhas fracas', () => {
    render(<PasswordStrengthIndicator password="abc" />)
    
    // Verifica se há erros sendo mostrados
    expect(screen.getByText('Senha deve ter pelo menos 8 caracteres')).toBeInTheDocument()
  })
})