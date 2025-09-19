import { useQuery } from 'react-query'
import { useNavigate } from 'react-router-dom'
import { api } from '../services/api'
import { Package, Eye } from 'lucide-react'

function Orders() {
  const navigate = useNavigate()

  // Fetch user orders
  const { data: ordersData, isLoading, error } = useQuery(
    'orders',
    async () => {
      const response = await api.get('/orders')
      return response.data.data
    }
  )

  const formatPrice = (priceCents) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    }).format(priceCents / 100)
  }

  const getStatusColor = (status) => {
    switch (status) {
      case 'PENDING':
        return 'text-yellow-600 bg-yellow-100'
      case 'CONFIRMED':
        return 'text-blue-600 bg-blue-100'
      case 'SHIPPED':
        return 'text-purple-600 bg-purple-100'
      case 'DELIVERED':
        return 'text-green-600 bg-green-100'
      case 'CANCELLED':
        return 'text-red-600 bg-red-100'
      default:
        return 'text-gray-600 bg-gray-100'
    }
  }

  if (isLoading) {
    return (
      <div className="container">
        <div className="loading">Loading orders...</div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="container">
        <div className="empty-state">
          <h3>Error loading orders</h3>
          <p>{error.response?.data?.error || 'Something went wrong'}</p>
        </div>
      </div>
    )
  }

  if (!ordersData?.content || ordersData.content.length === 0) {
    return (
      <div className="container">
        <h1 className="text-3xl font-bold mb-6">Meus Pedidos</h1>
        <div className="empty-state">
          <Package size={64} className="mx-auto mb-4 text-gray-400" />
          <h3>Nenhum pedido ainda</h3>
          <p>Comece a comprar para ver seus pedidos aqui!</p>
          <button
            onClick={() => navigate('/')}
            className="btn btn-primary mt-4"
          >
            Começar a Comprar
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="container">
      <h1 className="text-3xl font-bold mb-6">Meus Pedidos</h1>

      <div className="space-y-6">
        {ordersData.content.map(order => (
          <div key={order.id} className="card">
            <div className="card-header">
              <div className="flex justify-between items-center">
                <div>
                  <h3 className="text-lg font-semibold">Order #{order.id}</h3>
                  <p className="text-sm text-gray-600">
                    Placed on {new Date(order.createdAt).toLocaleDateString()}
                  </p>
                </div>
                <div className="flex items-center gap-4">
                  <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(order.status)}`}>
                    {order.status}
                  </span>
                  <span className="text-lg font-bold">
                    {formatPrice(order.totalCents)}
                  </span>
                </div>
              </div>
            </div>

            <div className="card-body">
              {order.items && order.items.length > 0 && (
                <div className="mb-4">
                  <h4 className="font-semibold mb-2">Items:</h4>
                  <div className="space-y-2">
                    {order.items.map(item => (
                      <div key={item.id} className="flex justify-between items-center">
                        <div>
                          <span className="font-medium">{item.product.title}</span>
                          <span className="text-gray-600"> x{item.quantity}</span>
                        </div>
                        <span>{formatPrice(item.priceCents)}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {order.shippingAddress && (
                <div className="mb-4">
                  <h4 className="font-semibold mb-2">Shipping Address:</h4>
                  <p className="text-gray-700">{order.shippingAddress}</p>
                </div>
              )}

              <div className="flex justify-between items-center">
                <div className="text-sm text-gray-600">
                  {order.items?.length || 0} item(s)
                </div>
                <button
                  onClick={() => navigate(`/orders/${order.id}`)}
                  className="btn btn-outline btn-sm"
                >
                  <Eye size={16} />
                  View Details
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {ordersData.totalPages > 1 && (
        <div className="text-center text-gray-600 mt-6">
          Showing {ordersData.content.length} of {ordersData.totalElements} orders
        </div>
      )}
    </div>
  )
}

export default Orders
