import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// eslint-disable-next-line no-undef
const API_URL = process.env.REACT_APP_API_URL || "http://localhost:8080";
// eslint-disable-next-line no-undef
axios.get(`${API_URL}/api/users`)
// eslint-disable-next-line no-undef
axios.post(`${API_URL}/api/users`, { name, email })


export default defineConfig({
  plugins: [react()],
  
})
