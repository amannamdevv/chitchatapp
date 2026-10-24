import React from 'react'

const GenderCheckbox = ({onCheckboxChange, selectedGender}) => {
  return (
    <div className='flex mobile:flex-col mobile:gap-2 gap-3'>
        <div className='form-control mobile:flex-1'>
            <label className={`label gap-2 cursor-pointer mobile:px-2 mobile:py-2 px-3 py-2 rounded-lg glass-dark hover:bg-white/5 transition-all touch-manipulation ${selectedGender === "male" ? "ring-2 ring-cyan-400" : ""}`}>
                <span className='label-text text-white font-medium text-responsive-xs'>Male</span>
                <input type='checkbox' className='checkbox checkbox-info border-white/30 mobile:w-4 mobile:h-4 w-4 h-4' 
                    checked={selectedGender === 'male'}
                    onChange={() => onCheckboxChange("male")}
                />
            </label>
        </div>

        <div className='form-control mobile:flex-1'>
            <label className={`label gap-2 cursor-pointer mobile:px-2 mobile:py-2 px-3 py-2 rounded-lg glass-dark hover:bg-white/5 transition-all touch-manipulation ${selectedGender === "female" ? "ring-2 ring-cyan-400" : ""}`}>
                <span className='label-text text-white font-medium text-responsive-xs'>Female</span>
                <input type='checkbox' className='checkbox checkbox-info border-white/30 mobile:w-4 mobile:h-4 w-4 h-4' 
                    checked={selectedGender === 'female'}
                    onChange={() => onCheckboxChange("female")}
                />
            </label>
        </div>
    </div>
  )
}

export default GenderCheckbox