import { useRef } from 'react'
import { gsap } from 'gsap'
import { useGSAP } from '@gsap/react'
import Cursor from './Cursor'

const GooeyCursorReveal = () => {
  const containerRef = useRef(null)
  const smudgeContainerRef = useRef(null)
  const cursorRef = useRef(null)

  const config = {
    smoothing: 0.15,
    movementThreshold: 1.5, // Lower threshold = denser, smoother trail
    sizeFromSpeed: 0.6,
    expandMultiplier: 2.8,
    expandTime: 2,
    expandEase: "power2.out",
    dissolveStart: 0.8,
    dissolveTime: 4, // Longer dissolve for smoother fade
    dissolveEase: "sine.inOut",
  }

  useGSAP(() => {
    const lastPointer = { x: 0, y: 0 }

    // Smoother cursor tracking
    const xCursor = gsap.quickTo(cursorRef.current, "x", { duration: 0.25, ease: "power3.out" });
    const yCursor = gsap.quickTo(cursorRef.current, "y", { duration: 0.25, ease: "power3.out" });

    const stampSmudgeAt = (x, y, radius) => {
      if (!smudgeContainerRef.current) return

      const circle = document.createElementNS("http://www.w3.org/2000/svg", "circle")
      circle.setAttribute("cx", x)
      circle.setAttribute("cy", y)
      circle.setAttribute("r", 0)
      circle.setAttribute("fill", "white")
      smudgeContainerRef.current.appendChild(circle)

      const animatedParams = { r: 0, opacity: 1 }

      const tl = gsap.timeline({
        onUpdate: () => {
          circle.setAttribute("r", animatedParams.r)
          circle.setAttribute("fill-opacity", animatedParams.opacity)
        },
        onComplete: () => {
          circle.remove()
        }
      })

      tl.to(animatedParams, {
        r: radius * config.expandMultiplier,
        duration: config.expandTime,
        ease: config.expandEase
      })

      tl.to(animatedParams, {
        r: 0,
        opacity: 0,
        duration: config.dissolveTime,
        ease: config.dissolveEase
      }, config.dissolveStart)
    }

    const handleMouseMove = (e) => {
      const rect = containerRef.current.getBoundingClientRect()
      const x = e.clientX - rect.left
      const y = e.clientY - rect.top

      xCursor(e.clientX)
      yCursor(e.clientY)

      const dist = Math.hypot(x - lastPointer.x, y - lastPointer.y)

      if (dist > config.movementThreshold) {
        // Calculate radius with a slight dampening for smoothness
        const radius = Math.min(dist * config.sizeFromSpeed, 90)
        stampSmudgeAt(x, y, radius)

        // Update last pointer with a bit of "lag" for smoother spacing
        lastPointer.x = x
        lastPointer.y = y
      }
    }

    window.addEventListener('mousemove', handleMouseMove)
    return () => window.removeEventListener('mousemove', handleMouseMove)
  }, { scope: containerRef })

  return (
    <div ref={containerRef} className='relative w-full h-full overflow-hidden bg-[#282A2A] text-white cursor-none select-none'>

      <div className='absolute inset-0 flex justify-start items-end p-12 opacity-20'>
        <h1 className='text-[25vw] font-black uppercase tracking-tighter leading-[0.75] text-[#f2f2f2]'>
          GSAP
        </h1>
      </div>

      <svg className="absolute inset-0 w-full h-full pointer-events-none">
        <defs>
          <filter id="sumdge-goo">
            {/* Increased blur for better liquid blending */}
            <feGaussianBlur in="SourceGraphic" stdDeviation="35" result="blur" />
            <feColorMatrix
              in="blur"
              type="matrix"
              values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 45 -15"
              result="goo"
            />
            <feComposite in="SourceGraphic" in2="goo" operator="atop" />
          </filter>

          <mask id="sumdge-mask">
            <g ref={smudgeContainerRef} filter="url(#sumdge-goo)"></g>
          </mask>
        </defs>

        <foreignObject x="0" y="0" width="100%" height="100%" mask="url(#sumdge-mask)">
          <div className="w-full h-full bg-[#f2f2f2] flex flex-col items-center justify-center p-20">
            <h2 className="text-[10vw] font-black text-[#282A2A] leading-[0.8] tracking-tighter uppercase text-center">
              Glistering<br />
              Bespoke<br />
              Branding
            </h2>
          </div>
        </foreignObject>
      </svg>

      <Cursor ref={cursorRef} />

    </div>
  )
}


export default GooeyCursorReveal