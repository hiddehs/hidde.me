import Head from 'next/head'

const Layout = ({
  children,
}) => (
  <>
    <div className="content">
      {children}
    </div>
  </>
)

export default Layout
