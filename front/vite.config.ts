import { defineConfig } from 'vite';
import eslintPlugin from 'vite-plugin-eslint';
import reactRefresh from '@vitejs/plugin-react-refresh';
import path from 'path';

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [
        reactRefresh(),
        eslintPlugin({
            cache: false,
        }),
    ],
    resolve: {
        alias: {
            views: path.resolve(__dirname, './src/views'),
            theme: path.resolve(__dirname, './src/theme'),
            assets: path.resolve(__dirname, './src/assets'),
            components: path.resolve(__dirname, './src/components'),
            styles: path.resolve(__dirname, './src/styles'),
            generated: path.resolve(__dirname, './src/generated'),
            utils: path.resolve(__dirname, './src/utils'),
            hooks: path.resolve(__dirname, './src/hooks'),
            constants: path.resolve(__dirname, './src/constants'),
        },
    },
});
