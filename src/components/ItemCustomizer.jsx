import { useState } from 'react'
import './ItemCustomizer.css'

function ItemCustomizer({ items, onSave, onCancel }) {
  const [editedItems, setEditedItems] = useState([...items])

  const handleItemChange = (index, value) => {
    const newItems = [...editedItems]
    newItems[index] = value
    setEditedItems(newItems)
  }

  const handleAddItem = () => {
    setEditedItems([...editedItems, 'New Item'])
  }

  const handleRemoveItem = (index) => {
    if (editedItems.length > 24) {
      const newItems = editedItems.filter((_, i) => i !== index)
      setEditedItems(newItems)
    }
  }

  const handleSave = () => {
    // Filter out empty items and ensure we have at least 24 items
    const validItems = editedItems.filter(item => item.trim() !== '')
    if (validItems.length >= 24) {
      onSave(validItems)
    } else {
      alert('You need at least 24 items for the bingo card!')
    }
  }

  const handleReset = () => {
    setEditedItems([...items])
  }

  return (
    <div className="item-customizer">
      <div className="customizer-header">
        <h2>Customize Bingo Items</h2>
        <p>Edit the items that will appear on your bingo card (minimum 24 items)</p>
      </div>

      <div className="items-grid">
        {editedItems.map((item, index) => (
          <div key={index} className="item-input-group">
            <input
              type="text"
              value={item}
              onChange={(e) => handleItemChange(index, e.target.value)}
              className="item-input"
              placeholder={`Item ${index + 1}`}
            />
            {editedItems.length > 24 && (
              <button
                onClick={() => handleRemoveItem(index)}
                className="remove-btn"
                title="Remove item"
              >
                ×
              </button>
            )}
          </div>
        ))}
      </div>

      <div className="customizer-actions">
        <button onClick={handleAddItem} className="btn btn-add">
          + Add Item
        </button>
        <button onClick={handleReset} className="btn btn-secondary">
          Reset to Original
        </button>
        <div className="button-group">
          <button onClick={onCancel} className="btn btn-cancel">
            Cancel
          </button>
          <button onClick={handleSave} className="btn btn-primary">
            Save & Start Game
          </button>
        </div>
      </div>
    </div>
  )
}

export default ItemCustomizer
