import { ComparatorRouter } from "./routes/Router";
import { UserProvider } from "./store/user/UserProvider";

const App = () => (
  <UserProvider>
    <ComparatorRouter />
  </UserProvider>
);

export default App;
