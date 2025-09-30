import { useState, useEffect } from 'react'
import { useAuth } from '../contexts/AuthContext'
import { usePermissions } from '../hooks/usePermissions'
import { PERMISSIONS, USER_ROLE_LABELS } from '../constants/userRoles'
import { User, Mail, Lock, Save, Shield, Edit } from 'lucide-react'
import toast from 'react-hot-toast'

function UserProfile() {
  const { user, logout } = useAuth()
  const { hasPermission, canEditUser } = usePermissions()
  const [isEditing, setIsEditing] = useState(false)
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  })
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    if (user) {
      setFormData({
        name: user.name || '',
        email: user.email || '',
        currentPassword: '',
        newPassword: '',
        confirmPassword: ''
      })
    }
  }, [user])

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  const validateForm = () => {
    if (formData.name.trim().length < 2) {
      toast.error('Nome deve ter pelo menos 2 caracteres')
      return false
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(formData.email)) {
      toast.error('Por favor, insira um email válido')
      return false
    }

    // Se está alterando senha, validar
    if (formData.newPassword) {
      if (!formData.currentPassword) {
        toast.error('Senha atual é obrigatória para alterar a senha')
        return false
      }

      if (formData.newPassword.length < 6) {
        toast.error('Nova senha deve ter pelo menos 6 caracteres')
        return false
      }

      if (formData.newPassword !== formData.confirmPassword) {
        toast.error('Confirmação de senha não confere')
        return false
      }
    }

    return true
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    
    if (!validateForm()) {
      return
    }

    // Verificar se o usuário pode editar seus próprios dados
    if (!canEditUser(user.id)) {
      toast.error('Você não tem permissão para editar este perfil')
      return
    }

    setLoading(true)

    try {
      // Em produção, fazer chamada para API
      const updateData = {
        name: formData.name,
        email: formData.email
      }

      if (formData.newPassword) {
        updateData.currentPassword = formData.currentPassword
        updateData.newPassword = formData.newPassword
      }

      // Simular chamada de API
      await new Promise(resolve => setTimeout(resolve, 1000))

      toast.success('Perfil atualizado com sucesso!')
      setIsEditing(false)
      
      // Limpar campos de senha
      setFormData({
        ...formData,
        currentPassword: '',
        newPassword: '',
        confirmPassword: ''
      })

    } catch (error) {
      toast.error('Erro ao atualizar perfil')
      console.error('Error updating profile:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleCancel = () => {
    setIsEditing(false)
    // Restaurar dados originais
    setFormData({
      name: user.name || '',
      email: user.email || '',
      currentPassword: '',
      newPassword: '',
      confirmPassword: ''
    })
  }

  if (!user) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center">
          <p className="text-gray-600">Carregando perfil...</p>
        </div>
      </div>
    )
  }

  const canEdit = canEditUser(user.id)

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-2xl mx-auto">
        <div className="bg-white rounded-lg shadow-sm border">
          <div className="px-6 py-4 border-b border-gray-200">
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <User className="h-8 w-8 text-blue-600 mr-3" />
                <div>
                  <h1 className="text-2xl font-bold text-gray-900">Meu Perfil</h1>
                  <p className="text-gray-600">Gerencie suas informações pessoais</p>
                </div>
              </div>
              {canEdit && !isEditing && (
                <button
                  onClick={() => setIsEditing(true)}
                  className="btn btn-primary flex items-center"
                >
                  <Edit className="mr-2" size={16} />
                  Editar
                </button>
              )}
            </div>
          </div>

          <div className="p-6">
            {/* Informações do Usuário */}
            <div className="mb-6">
              <div className="flex items-center mb-4">
                <Shield className="h-5 w-5 text-gray-400 mr-2" />
                <span className="text-sm text-gray-600">Tipo de Usuário:</span>
                <span className="ml-2 px-2 py-1 text-xs font-semibold rounded-full bg-blue-100 text-blue-800">
                  {USER_ROLE_LABELS[user.role]}
                </span>
              </div>
            </div>

            <form onSubmit={handleSubmit}>
              <div className="space-y-6">
                {/* Nome */}
                <div className="form-group">
                  <label className="form-label">Nome Completo</label>
                  <div className="relative">
                    <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                    <input
                      type="text"
                      name="name"
                      className={`form-input pl-10 ${!isEditing ? 'bg-gray-50' : ''}`}
                      value={formData.name}
                      onChange={handleChange}
                      disabled={!isEditing}
                      required
                    />
                  </div>
                </div>

                {/* Email */}
                <div className="form-group">
                  <label className="form-label">Email</label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                    <input
                      type="email"
                      name="email"
                      className={`form-input pl-10 ${!isEditing ? 'bg-gray-50' : ''}`}
                      value={formData.email}
                      onChange={handleChange}
                      disabled={!isEditing}
                      required
                    />
                  </div>
                </div>

                {/* Alteração de Senha - apenas quando editando */}
                {isEditing && (
                  <>
                    <div className="border-t pt-6">
                      <h3 className="text-lg font-medium text-gray-900 mb-4">Alterar Senha</h3>
                      <p className="text-sm text-gray-600 mb-4">
                        Deixe em branco se não quiser alterar a senha
                      </p>
                    </div>

                    <div className="form-group">
                      <label className="form-label">Senha Atual</label>
                      <div className="relative">
                        <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                        <input
                          type="password"
                          name="currentPassword"
                          className="form-input pl-10"
                          value={formData.currentPassword}
                          onChange={handleChange}
                          placeholder="Digite sua senha atual"
                        />
                      </div>
                    </div>

                    <div className="form-group">
                      <label className="form-label">Nova Senha</label>
                      <div className="relative">
                        <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                        <input
                          type="password"
                          name="newPassword"
                          className="form-input pl-10"
                          value={formData.newPassword}
                          onChange={handleChange}
                          placeholder="Digite a nova senha"
                        />
                      </div>
                    </div>

                    <div className="form-group">
                      <label className="form-label">Confirmar Nova Senha</label>
                      <div className="relative">
                        <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                        <input
                          type="password"
                          name="confirmPassword"
                          className="form-input pl-10"
                          value={formData.confirmPassword}
                          onChange={handleChange}
                          placeholder="Confirme a nova senha"
                        />
                      </div>
                    </div>
                  </>
                )}

                {/* Botões de Ação */}
                {isEditing && canEdit && (
                  <div className="flex justify-end space-x-3 pt-6 border-t">
                    <button
                      type="button"
                      onClick={handleCancel}
                      className="btn btn-secondary"
                      disabled={loading}
                    >
                      Cancelar
                    </button>
                    <button
                      type="submit"
                      className="btn btn-primary flex items-center"
                      disabled={loading}
                    >
                      {loading ? (
                        <>
                          <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                          Salvando...
                        </>
                      ) : (
                        <>
                          <Save className="mr-2" size={16} />
                          Salvar Alterações
                        </>
                      )}
                    </button>
                  </div>
                )}

                {/* Mensagem para usuários sem permissão de edição */}
                {!canEdit && (
                  <div className="bg-yellow-50 border border-yellow-200 rounded-md p-4">
                    <div className="flex">
                      <Shield className="h-5 w-5 text-yellow-400 mr-2" />
                      <div className="text-sm text-yellow-700">
                        <p className="font-medium">Permissões Limitadas</p>
                        <p>Você só pode visualizar suas informações. Para editar, entre em contato com um administrador.</p>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </form>
          </div>
        </div>

        {/* Informações Adicionais */}
        <div className="mt-6 bg-white rounded-lg shadow-sm border p-6">
          <h3 className="text-lg font-medium text-gray-900 mb-4">Permissões da Conta</h3>
          <div className="space-y-2">
            {user.permissions && user.permissions.length > 0 ? (
              user.permissions.map((permission, index) => (
                <div key={index} className="flex items-center text-sm text-gray-600">
                  <div className="w-2 h-2 bg-green-400 rounded-full mr-3"></div>
                  {permission}
                </div>
              ))
            ) : (
              <p className="text-sm text-gray-500">Nenhuma permissão específica definida</p>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default UserProfile