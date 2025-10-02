// /lib/config.js
export const API_BASE =
  process.env.NEXT_PUBLIC_API_BASE && process.env.NEXT_PUBLIC_API_BASE.trim() !== ''
    ? process.env.NEXT_PUBLIC_API_BASE
    : 'http://localhost:3000/api';

// Optional: see it in your dev logs
if (typeof window === 'undefined') {
  console.log('API Endpoint:', API_BASE);
}
