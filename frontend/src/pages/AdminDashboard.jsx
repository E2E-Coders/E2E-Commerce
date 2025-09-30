import { useState, useEffect } from 'react'
import { useAuth } from '../contexts/AuthContext'
import { usePermissions } from '../hooks/usePermissions'
import { PERMISSIONS, USER_ROLE_LABELS, USER_ROLES } from '../constants/userRoles'
import { Users, Shield, Edit, Trash2, Search, Filter, UserPlus } from 'lucide-react'
import toast from 'react-hot-toast'

function AdminDashboard() {
  const { user } = useAuth()
  const { hasPermission } = usePermissions()
  const [users, setUsers] = useState([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState('')
  const [roleFilter, setRoleFilter] = useState('')
  const [editingUser, setEditingUser] = useState(null)
  const [showEditModal, setShowEditModal] = useState(false)

  // Verificar se o usuário tem permissão para acessar o dashboard
  if (!hasPermission(PERMISSIONS.ADMIN.MANAGE_USERS)) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center">
          <Shield className="mx-auto h-16 w-16 text-red-500 mb-4" />
          <h1 className="text-2xl font-bold text-gray-900 mb-2">Acesso Negado</h1>
          <p className="text-gray-600">Você não tem permissão para acessar esta página.</p>
        </div>
      </div>
    )
  }

  useEffect(() => {
    loadUsers()
  }, [])

  const loadUsers = async () => {
    try {
      setLoading(true)
      // Simulação de dados - em produção, fazer chamada para API
      const mockUsers = [
        {
          id: 1,
          name: 'João Silva',
          email: 'joao@email.com',
          role: USER_ROLES.CLIENTE,
          createdAt: '2024-01-15',
          status: 'active'
        },
        {
          id: 2,
          name: 'Maria Santos',
          email: 'maria@email.com',
          role: USER_ROLES.VENDEDOR,
          createdAt: '2024-01-10',
          status: 'active'
        },
        {
          id: 3,
          name: 'Admin User',
          email: 'admin@email.com',
          role: USER_ROLES.ADMIN,
          createdAt: '2024-01-01',
          status: 'active'
        }
      ]
      
      setUsers(mockUsers)
    } catch (error) {
      toast.error('Erro ao carregar usuários')
      console.error('Error loading users:', error)
    } finally {
      setLoading(false)
    }
  }

  const filteredUsers = users.filter(user => {
    const matchesSearch = user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         user.email.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesRole = !roleFilter || user.role === roleFilter
    return matchesSearch && matchesRole
  })

  const handleEditUser = (user) => {
    setEditingUser({ ...user })
    setShowEditModal(true)
  }

  const handleSaveUser = async () => {
    try {
      // Em produção, fazer chamada para API
      const updatedUsers = users.map(u => 
        u.id === editingUser.id ? editingUser : u
      )
      setUsers(updatedUsers)
      setShowEditModal(false)
      setEditingUser(null)
      toast.success('Usuário atualizado com sucesso!')
    } catch (error) {
      toast.error('Erro ao atualizar usuário')
    }
  }

  const handleDeleteUser = async (userId) => {
    if (!confirm('Tem certeza que deseja excluir este usuário?')) {
      return
    }

    try {
      // Em produção, fazer chamada para API
      const updatedUsers = users.filter(u => u.id !== userId)
      setUsers(updatedUsers)
      toast.success('Usuário excluído com sucesso!')
    } catch (error) {
      toast.error('Erro ao excluir usuário')
    }
  }

  const getRoleBadgeColor = (role) => {
    switch (role) {
      case USER_ROLES.ADMIN:
        return 'bg-red-100 text-red-800'
      case USER_ROLES.VENDEDOR:
        return 'bg-blue-100 text-blue-800'
      case USER_ROLES.CLIENTE:
        return 'bg-green-100 text-green-800'
      default:
        return 'bg-gray-100 text-gray-800'
    }
  }

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Carregando usuários...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 flex items-center">
              <Users className="mr-3" />
              Dashboard Administrativo
            </h1>
            <p className="text-gray-600 mt-2">Gerencie usuários e permissões do sistema</p>
          </div>
          <button className="btn btn-primary flex items-center">
            <UserPlus className="mr-2" size={20} />
            Novo Usuário
          </button>
        </div>

        {/* Filtros e Busca */}
        <div className="bg-white rounded-lg shadow-sm border p-6 mb-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
              <input
                type="text"
                placeholder="Buscar por nome ou email..."
                className="form-input pl-10"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <div className="relative">
              <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
              <select
                className="form-input pl-10 appearance-none bg-white"
                value={roleFilter}
                onChange={(e) => setRoleFilter(e.target.value)}
              >
                <option value="">Todos os tipos</option>
                {Object.entries(USER_ROLE_LABELS).map(([roleKey, roleLabel]) => (
                  <option key={roleKey} value={roleKey}>
                    {roleLabel}
                  </option>
                ))}
              </select>
            </div>
            <div className="text-sm text-gray-600 flex items-center">
              Total: {filteredUsers.length} usuários
            </div>
          </div>
        </div>

        {/* Tabela de Usuários */}
        <div className="bg-white rounded-lg shadow-sm border overflow-hidden">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Usuário
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Tipo
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Data de Cadastro
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Ações
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredUsers.map((user) => (
                  <tr key={user.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div>
                        <div className="text-sm font-medium text-gray-900">{user.name}</div>
                        <div className="text-sm text-gray-500">{user.email}</div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getRoleBadgeColor(user.role)}`}>
                        {USER_ROLE_LABELS[user.role]}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {new Date(user.createdAt).toLocaleDateString('pt-BR')}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="inline-flex px-2 py-1 text-xs font-semibold rounded-full bg-green-100 text-green-800">
                        Ativo
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <button
                        onClick={() => handleEditUser(user)}
                        className="text-blue-600 hover:text-blue-900 mr-3"
                        title="Editar usuário"
                      >
                        <Edit size={16} />
                      </button>
                      <button
                        onClick={() => handleDeleteUser(user.id)}
                        className="text-red-600 hover:text-red-900"
                        title="Excluir usuário"
                      >
                        <Trash2 size={16} />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Modal de Edição */}
      {showEditModal && editingUser && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-md">
            <h3 className="text-lg font-semibold mb-4">Editar Usuário</h3>
            
            <div className="space-y-4">
              <div>
                <label className="form-label">Nome</label>
                <input
                  type="text"
                  className="form-input"
                  value={editingUser.name}
                  onChange={(e) => setEditingUser({...editingUser, name: e.target.value})}
                />
              </div>
              
              <div>
                <label className="form-label">Email</label>
                <input
                  type="email"
                  className="form-input"
                  value={editingUser.email}
                  onChange={(e) => setEditingUser({...editingUser, email: e.target.value})}
                />
              </div>
              
              <div>
                <label className="form-label">Tipo de Usuário</label>
                <select
                  className="form-input"
                  value={editingUser.role}
                  onChange={(e) => setEditingUser({...editingUser, role: e.target.value})}
                >
                  {Object.entries(USER_ROLE_LABELS).map(([roleKey, roleLabel]) => (
                    <option key={roleKey} value={roleKey}>
                      {roleLabel}
                    </option>
                  ))}
                </select>
              </div>
            </div>
            
            <div className="flex justify-end space-x-3 mt-6">
              <button
                onClick={() => setShowEditModal(false)}
                className="btn btn-secondary"
              >
                Cancelar
              </button>
              <button
                onClick={handleSaveUser}
                className="btn btn-primary"
              >
                Salvar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default AdminDashboard