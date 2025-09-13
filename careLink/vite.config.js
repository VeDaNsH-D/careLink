import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  server: {
    historyApiFallback: true, // ensures deep links work
  },
});


// https://vite.dev/config/

//changed this
// export default defineConfig({
//   plugins: [react()],
// })
