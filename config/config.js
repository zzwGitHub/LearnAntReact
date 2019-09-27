export default {
  singular: true,
  plugins: [
    ['umi-plugin-react', {
      antd: true,
      dva: true,
    }],
  ],
  // theme: {
  //   "primary-color": "#1DA57A",
  // },
  routes: [{
    path: '/',
    component: '../layout',
    routes: [
      {
        path: '/',
        component: 'Helloworld',
      },
      {
        path: '/helloworld',
        component: 'Helloworld'
      },
      {
        path: '/dashboard',
        routes: [
          { path: '/dashboard/analysis', component: 'Dashboard/Analysis' },
          { path: '/dashboard/monitor', component: 'Dashboard/Monitor' },
          { path: '/dashboard/workplace', component: 'Dashboard/Workplace' }
        ]
      },
      {
        path: '/learn1',
        routes: [
          { path: '/learn1/typography', component: 'Learn1/Typography' },
          { path: '/learn1/cardrequest', component: 'Learn1/CardRequest' },
          { path: '/learn1/booktable', component: 'Learn1/BookTable' },
          { path: '/learn1/form', component: 'Learn1/Form' },
          { path: '/learn1/login', component: 'Learn1/Login' },
        ]
      },
      {
        path: '/datainput',
        routes: [
          { path: '/datainput/datepickerpage', component: 'DataInput/DatePickerPage' },
        ]
      },
    ]
  }],
  proxy:{
    '/BootServer': {
      target: 'http://localhost:8088',
      changeOrigin: true,
    }
  }
};

