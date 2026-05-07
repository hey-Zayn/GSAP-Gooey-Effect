import { forwardRef } from 'react'

const Cursor = forwardRef((props, ref) => {
  return (
    <div 
      ref={ref}
      className="fixed top-0 left-0 pointer-events-none z-[100] -translate-x-1/2 -translate-y-1/2 will-change-transform flex items-center justify-center"
    >
      {/* Minimal Aesthetic Cursor */}
      <div className="relative flex items-center justify-center">
        {/* Central Core Dot */}
        <div className="w-1.5 h-1.5 bg-white rounded-full shadow-[0_0_10px_white]" />
        
        {/* Outer Ring - Aesthetic & Professional */}
        <div className="absolute w-10 h-10 border border-white/30 rounded-full flex items-center justify-center">
          <div className="w-[calc(100%+2px)] h-[calc(100%+2px)] border border-white/5 rounded-full animate-pulse" />
        </div>

        {/* Decorative Compass Lines (Very Subtle) */}
        <div className="absolute w-12 h-[1px] bg-gradient-to-r from-transparent via-white/20 to-transparent" />
        <div className="absolute h-12 w-[1px] bg-gradient-to-b from-transparent via-white/20 to-transparent" />
      </div>
    </div>
  )
})

Cursor.displayName = 'Cursor'

export default Cursor
