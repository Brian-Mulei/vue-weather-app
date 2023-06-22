import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import dotenv from 'dotenv';

export default defineConfig(({ mode }) => {
  // Load environment variables based on the current mode
  dotenv.config({ path: `.env.${mode}` });

  return {
    plugins: [vue()],
    resolve: {
      alias: {
        '@': '/src',
      },
    },
  };
});