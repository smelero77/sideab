/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{html,js,svelte,ts}'],
  theme: {
    extend: {
      colors: {
        // Fondo y textos
        'bg': 'var(--color-bg)',
        'text': 'var(--color-text)',
        'text-secondary': 'var(--color-text-secondary)',
        
        // Color de acento
        'accent': 'var(--color-accent)',
        
        // Grises de soporte
        'grey-dark': 'var(--grey-dark)',
        'grey-border': 'var(--grey-border)',
        
        // Mapeo a variables existentes para mantener compatibilidad
        'bg-primary': 'var(--bg-primary)',
        'bg-secondary': 'var(--bg-secondary)',
        'bg-tertiary': 'var(--bg-tertiary)',
        
        'text-primary': 'var(--text-primary)',
        'text-secondary': 'var(--text-secondary)',
        'text-tertiary': 'var(--text-tertiary)',
        
        'accent-primary': 'var(--accent-primary)',
        'accent-hover': 'var(--accent-hover)',
        'accent-active': 'var(--accent-active)',
        
        // Estados
        'success-bg': 'var(--success-bg)',
        'success-text': 'var(--success-text)',
        'warning-bg': 'var(--warning-bg)',
        'warning-text': 'var(--warning-text)',
        'error-bg': 'var(--error-bg)',
        'error-text': 'var(--error-text)',
        'info-bg': 'var(--info-bg)',
        'info-text': 'var(--info-text)',
        
        // Bordes y sombras
        'border-color': 'var(--border-color)',
        'shadow-color': 'var(--shadow-color)'
      },
      animation: {
        'spin-slow': 'spin 20s linear infinite',
        'pulse-slow': 'pulse 2s ease-in-out infinite',
        'heartbeat': 'heartbeat 0.6s ease-in-out',
        'scanline': 'scanline 1s linear infinite'
      },
      keyframes: {
        heartbeat: {
          '0%, 100%': { transform: 'scale(1)' },
          '50%': { transform: 'scale(0.8)' }
        },
        scanline: {
          '0%': { backgroundPosition: '0 0' },
          '100%': { backgroundPosition: '0 100%' }
        }
      }
    }
  },
  plugins: []
} 