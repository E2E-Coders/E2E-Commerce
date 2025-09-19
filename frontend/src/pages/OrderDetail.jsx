import { useParams, useNavigate } from 'react-router-dom'
import { useQuery } from 'react-query'
import { api } from '../services/api'
import { ArrowLeft, Package, MapPin, Calendar, CreditCard } from 'lucide-react'

function OrderDetail() {
  const { id } = useParams()
  const navigate = useNavigate()

  const { data: order, isLoading, error } = useQuery(
    ['order', id],
    async () => {
      const response = await api.get(`/orders/${id}`)
      return response.data.data
    }
  )

  const formatPrice = (priceCents) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    }).format(priceCents / 100)
  }

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('pt-BR', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    })
  }

  const getStatusColor = (status) => {
    switch (status) {
      case 'PENDING':
        return 'text-yellow-600 bg-yellow-100'
      case 'PROCESSING':
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

  const getStatusText = (status) => {
    switch (status) {
      case 'PENDING':
        return 'Pendente'
      case 'PROCESSING':
        return 'Processando'
      case 'SHIPPED':
        return 'Enviado'
      case 'DELIVERED':
        return 'Entregue'
      case 'CANCELLED':
        return 'Cancelado'
      default:
        return status
    }
  }

  if (isLoading) {
    return (
      <div className="container">
        <div className="loading">Carregando detalhes do pedido...</div>
      </div>
    )
  }

  if (error || !order) {
    return (
      <div className="container">
        <div className="error-message">Erro ao carregar detalhes do pedido.</div>
      </div>
    )
  }

  return (
    <div className="container mx-auto p-4">
      <button
        onClick={() => navigate(-1)}
        className="btn btn-outline mb-4"
      >
        <ArrowLeft size={16} />
        Voltar aos Pedidos
      </button>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <div className="card">
            <div className="card-header">
              <h1 className="text-2xl font-bold">Pedido #{order.id}</h1>
              <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(order.status)}`}>
                {getStatusText(order.status)}
              </span>
            </div>
            <div className="card-body">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h3 className="font-semibold mb-2 flex items-center">
                    <Calendar size={16} className="mr-2" />
                    Data do Pedido
                  </h3>
                  <p>{formatDate(order.createdAt)}</p>
                </div>
                <div>
                  <h3 className="font-semibold mb-2 flex items-center">
                    <MapPin size={16} className="mr-2" />
                    Endereço de Entrega
                  </h3>
                  <p>{order.shippingAddress || 'Endereço não informado'}</p>
                </div>
              </div>
            </div>
          </div>

          <div className="card mt-6">
            <div className="card-header">
              <h2 className="text-xl font-semibold flex items-center">
                <Package size={20} className="mr-2" />
                Itens do Pedido
              </h2>
            </div>
            <div className="card-body">
              {order.items && order.items.length > 0 ? (
                <div className="space-y-4">
                  {order.items.map((item) => (
                    <div key={item.id} className="flex items-center border-b pb-4 last:border-b-0">
                      <div className="flex-shrink-0">
                        <img
                          src={item.product?.imageUrl || "/placeholder-product.jpg"}
                          alt={item.product?.title || 'Produto'}
                          className="w-20 h-20 object-cover rounded-md"
                          onError={(e) => { e.target.src = "/placeholder-product.jpg"; }}
                        />
                      </div>
                      <div className="ml-4 flex-grow">
                        <h4 className="font-semibold">{item.product?.title || 'Produto não encontrado'}</h4>
                        <p className="text-gray-600 text-sm">Quantidade: {item.quantity}</p>
                        <p className="text-gray-600 text-sm">Preço unitário: {formatPrice(item.unitPriceCents)}</p>
                      </div>
                      <div className="text-right">
                        <p className="font-semibold">{formatPrice(item.totalPriceCents)}</p>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-gray-600">Nenhum item encontrado neste pedido.</p>
              )}
            </div>
          </div>
        </div>

        <div className="lg:col-span-1">
          <div className="card">
            <div className="card-header">
              <h2 className="text-xl font-semibold flex items-center">
                <CreditCard size={20} className="mr-2" />
                Resumo do Pedido
              </h2>
            </div>
            <div className="card-body">
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span>Subtotal:</span>
                  <span>{formatPrice(order.totalCents)}</span>
                </div>
                <div className="flex justify-between text-green-600">
                  <span>Desconto:</span>
                  <span>- {formatPrice(0)}</span>
                </div>
                <div className="flex justify-between text-blue-600">
                  <span>Frete:</span>
                  <span>{formatPrice(0)}</span>
                </div>
                <div className="border-t pt-3">
                  <div className="flex justify-between font-bold text-lg">
                    <span>Total:</span>
                    <span>{formatPrice(order.totalCents)}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="card mt-6">
            <div className="card-header">
              <h3 className="text-lg font-semibold">Informações Adicionais</h3>
            </div>
            <div className="card-body">
              <div className="space-y-2">
                <div>
                  <span className="font-medium">ID do Pedido:</span>
                  <span className="ml-2 text-gray-600">#{order.id}</span>
                </div>
                <div>
                  <span className="font-medium">Status:</span>
                  <span className={`ml-2 px-2 py-1 rounded text-sm ${getStatusColor(order.status)}`}>
                    {getStatusText(order.status)}
                  </span>
                </div>
                <div>
                  <span className="font-medium">Data de Criação:</span>
                  <span className="ml-2 text-gray-600">{formatDate(order.createdAt)}</span>
                </div>
                {order.updatedAt && (
                  <div>
                    <span className="font-medium">Última Atualização:</span>
                    <span className="ml-2 text-gray-600">{formatDate(order.updatedAt)}</span>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default OrderDetail
