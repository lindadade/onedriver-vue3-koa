const getters = {
  sidebar: state => state.app.sidebar,
  device: state => state.app.device,
  token: state => state.user.token,
  avatar: state => state.user.avatar,
  name: state => state.user.name,
  redirect: state => state.user.redirect,
  unitOptions: state => state.user.unitOptions,
  visitedViews: state => state.tagsView.visitedViews,
  cachedViews: state => state.tagsView.cachedViews,
  addRoutes: state => state.permission.addRoutes
}
export default getters
