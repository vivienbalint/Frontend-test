import React from "react";
import { BrowserRouter, Route, Redirect } from "react-router-dom";
import LazyLoad from "react-lazyload";
import Header from "./Components/Header";
import Register from "./Components/Register";
import Login from "./Components/Login";
import UserPage from "./Components/UserPage";
import Article from "./Components/Article";
import AllArticles from "./Components/AllArticles";
import CreateArticle from "./Components/CreateArticle";
import { initialState, reducer } from "./auth/auth.reducer";
import AuthContext from "./auth/auth.context";

function App() {
  const [state, dispatch] = React.useReducer(reducer, initialState);
  return (
    <AuthContext.Provider value={{ state, dispatch }}>
      <BrowserRouter>
        <div id="app-container">
          {state.isAuthenticated ? (
            <Header isLoggedIn={true} />
          ) : (
            <Header isLoggedIn={false} />
          )}
          <Route exact path="/" component={AllArticles} />
          <LazyLoad>
            <Route exact path="/login" component={Login} />
          </LazyLoad>
          <LazyLoad>
            <Route exact path="/register" component={Register} />
          </LazyLoad>
          {state.isAuthenticated ? (
            <LazyLoad>
              <Route exact path="/user-page" component={UserPage} />
            </LazyLoad>
          ) : (
            <Redirect to="/login" />
          )}
          {state.isAuthenticated ? (
            <LazyLoad>
              <Route exact path="/create-article" component={CreateArticle} />
            </LazyLoad>
          ) : (
            <Redirect to="/login" />
          )}
          {state.isAuthenticated ? (
            <LazyLoad>
              <Route path="/article/:slug">
                <Article isLoggedIn={true} />
              </Route>
            </LazyLoad>
          ) : (
            <LazyLoad>
              <Route path="/article/:slug">
                <Article isLoggedIn={false} />
              </Route>
            </LazyLoad>
          )}
        </div>
      </BrowserRouter>
    </AuthContext.Provider>
  );
}

export default App;
