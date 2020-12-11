const ROUTE_FROM = 'report'
export default [
  {
    path: '/test',
    name: 'Test',
    meta: {
      title: '',
    },
    component: (resolve) =>
      require.ensure(
        [],
        () => resolve(require('@/views/TestPage/index')),
        ROUTE_FROM
      ),
  },
]
