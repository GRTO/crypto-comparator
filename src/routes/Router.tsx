import { lazy, Suspense, FC } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

const AsyncComparator = lazy(() => import("../pages/comparator/Comparator"));

const AsyncWelcome = lazy(() => import("../pages/welcome/Welcome"));

export const ComparatorRouter: FC = () => (
  <Suspense fallback={"isLoading"}>
    <Router>
      <Switch>
        <Route exact path="/" render={() => <AsyncWelcome />} />
        <Route exact path="/comparator" render={() => <AsyncComparator />} />
      </Switch>
    </Router>
  </Suspense>
);
