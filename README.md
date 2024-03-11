# PWA with React + TypeScript + Vite +  Nginx 

## Installation from the project source code 

1. Install dependencies
    ```
    npm install
    ```

2. Run Nginx from docker to serv file
```
docker run -v `PATH_TO_PROJECT`/media:/usr/share/nginx/html:ro -v `PATH_TO_PROJECT`/default.conf:/etc/nginx/conf.d/default.conf:ro -p 80:80 nginx
```

3. Build app 
    ```
    npm run build
    npm run preview
    ```
    or run the app in development mode 
    ```
    npm run dev
    ```

    PS: While running the app in development mode, there might be limitations for testing PWA offline mode comprehensively. For thorough testing of PWA features like offline mode, it's recommended to build and serve the app in a production-like environment.

## For project installation & configuration from scratch ([Reference](https://www.saurabhmisra.dev/setup-react-pwa-using-vite/))

### PWA Config
1. Install Vite + React starter project
    
    ```
    npm create vite@latest
    ```
    
    Enter the `project name` => Select `React` as the framework and `TypeScript` as the variant

2. Install Vite PWA plugin
    
    ```
    npm install vite-plugin-pwa
    ```

3. Install PWA Assets Generator plugin
   This step is optional but practical for automatically generating necessary assets for PWA
    
    ```
    npm install @vite-pwa/assets-generator
    ```

4. Configure the Vite PWA plugin
    - Import VitePWA to vite.config.ts
    
    ```typescript
    import { VitePWA } from 'vite-plugin-pwa';
    ```
    
    - Append the PWA plugin configuration to the plugins list (see vite.config.ts file)

5. Add an NPM script in package.json for generating PWA assets
    
    ```json
    {
      "scripts": {
        "generate-pwa-assets": "pwa-assets-generator --preset minimal public/logo.svg"
      }
    }
    ```

6. Add logo.svg file to `/public`

7. Create PWA assets
    
    ```
    npm run generate-pwa-assets
    ```

8. Add `<link>` and `<meta>` tags for PWA assets in index.html
    
    ```html
    <head>
      <!-- other tags -->
      <link rel="icon" href="/favicon.ico" />
      <link rel="apple-touch-icon" href="/apple-touch-icon-180x180.png" sizes="180x180" />
      <link rel="mask-icon" href="/mask-icon.svg" color="#FFFFFF">
      <meta name="theme-color" content="#ffffff">
    </head>
    ```
### Three.js config  for 3D model rendering
   
    ```
    npm install three @types/three @react-three/fiber @react-three/drei
 
    ```

### Build app 
    ```
    npm run build
    npm run preview
    ```
   
    or run the app in development mode 
   
    ```
    npm run dev
    ```
