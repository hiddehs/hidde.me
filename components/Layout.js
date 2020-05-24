const Layout = ({
  children,
}) => (
  <div className="layout">
    {/*header*/}
    <div className="content">{children}</div>
    {/*footer*/}
  </div>
)

export default Layout
