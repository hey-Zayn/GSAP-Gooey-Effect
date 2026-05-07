import { forwardRef } from 'react'

const Cursor = forwardRef((props, ref) => {
  return (
    <div 
      ref={ref}
      className="fixed top-0 left-0 pointer-events-none z-[100] -translate-x-1/2 -translate-y-1/2 will-change-transform"
      style={{ transformOrigin: 'center 20px' }} // Pivot point near the nose/center
    >
      {/* Premium Sleek Rocket SVG */}
      <svg 
        width="60" 
        height="80" 
        viewBox="0 0 64 80" 
        fill="none" 
        xmlns="http://www.w3.org/2000/svg"
        className="drop-shadow-[0_0_20px_rgba(255,77,0,0.4)]"
      >
        {/* Rocket Body - Sleek Minimalist Shape */}
        <path 
          d="M32 4C32 4 18 16 18 36V52L32 60L46 52V36C46 16 32 4 32 4Z" 
          fill="url(#rocketBody)" 
          stroke="white" 
          strokeWidth="1.5" 
        />

        {/* Fins */}
        <path d="M18 44L8 56V62L18 52V44Z" fill="#FF4D00" stroke="white" strokeWidth="1" />
        <path d="M46 44L56 56V62L46 52V44Z" fill="#FF4D00" stroke="white" strokeWidth="1" />
        <path d="M32 60L26 66H38L32 60Z" fill="#FF4D00" stroke="white" strokeWidth="1" />

        {/* Port Hole */}
        <circle cx="32" cy="28" r="5" fill="#1a1a1a" stroke="white" strokeWidth="1.5" />
        <circle cx="30" cy="26" r="1.5" fill="white" opacity="0.4" />

        {/* Engine Flame - Animated Glow */}
        <g transform="translate(32, 62)">
          {/* Outer Flame */}
          <path d="M-8 0C-8 0 -12 15 0 18C12 15 8 0 8 0H-8Z" fill="#FF4D00" opacity="0.6">
            <animate 
              attributeName="d" 
              values="M-8 0C-8 0 -12 15 0 18C12 15 8 0 8 0H-8Z; M-8 0C-8 0 -12 25 0 28C12 25 8 0 8 0H-8Z; M-8 0C-8 0 -12 15 0 18C12 15 8 0 8 0H-8Z" 
              dur="0.15s" 
              repeatCount="indefinite" 
            />
          </path>
          {/* Inner Flame */}
          <path d="M-4 0C-4 0 -6 10 0 12C6 10 4 0 4 0H-4Z" fill="white">
            <animate 
              attributeName="d" 
              values="M-4 0C-4 0 -6 10 0 12C6 10 4 0 4 0H-4Z; M-4 0C-4 0 -6 18 0 20C6 18 4 0 4 0H-4Z; M-4 0C-4 0 -6 10 0 12C6 10 4 0 4 0H-4Z" 
              dur="0.1s" 
              repeatCount="indefinite" 
            />
          </path>
        </g>

        <defs>
          <linearGradient id="rocketBody" x1="18" y1="4" x2="46" y2="60" gradientUnits="userSpaceOnUse">
            <stop stopColor="#F5F5F5" />
            <stop offset="0.5" stopColor="#E0E0E0" />
            <stop offset="1" stopColor="#BDBDBD" />
          </linearGradient>
        </defs>
      </svg>
    </div>
  )
})

Cursor.displayName = 'Cursor'

export default Cursor
