/*
 * File: app.js
 * Description: react-timeline时间线项目 启动入口
 * Project: react-timeline
 * -----
 * File Created: 2019-09-30 14:20:04 306
 * Author: Wu Eva
 * Last Modified: 2019-10-08 17:42:59 923
 * Modified By: Wu Eva
 * -----
 * Copyright (c) 2019
 */
(() => {
  const getRootId = () => 'root';
  // const getRouterPathArr = ()=>['home','timeline','hook','my','404'];
  const getRouterPathArr = ()=>['home','timeline','hook','my'];
  const getRouterIconArr = ()=>['inbox','filter_center_focus','archive','account_box'];
  const getRooterNameArr = ()=>['首页','时间轴','计数器','我的'];
  const getElmById = (id) => document.getElementById(id);
  // const e = React.createElement;
  const { createElement:e } = React;
  const { render } = ReactDOM;
  const { BrowserRouter:Router, StaticRouter, Route, Link, NavLink,Switch } = ReactRouterDOM;
  // #region 路由相关逻辑                           --------------------------------------------------------------------start */
  // #endregion 路由相关逻辑                           --------------------------------------------------------------------end */
  
  // #region 组件生成相关逻辑                           --------------------------------------------------------------------start */
  const Message = ({name,index,pathName,history,location,match, staticContext})=> {
    return (<h2>你好{match.params.id || 'melon-0'},当前页面key值是{location.key}，这里是 {name}-{index}，来自{pathName},通过{history.action}到达页面</h2>);
  }
  
  const NoMatch = ({ location })=> {
    return (
      <div>
        <h3>
          No match for <code>{location.pathname}</code>
        </h3>
      </div>
    );
  }
  // #endregion 组件生成相关逻辑                           --------------------------------------------------------------------end */
  
  // #region 页面渲染相关逻辑                           --------------------------------------------------------------------start */
  /**
   * 获取主页面的页面主要Dom元素
   */
  const getFullDom = () => {
    const divDom = document.createElement('div');
    divDom.setAttribute('id', getRootId());
    divDom.innerHTML = '';
    return divDom;
  }
  // #endregion 页面渲染相关逻辑                           --------------------------------------------------------------------end */

  
  // #region 路由相关逻辑                           --------------------------------------------------------------------start */
// wrap <Route> and use this everywhere instead, then when
// sub routes are added to any route it'll work
const RouteWithSubRoutes = (route)=> {
  return (
    <Route
      path={route.path}
      render={props => (
        // pass the sub-routes down to keep nesting
        <Route {...props} routes={route.routes} component={route.component}/>
      )}
    />
  );
  // <route.component {...props} routes={route.routes} />
}

const getRouterActiveClass = () => 'mdui-bottom-nav-active';

const getCurrentClass = (i)=>{
  const activeClass = getRouterActiveClass();
  let className = 'mdui-ripple mdui-ripple-white';
  // i===0 && (className += ` ${activeClass}`);
  return className;
}
  /**
   * 在页面追加完元素之后，渲染子路由元素
   */
  const renderContentAfterAppend = ()=>{
    const routerPathArr = getRouterPathArr();
    const rooterNameArr = getRooterNameArr();
    const routerIconArr = getRouterIconArr();
    const routerConfig = [];

    rooterNameArr.map(function(item,index){
    const currTpl = (propObj) => {
      return (<Message name={item} index={index} pathName={routerPathArr[index]} {...propObj}/>)
    };
      index === 0 && routerConfig.push({ path: `/`, exact:true, component: currTpl });
      const currConfig = { path: `/${routerPathArr[index]}/:id`, component: currTpl};
      routerConfig.push(currConfig);
    });
    routerConfig.push({ component: NoMatch });
    const tempRouterTpl = <Router>
      <div>
        <div className="mdui-bottom-nav mdui-bottom-nav-scroll-hide mdui-color-red mdui-bottom-nav-text-auto"  mdui-tab="true">
        {routerPathArr.map((routerPath, i) => (
            <NavLink to={`/${routerPath}/melon-${i}`} activeClassName={getRouterActiveClass()} className={getCurrentClass(i)} key={i}>
              <i className="mdui-icon material-icons">{routerIconArr[i]}</i>
              <label>{rooterNameArr[i]||'not find'}</label>
            </NavLink>
          ))}
        </div>
        <Switch selectedKeys>
          {routerConfig.map((route, i) => (
            <RouteWithSubRoutes key={i} {...route} />
          ))}
        </Switch>
        
      </div>
    </Router>;
    render(tempRouterTpl, getElmById(getRootId()));
  };
  // #endregion 路由相关逻辑                           --------------------------------------------------------------------end */

  /**
   * 初始化项目
   */
  const initTimeline = () => {
    const allDom = getFullDom();
    document.body.prepend(allDom);
    renderContentAfterAppend();
  }

  // 初始化页面结构
  initTimeline();
})()