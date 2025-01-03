/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./components/**/*.{js,vue,ts}",
    "./layouts/**/*.vue",
    "./pages/**/*.vue",
    "./plugins/**/*.{js,ts}",
    "./app.vue",
    "./error.vue",
  ],
  theme: {
    fontFamily: {
      main:     ['Montserrat', 'sans-serif'],
      display:  ['Teko', 'sans-serif'],
      especial: ['Libre Barcode']
    },
    extend: {},
  },
  plugins: [
    require('daisyui'),
  ],
  daisyui: {
    themes: [
      {
        soccus: {       
            "primary":    "#4f46e5",
                      
            "secondary":  "#93c5fd",
                      
            "accent":     "#60a5fa",
                      
            "neutral":    "#e5e7eb",
                      
            "base-100":   "#ffffff",
                      
            "info":       "#8b5cf6",
                      
            "success":    "#14b8a6",
                      
            "warning":    "#be185d",
                      
            "error":      "#e11d48",
          },
        
        
      }
    ]
  }
}

