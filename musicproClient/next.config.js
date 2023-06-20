const nextConfig = {
    webpack: (config) => {
      // Configuración personalizada de Webpack
      config.resolve.fallback = {
        ...config.resolve.fallback,
        fs: false, // Evita el error de resolución de módulo 'fs'
        net: false, // Evita el error de resolución de módulo 'net'
        tls: false, // Evita el error de resolución de módulo 'tls'
        debug: require.resolve('debug'), // Resuelve el módulo 'debug' correctamente
      };
  
      return config;
    },
  };
  
  module.exports = nextConfig;
  