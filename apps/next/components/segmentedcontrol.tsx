// components/SegmentedControl.js
import React, { useState } from 'react'

const SegmentedControl = ({ segments, onChange }) => {
  const [selectedSegment, setSelectedSegment] = useState(0)

  const handleSegmentPress = (index) => {
    setSelectedSegment(index)
    onChange(index)
  }

  return (
    <div className="flex rounded overflow-hidden border border-gray-300">
      {segments.map((segment, index) => (
        <button
          key={index}
          onClick={() => handleSegmentPress(index)}
          className={`flex-1 py-2 px-4 text-center ${
            index === selectedSegment ? 'bg-blue-500 text-white' : 'bg-white text-blue-500'
          }`}
        >
          {segment}
        </button>
      ))}
    </div>
  )
}

export default SegmentedControl
