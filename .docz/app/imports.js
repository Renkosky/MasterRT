export const imports = {
  'mri-cli/index.mdx': () =>
    import(/* webpackPrefetch: true, webpackChunkName: "mri-cli-index" */ 'mri-cli/index.mdx'),
  'mri-cli/mri-build.mdx': () =>
    import(/* webpackPrefetch: true, webpackChunkName: "mri-cli-mri-build" */ 'mri-cli/mri-build.mdx'),
  'mri-cli/mri-dev.mdx': () =>
    import(/* webpackPrefetch: true, webpackChunkName: "mri-cli-mri-dev" */ 'mri-cli/mri-dev.mdx'),
  'mri-cli/mri-prod.mdx': () =>
    import(/* webpackPrefetch: true, webpackChunkName: "mri-cli-mri-prod" */ 'mri-cli/mri-prod.mdx'),
  'src/demo/alert.mdx': () =>
    import(/* webpackPrefetch: true, webpackChunkName: "src-demo-alert" */ 'src/demo/alert.mdx'),
  'src/demo/demo.mdx': () =>
    import(/* webpackPrefetch: true, webpackChunkName: "src-demo-demo" */ 'src/demo/demo.mdx'),
}
