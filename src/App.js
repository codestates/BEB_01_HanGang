import React from 'react';
// TODO : React Router DOM을 설치 후, import 구문을 이용하여 BrowserRouter, Route, Switch 컴포넌트를 불러옵니다.
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Main from './components/Main';
import Auction from './components/Auction';
import Create from './components/Create';
import Collect from './components/Collect'
import Bar from './Bar';

const App = (props) => {
  

  return (
    <BrowserRouter>
      <div className="App">
        <main>
          {/* <Sidebar /> */}
          {/* <section className="features"> */}
          <Bar />
          <Switch>
            <Route exact path="/">
              <Main />
            </Route>
            <Route path="/Collect">
              <Collect />
            </Route>
            <Route path="/Auction">
              <Auction />
            </Route>
            <Route path="/Create">
              <Create />
            </Route>
          </Switch>
          {/* <Route exact path="/"> */}
          {/* </Route> */}
          {/* TODO : 유어클래스를 참고해서, 테스트 케이스를 통과하세요.
            TODO : React Router DOM 설치 후 BrowserRouter, Route의 주석을 해제하고 Swtich 컴포넌트를 적절하게 작성합니다. */}
          {/* </section> */}

        </main>
      </div>
    </BrowserRouter>
  );
};

// ! 아래 코드는 수정하지 않습니다.
export default App;