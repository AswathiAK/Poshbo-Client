import React from 'react'

const PerksItems = ({ selectedPerks, availablePerks, onPerkChange }) => {
  
  return (
    <div className="flex flex-wrap mt-2">
      {availablePerks.map((perk,index) => (
        <label key={index} className="mx-4 my-2 border p-4 flex rounded-2xl gap-3 items-center cursor-pointer">
          <input
            type="checkbox"
            checked={selectedPerks?.includes(perk.name)}
            name={perk.name}
            onChange={(e) => onPerkChange(perk.name, e.target.checked)}
          />
          <span>{perk.label}</span>
        </label>
      ))}
    </div>
  )
}

export default PerksItems
