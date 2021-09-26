import './App.css';
import './i18n';
import CountDown from './components/CountDown/CountDown';
import ExpenseCalculator from './components/ExpenseCalculator/ExpenseCalculator';
import { CountDownProvider } from './context/CountDownContext';
import Footer from './components/Footer/Footer';

function App() {
  return (
    <div className="App">
      <div style={{marginBottom: "50px"}}>
        <CountDownProvider>
          <CountDown />
          <ExpenseCalculator />
        </CountDownProvider>
      </div>
      <Footer />
    </div>
  );
}

export default App;
