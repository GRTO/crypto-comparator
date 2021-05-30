import { lazy, Suspense, FC } from "react";
import {
  BrowserRouter as Router,
  Redirect,
  Route,
  Switch,
} from "react-router-dom";
import { useUser } from "../hooks/useUser";

const AsyncComparator = lazy(() => import("../pages/comparator/Comparator"));

const AsyncWelcome = lazy(() => import("../pages/welcome/Welcome"));

export const ComparatorRouter: FC = () => {
  const { user } = useUser();
  return (
    <Suspense fallback={"Loading ..."}>
      <Router>
        <Switch>
          <Route exact path="/" render={() => <AsyncWelcome />} />
          {user ? (
            <Route
              exact
              path="/comparator"
              render={() => <AsyncComparator />}
            />
          ) : (
            <Redirect to={{ pathname: "/" }} />
          )}
        </Switch>
      </Router>
    </Suspense>
  );
};
