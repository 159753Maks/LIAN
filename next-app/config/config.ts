const baseConfig = {
  dev: {
    apiUrl: 'http://localhost:8000/dev',
  },
  prod: {
    apiUrl: 'http://localhost:8000/dev',
  },
};

export const getConfig = (name: string): string => {
  // @ts-ignore
  return baseConfig['dev'][name];
};
