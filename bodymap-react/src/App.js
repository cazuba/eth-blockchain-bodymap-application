import Layout from './compositions/Layout';
import Header from './compositions/Header';
import Main from './compositions/Main';
import Footer from './compositions/Footer';

import './App.css';

function App() {
  return (
    <Layout>
      <Header />
      <Main />
      <Footer />
    </Layout>
  );
}

export default App;
