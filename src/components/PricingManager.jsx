import { useState, useEffect } from 'react'
import './PricingManager.css'

function PricingManager() {
  const [plans, setPlans] = useState([
    { id: 'basic', name: 'Basic', price: 8.99, features: ['SD Quality', '1 Device', 'Limited Content'] },
    { id: 'standard', name: 'Standard', price: 12.99, features: ['HD Quality', '2 Devices', 'Full Content'] },
    { id: 'premium', name: 'Premium', price: 15.99, features: ['4K Quality', '4 Devices', 'Full Content', 'Downloads'] }
  ])
  
  const [discounts, setDiscounts] = useState([])
  const [editingPlan, setEditingPlan] = useState(null)
  const [showDiscountForm, setShowDiscountForm] = useState(false)
  const [discountForm, setDiscountForm] = useState({
    code: '',
    percentage: 10,
    validUntil: '',
    maxUses: 100,
    applicablePlans: []
  })

  useEffect(() => {
    loadPricing()
    loadDiscounts()
  }, [])

  const loadPricing = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/admin/pricing')
      if (response.ok) {
        const data = await response.json()
        if (data.plans) setPlans(data.plans)
      }
    } catch (error) {
      console.log('Using default pricing')
    }
  }

  const loadDiscounts = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/admin/discounts')
      if (response.ok) {
        const data = await response.json()
        setDiscounts(data.discounts || [])
      }
    } catch (error) {
      console.log('No discounts loaded')
    }
  }

  const handleUpdatePrice = async (planId, newPrice) => {
    const updatedPlans = plans.map(plan => 
      plan.id === planId ? { ...plan, price: parseFloat(newPrice) } : plan
    )
    setPlans(updatedPlans)
    
    try {
      await fetch('http://localhost:5000/api/admin/pricing', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ plans: updatedPlans })
      })
      alert('Price updated successfully!')
    } catch (error) {
      alert('Failed to update price')
    }
    
    setEditingPlan(null)
  }

  const handleCreateDiscount = async (e) => {
    e.preventDefault()
    
    const newDiscount = {
      ...discountForm,
      id: Date.now().toString(),
      createdAt: new Date().toISOString(),
      usedCount: 0
    }
    
    setDiscounts([...discounts, newDiscount])
    
    try {
      await fetch('http://localhost:5000/api/admin/discounts', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newDiscount)
      })
      alert('Discount code created!')
    } catch (error) {
      alert('Failed to create discount')
    }
    
    setShowDiscountForm(false)
    setDiscountForm({
      code: '',
      percentage: 10,
      validUntil: '',
      maxUses: 100,
      applicablePlans: []
    })
  }

  const handleDeleteDiscount = async (discountId) => {
    if (!confirm('Delete this discount code?')) return
    
    setDiscounts(discounts.filter(d => d.id !== discountId))
    
    try {
      await fetch(`http://localhost:5000/api/admin/discounts/${discountId}`, {
        method: 'DELETE'
      })
    } catch (error) {
      console.error('Failed to delete discount')
    }
  }

  return (
    <div className="pricing-manager">
      <div className="section">
        <h2>💰 Subscription Plans</h2>
        <div className="plans-grid">
          {plans.map(plan => (
            <div key={plan.id} className="plan-card">
              <h3>{plan.name}</h3>
              <div className="price-section">
                {editingPlan === plan.id ? (
                  <div className="price-edit">
                    <input
                      type="number"
                      step="0.01"
                      defaultValue={plan.price}
                      onBlur={(e) => handleUpdatePrice(plan.id, e.target.value)}
                      autoFocus
                    />
                    <button onClick={() => setEditingPlan(null)}>Cancel</button>
                  </div>
                ) : (
                  <div className="price-display">
                    <span className="price">${plan.price}</span>
                    <span className="period">/month</span>
                    <button 
                      className="btn-edit"
                      onClick={() => setEditingPlan(plan.id)}
                    >
                      Edit Price
                    </button>
                  </div>
                )}
              </div>
              <ul className="features">
                {plan.features.map((feature, idx) => (
                  <li key={idx}>✓ {feature}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      <div className="section">
        <div className="section-header">
          <h2>🎟️ Discount Codes</h2>
          <button 
            className="btn-primary"
            onClick={() => setShowDiscountForm(!showDiscountForm)}
          >
            {showDiscountForm ? 'Cancel' : '+ Create Discount'}
          </button>
        </div>

        {showDiscountForm && (
          <form className="discount-form" onSubmit={handleCreateDiscount}>
            <div className="form-row">
              <div className="form-group">
                <label>Discount Code</label>
                <input
                  type="text"
                  value={discountForm.code}
                  onChange={(e) => setDiscountForm({...discountForm, code: e.target.value.toUpperCase()})}
                  placeholder="SUMMER2024"
                  required
                />
              </div>
              <div className="form-group">
                <label>Discount %</label>
                <input
                  type="number"
                  min="1"
                  max="100"
                  value={discountForm.percentage}
                  onChange={(e) => setDiscountForm({...discountForm, percentage: parseInt(e.target.value)})}
                  required
                />
              </div>
            </div>

            <div className="form-row">
              <div className="form-group">
                <label>Valid Until</label>
                <input
                  type="date"
                  value={discountForm.validUntil}
                  onChange={(e) => setDiscountForm({...discountForm, validUntil: e.target.value})}
                  required
                />
              </div>
              <div className="form-group">
                <label>Max Uses</label>
                <input
                  type="number"
                  min="1"
                  value={discountForm.maxUses}
                  onChange={(e) => setDiscountForm({...discountForm, maxUses: parseInt(e.target.value)})}
                  required
                />
              </div>
            </div>

            <div className="form-group">
              <label>Applicable Plans</label>
              <div className="checkbox-group">
                {plans.map(plan => (
                  <label key={plan.id}>
                    <input
                      type="checkbox"
                      checked={discountForm.applicablePlans.includes(plan.id)}
                      onChange={(e) => {
                        const plans = e.target.checked
                          ? [...discountForm.applicablePlans, plan.id]
                          : discountForm.applicablePlans.filter(p => p !== plan.id)
                        setDiscountForm({...discountForm, applicablePlans: plans})
                      }}
                    />
                    {plan.name}
                  </label>
                ))}
              </div>
            </div>

            <button type="submit" className="btn-primary">Create Discount Code</button>
          </form>
        )}

        <div className="discounts-list">
          {discounts.length === 0 ? (
            <p className="empty-state">No discount codes yet. Create one above!</p>
          ) : (
            discounts.map(discount => (
              <div key={discount.id} className="discount-card">
                <div className="discount-info">
                  <h3>{discount.code}</h3>
                  <span className="discount-badge">{discount.percentage}% OFF</span>
                </div>
                <div className="discount-details">
                  <p>Valid until: {new Date(discount.validUntil).toLocaleDateString()}</p>
                  <p>Uses: {discount.usedCount || 0} / {discount.maxUses}</p>
                  <p>Plans: {discount.applicablePlans.join(', ') || 'All'}</p>
                </div>
                <button 
                  className="btn-delete"
                  onClick={() => handleDeleteDiscount(discount.id)}
                >
                  Delete
                </button>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  )
}

export default PricingManager
