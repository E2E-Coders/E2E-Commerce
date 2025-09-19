import { useState } from 'react'
import { useQuery, useMutation, useQueryClient } from 'react-query'
import { useNavigate } from 'react-router-dom'
import { api } from '../services/api'
import { CreditCard, MapPin, Tag } from 'lucide-react'
import toast from 'react-hot-toast'

function Checkout() {
  const navigate = useNavigate()
  const queryClient = useQueryClient()
  const [step, setStep] = useState(1)
  const [shippingAddress, setShippingAddress] = useState('')
  const [zipCode, setZipCode] = useState('')
  const [couponCode, setCouponCode] = useState('')
  const [quote, setQuote] = useState(null)

  // Fetch cart items
  const { data: cartItems } = useQuery(
    'cart',
    async () => {
      const response = await api.get('/cart')
      return response.data.data
    }
  )

  // Get quote mutation
  const getQuoteMutation = useMutation(
    async (quoteData) => {
      const response = await api.post('/checkout/quote', quoteData)
      return response.data.data
    },
    {
      onSuccess: (data) => {
        setQuote(data)
        setStep(2)
      },
      onError: (error) => {
        toast.error(error.response?.data?.error || 'Failed to get quote')
      }
    }
  )

  // Confirm order mutation
  const confirmOrderMutation = useMutation(
    async (orderData) => {
      const response = await api.post('/checkout/confirm', orderData)
      return response.data.data
    },
    {
      onSuccess: () => {
        toast.success('Order placed successfully!')
        queryClient.invalidateQueries(['cart', 'orders'])
        navigate('/orders')
      },
      onError: (error) => {
        toast.error(error.response?.data?.error || 'Failed to place order')
      }
    }
  )

  const handleGetQuote = (e) => {
    e.preventDefault()
    getQuoteMutation.mutate({
      zipCode: zipCode,
      couponCode: couponCode
    })
  }

  const handleConfirmOrder = (e) => {
    e.preventDefault()
    confirmOrderMutation.mutate({
      shippingAddress: shippingAddress,
      zipCode: zipCode,
      couponCode: couponCode
    })
  }

  const formatPrice = (price) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    }).format(price)
  }

  const calculateSubtotal = () => {
    if (!cartItems) return 0
    return cartItems.reduce((total, item) => total + item.totalPriceCents, 0) / 100
  }

  if (!cartItems || cartItems.length === 0) {
    return (
      <div className="container">
        <div className="empty-state">
          <h3>Your cart is empty</h3>
          <p>Add some products before checking out.</p>
          <button
            onClick={() => navigate('/')}
            className="btn btn-primary mt-4"
          >
            Continue Shopping
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="container">
      <h1 className="text-3xl font-bold mb-6">Finalizar Compra</h1>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div>
          {/* Step 1: Shipping Information */}
          {step === 1 && (
            <div className="card">
              <div className="card-header">
                <h2 className="text-xl font-semibold flex items-center gap-2">
                  <MapPin size={20} />
                  Shipping Information
                </h2>
              </div>
              <div className="card-body">
                <form onSubmit={handleGetQuote}>
                  <div className="form-group">
                    <label className="form-label">Shipping Address</label>
                    <textarea
                      className="form-input form-textarea"
                      value={shippingAddress}
                      onChange={(e) => setShippingAddress(e.target.value)}
                      placeholder="Enter your full shipping address"
                      required
                    />
                  </div>

                  <div className="form-group">
                    <label className="form-label">ZIP Code</label>
                    <input
                      type="text"
                      className="form-input"
                      value={zipCode}
                      onChange={(e) => setZipCode(e.target.value)}
                      placeholder="12345"
                      required
                    />
                  </div>

                  <div className="form-group">
                    <label className="form-label flex items-center gap-2">
                      <Tag size={16} />
                      Coupon Code (Optional)
                    </label>
                    <input
                      type="text"
                      className="form-input"
                      value={couponCode}
                      onChange={(e) => setCouponCode(e.target.value)}
                      placeholder="SAVE10, SAVE20, FREE"
                    />
                    <p className="text-sm text-gray-600 mt-1">
                      Valid coupons: SAVE10 (10% off), SAVE20 (20% off), FREE ($5 off)
                    </p>
                  </div>

                  <button
                    type="submit"
                    disabled={getQuoteMutation.isLoading}
                    className="btn btn-primary w-full"
                  >
                    {getQuoteMutation.isLoading ? 'Calculating...' : 'Get Quote'}
                  </button>
                </form>
              </div>
            </div>
          )}

          {/* Step 2: Review & Confirm */}
          {step === 2 && quote && (
            <div className="card">
              <div className="card-header">
                <h2 className="text-xl font-semibold flex items-center gap-2">
                  <CreditCard size={20} />
                  Review & Confirm Order
                </h2>
              </div>
              <div className="card-body">
                <div className="mb-6">
                  <h3 className="font-semibold mb-2">Shipping Address</h3>
                  <p className="text-gray-700">{shippingAddress}</p>
                  <p className="text-gray-700">ZIP: {zipCode}</p>
                </div>

                <div className="mb-6">
                  <h3 className="font-semibold mb-2">Order Items</h3>
                  <div className="space-y-2">
                    {cartItems.map(item => (
                      <div key={item.id} className="flex justify-between">
                        <span>{item.product.title} x{item.quantity}</span>
                        <span>{formatPrice(item.totalPriceCents / 100)}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="mb-6">
                  <h3 className="font-semibold mb-2">Order Summary</h3>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span>Subtotal:</span>
                      <span>{formatPrice(quote.subtotal)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Shipping:</span>
                      <span>{formatPrice(quote.shipping)}</span>
                    </div>
                    {quote.discount > 0 && (
                      <div className="flex justify-between text-green-600">
                        <span>Discount ({couponCode}):</span>
                        <span>-{formatPrice(quote.discount)}</span>
                      </div>
                    )}
                    <div className="flex justify-between font-bold text-lg border-t pt-2">
                      <span>Total:</span>
                      <span>{formatPrice(quote.total)}</span>
                    </div>
                  </div>
                </div>

                <form onSubmit={handleConfirmOrder}>
                  <button
                    type="submit"
                    disabled={confirmOrderMutation.isLoading}
                    className="btn btn-primary w-full"
                  >
                    {confirmOrderMutation.isLoading ? 'Placing Order...' : 'Confirm Order'}
                  </button>
                </form>

                <button
                  onClick={() => setStep(1)}
                  className="btn btn-outline w-full mt-2"
                >
                  Back to Shipping
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Order Summary Sidebar */}
        <div>
          <div className="cart-total">
            <h3 className="text-xl font-semibold mb-4">Order Summary</h3>
            
            <div className="space-y-2">
              {cartItems.map(item => (
                <div key={item.id} className="flex justify-between text-sm">
                  <span>{item.product.title} x{item.quantity}</span>
                  <span>{formatPrice(item.totalPriceCents / 100)}</span>
                </div>
              ))}
            </div>

            <div className="border-t my-4 pt-4">
              <div className="total-row">
                <span>Subtotal:</span>
                <span>{formatPrice(calculateSubtotal())}</span>
              </div>
              
              {quote && (
                <>
                  <div className="total-row">
                    <span>Shipping:</span>
                    <span>{formatPrice(quote.shipping)}</span>
                  </div>
                  
                  {quote.discount > 0 && (
                    <div className="total-row text-green-600">
                      <span>Discount:</span>
                      <span>-{formatPrice(quote.discount)}</span>
                    </div>
                  )}
                  
                  <div className="total-row final">
                    <span>Total:</span>
                    <span>{formatPrice(quote.total)}</span>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Checkout
