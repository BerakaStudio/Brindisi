import React from 'react'

export default function BackgroundDecoration() {
  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
      {/* Gradiente radial superior */}
      <div 
        className="absolute top-0 right-1/4 w-[600px] h-[600px] rounded-full opacity-[0.03] blur-3xl animate-pulse"
        style={{
          background: 'radial-gradient(circle, rgba(20, 184, 166, 0.3) 0%, transparent 70%)',
          animationDuration: '8s'
        }}
      />

      {/* Gradiente radial inferior */}
      <div 
        className="absolute bottom-0 left-1/4 w-[500px] h-[500px] rounded-full opacity-[0.02] blur-3xl animate-pulse"
        style={{
          background: 'radial-gradient(circle, rgba(13, 148, 136, 0.4) 0%, transparent 70%)',
          animationDuration: '10s',
          animationDelay: '2s'
        }}
      />

      {/* Forma orgánica flotante 1 */}
      <div className="absolute top-1/4 left-10 opacity-[0.02] animate-float">
        <svg width="300" height="300" viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <linearGradient id="grad1" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#115e59" stopOpacity="0.5" />
              <stop offset="100%" stopColor="#0d9488" stopOpacity="0.3" />
            </linearGradient>
          </defs>
          <path fill="url(#grad1)" d="M45.1,-57.8C58.9,-46.2,71.1,-32.4,75.6,-16.3C80.1,-0.1,77,18.4,68.8,33.3C60.6,48.2,47.3,59.5,32.1,65.4C16.9,71.3,-0.3,71.8,-16.8,67.2C-33.3,62.6,-49.1,52.9,-59.4,38.9C-69.7,24.9,-74.5,6.6,-72.6,-11.2C-70.7,-29,-62.1,-46.3,-48.7,-57.7C-35.3,-69.1,-17.7,-74.6,-0.5,-73.9C16.6,-73.2,33.3,-66.3,45.1,-57.8Z" transform="translate(100 100)" />
        </svg>
      </div>

      {/* Forma orgánica flotante 2 */}
      <div className="absolute bottom-1/4 right-10 opacity-[0.015] animate-float-delayed">
        <svg width="250" height="250" viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <linearGradient id="grad2" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#134e4a" stopOpacity="0.4" />
              <stop offset="100%" stopColor="#14b8a6" stopOpacity="0.2" />
            </linearGradient>
          </defs>
          <path fill="url(#grad2)" d="M41.3,-53.7C53.4,-43.5,63.3,-31.2,67.8,-17.1C72.3,-3,71.4,12.9,64.8,26.3C58.2,39.7,45.9,50.6,32.1,57.3C18.3,64,-1.1,66.5,-18.9,62.8C-36.7,59.1,-52.9,49.2,-62.6,35.2C-72.3,21.2,-75.5,3.1,-71.8,-13.3C-68.1,-29.7,-57.5,-44.4,-44.3,-54.3C-31.1,-64.2,-15.5,-69.3,-0.3,-68.9C14.9,-68.5,29.8,-62.6,41.3,-53.7Z" transform="translate(100 100)" />
        </svg>
      </div>

      {/* Líneas sutiles decorativas */}
      <div className="absolute top-1/2 left-0 right-0 h-px bg-gradient-to-r from-transparent via-emerald-900/5 to-transparent" />
      <div className="absolute top-1/3 left-0 right-0 h-px bg-gradient-to-r from-transparent via-emerald-900/3 to-transparent" />
      <div className="absolute top-2/3 left-0 right-0 h-px bg-gradient-to-r from-transparent via-emerald-900/3 to-transparent" />
    </div>
  )
}