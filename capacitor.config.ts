import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.salarysense.app',
  appName: 'SalarySense',
  webDir: 'dist',
  server: {
    androidScheme: 'https'
  },
  android: {
    buildOptions: {
      keystorePath: 'release-key.keystore',
      keystoreAlias: 'key0',
      keystorePassword: 'salarysense',
      keyPassword: 'salarysense',
    }
  }
};

export default config;