import '../styles/custom.scss'
import '../styles/styles.css'
import Layout from '../komponenten/Layout'

export default function App({ Component, pageProps }) {
  return (
    <Layout>
      <Component {...pageProps} />
    </Layout>
  )
}
