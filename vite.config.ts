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
    root: './src/client/',
    resolve: {
        alias: {
            views: path.resolve(__dirname, './src/client/src/views'),
            theme: path.resolve(__dirname, './src/client/src/theme'),
            assets: path.resolve(__dirname, './src/client/src/assets'),
            components: path.resolve(__dirname, './src/client/src/components'),
            styles: path.resolve(__dirname, './src/client/src/styles'),
            generated: path.resolve(__dirname, './src/client/src/generated'),
            utils: path.resolve(__dirname, './src/client/src/utils'),
            hooks: path.resolve(__dirname, './src/client/src/hooks'),
            constants: path.resolve(__dirname, './src/client/src/constants'),
        },
    },
    build: {
        outDir: 'dist',
    },
});
