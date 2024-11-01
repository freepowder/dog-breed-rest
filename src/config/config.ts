const APP_CONFIG = {
  app: {
    title: 'Express REST server Dog Breed Api',
  },
  db: {
    uri: process.env.MONGO as string,
  },
  secure: {
    ssl: false,
    privateKey: './config/sslcerts/key.pem',
    certificate: './config/sslcerts/cert.pem',
    caBundle: './config/sslcerts/cabundle.crt',
  },
  NodeEnv: (process.env.NODE_ENV ?? ''),
  port: (process.env.PORT ?? 4000),

};

export default APP_CONFIG;
