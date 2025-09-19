import { useQuery, useMutation, useQueryClient } from 'react-query'
import { useNavigate } from 'react-router-dom'
import { api } from '../services/api'
import { Plus, Minus, Trash2, ShoppingBag } from 'lucide-react'
import toast from 'react-hot-toast'

function Cart() {
  const navigate = useNavigate()
  const queryClient = useQueryClient()

  // Fetch cart items
  const { data: cartItems, isLoading, error } = useQuery(
    'cart',
    async () => {
      const response = await api.get('/cart')
      return response.data.data
    }
  )

  // Remove item mutation
  const removeItemMutation = useMutation(
    async (productId) => {
      const response = await api.delete(`/cart/${productId}`)
      return response.data
    },
    {
      onSuccess: () => {
        toast.success('Item removed from cart')
        queryClient.invalidateQueries('cart')
      },
      onError: (error) => {
        toast.error(error.response?.data?.error || 'Failed to remove item')
      }
    }
  )

  // Clear cart mutation
  const clearCartMutation = useMutation(
    async () => {
      const response = await api.delete('/cart')
      return response.data
    },
    {
      onSuccess: () => {
        toast.success('Cart cleared')
        queryClient.invalidateQueries('cart')
      },
      onError: (error) => {
        toast.error(error.response?.data?.error || 'Failed to clear cart')
      }
    }
  )

  const formatPrice = (priceCents) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    }).format(priceCents / 100)
  }

  const calculateSubtotal = () => {
    if (!cartItems) return 0
    return cartItems.reduce((total, item) => total + item.totalPriceCents, 0)
  }

  const handleRemoveItem = (productId) => {
    removeItemMutation.mutate(productId)
  }

  const handleClearCart = () => {
    if (window.confirm('Are you sure you want to clear your cart?')) {
      clearCartMutation.mutate()
    }
  }

  const handleCheckout = () => {
    navigate('/checkout')
  }

  if (isLoading) {
    return (
      <div className="container">
        <div className="loading">Loading cart...</div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="container">
        <div className="empty-state">
          <h3>Error loading cart</h3>
          <p>{error.response?.data?.error || 'Something went wrong'}</p>
        </div>
      </div>
    )
  }

  if (!cartItems || cartItems.length === 0) {
    return (
      <div className="container">
        <h1 className="text-3xl font-bold mb-6">Carrinho de Compras</h1>
        <div className="empty-state">
          <ShoppingBag size={64} className="mx-auto mb-4 text-gray-400" />
          <h3>Seu carrinho está vazio</h3>
          <p>Adicione alguns produtos para começar!</p>
          <button
            onClick={() => navigate('/')}
            className="btn btn-primary mt-4"
          >
            Continuar Comprando
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="container">
      <h1 className="text-3xl font-bold mb-6">Carrinho de Compras</h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <div className="card">
            <div className="card-header">
              <div className="flex justify-between items-center">
                <h2 className="text-xl font-semibold">Cart Items</h2>
                <button
                  onClick={handleClearCart}
                  className="btn btn-sm btn-danger"
                  disabled={clearCartMutation.isLoading}
                >
                  Clear Cart
                </button>
              </div>
            </div>

            <div className="card-body p-0">
              {cartItems.map(item => (
                <div key={item.id} className="cart-item">
                  <div className="product-image" style={{ width: '80px', height: '80px' }}>
                    📦
                  </div>
                  <div className="cart-item-info">
                    <h3 className="cart-item-title">{item.product?.title || 'Produto não encontrado'}</h3>
                    <p className="cart-item-price">{formatPrice(item.product?.priceCents || 0)}</p>
                    <div className="text-sm text-gray-500">
                      Estoque: {item.product?.stock || 0}
                    </div>
                  </div>
                  <div className="cart-item-actions">
                    <div className="quantity-controls">
                      <span className="text-sm">Qty: {item.quantity}</span>
                    </div>
                    <div className="text-right">
                      <div className="font-semibold">
                        {formatPrice(item.totalPriceCents)}
                      </div>
                      <button
                        onClick={() => handleRemoveItem(item.product?.id)}
                        className="btn btn-sm btn-danger mt-2"
                        disabled={removeItemMutation.isLoading}
                      >
                        <Trash2 size={16} />
                        Remove
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div>
          <div className="cart-total">
            <h3 className="text-xl font-semibold mb-4">Order Summary</h3>
            
            <div className="total-row">
              <span>Subtotal:</span>
              <span>{formatPrice(calculateSubtotal())}</span>
            </div>
            
            <div className="total-row">
              <span>Shipping:</span>
              <span>Calculated at checkout</span>
            </div>
            
            <div className="total-row">
              <span>Tax:</span>
              <span>Calculated at checkout</span>
            </div>
            
            <div className="total-row final">
              <span>Estimated Total:</span>
              <span>{formatPrice(calculateSubtotal())}</span>
            </div>

            <button
              onClick={handleCheckout}
              className="btn btn-primary w-full mt-4"
            >
              Proceed to Checkout
            </button>

            <button
              onClick={() => navigate('/')}
              className="btn btn-outline w-full mt-2"
            >
              Continuar Comprando
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Cart
