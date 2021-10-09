import { AuthContextProvider } from "../contexts/AuthContext";
import "../styles/globals.css";

const App = ({ Component, pageProps }) => {
  return (
    <AuthContextProvider>
      <Component {...pageProps} />
    </AuthContextProvider>
  );
};

export default App;
