const config = {
  develop: {
    catalogoUrl: 'http://192.168.151.89:8000',
    microServicesUrl: 'http://192.168.151.89:8002',
    imagemUrl: 'http://192.168.151.85:5555',
  },
  homolog: {
    catalogoUrl: 'http://192.168.151.17:8000',
    microServicesUrl: 'http://192.168.151.17:8002',
    imagemUrl: 'http://192.168.151.85:5555',
  },
  test: {
    catalogoUrl: '',
    microServicesUrl: '',
    imagemUrl: '',
  },
};

export default function getConfig() {
  /* istanbul ignore next */
  const env = process.env.NODE_ENV || '';
  return config[env];
}
