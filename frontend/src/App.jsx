import Cart from './components/Cart';
import Checkout from './components/Checkout';
import Header from './components/Header'
import Meals from './components/Meals'
const App = () => {
  return (
    <>  
      <Header />
      <Meals />
      <Cart />
      <Checkout />
    </>
  );
};

export default App;