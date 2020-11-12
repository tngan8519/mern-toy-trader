import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import {
  HomeScreen,
  BrowseScren,
  DetailScreen,
  EditScreen,
  LoginScreen,
  RegisterScren,
  PostScreen,
  PrivateRoute,
} from "./screens";

function App() {
  return (
    <div className="app">
      <BrowserRouter>
        <Navbar />
        <Switch>
          <Route path="/" exact component={HomeScreen} />
          <Route path="/browse" component={BrowseScren} />
          <PrivateRoute path="/toy/:id/edit">
            <EditScreen />
          </PrivateRoute>
          <Route path="/toy/:id" component={DetailScreen} />
          <Route path="/login" component={LoginScreen} />
          <Route path="/register" component={RegisterScren} />
          <PrivateRoute path="/post">
            <PostScreen />
          </PrivateRoute>
        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;
