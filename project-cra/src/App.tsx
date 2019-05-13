import * as React from 'react';
import './App.css';
import { BrowserRouter as Router, Route, RouteComponentProps, Switch, Redirect, NavLink } from "react-router-dom";

const ComponentHome = () => {
  return (
    <h3>Component_Home</h3>
  );
};

const Post = (props: RouteComponentProps<{ postId: string}>) =>{
  function geNextPost(){
    const nextPostId = +props.match.params.postId+ 1;
    const inputPostUrl = "/posts/" + nextPostId;    
    props.history.push(inputPostUrl);
  }

  return (
    <div>
      <h3>Post {props.match.params.postId}</h3>
      <button onClick={geNextPost}>click</button>
      <p>{new URLSearchParams(props.location.search).get('body')}</p>
    </div>
  );
};

const PostList = (props: RouteComponentProps<{}>) => {

  function innerPostList(){
    return <h3>PostList</h3>
  }
  return (
    <div>
      <Route exact={true} path={props.match.url} render={innerPostList}/>
      <Route path={props.match.url + '/:postId'} component={Post}/>
    </div>
  );
};

const NotFound =  () => {
  return (
    <h3>Not Found !!</h3>
  );
};


const Admin = () => {
  const isAdmin =false;
  return isAdmin 
  ? <h3>Admin</h3>
  : <Redirect to="/"/>;
  
};


import logo from './logo.svg';

export interface AppProps{
  defaultName: string, age: number
  company?: string
}

export interface AppState{
  age: number,
  level: number,
  name: string,
  objectUser: {id: string, password: string}
}

class App extends React.Component<AppProps, AppState> {
  public static defaultProps = {
    company: 'I-ON'
  }

  public state: AppState = {
    age: 1, level: 0, name: '', objectUser: {id:'', password: ''}
  };
  constructor(props: AppProps){
    super(props);
    this._plusHundred = this._plusHundred.bind(this);
    console.log('constructor');
    this.state = {name: this.props.defaultName, age: this.props.age, level: 0, objectUser: {id:'m05214', password: 'test'}}
    
    
  }
  public componentWillMount() {
    console.log('componentWillMount');
  }

  public componentDidMount() {
    console.log('componentDidMount');
    setInterval(() => {
      this.setState({
        level: this.state.level + 1
      })
    }, 3000)
    // 이부분에서 API Call이 이루어진다
  }

  /*
  props 와 state 가 변경되었을 때 반응하는 메소드

  componentWillReceiveProps -> shouldComponentUpdate ->  componentWillUpdate -> render -> componentDidUpdate
  */
  public componentWillReceiveProps(nextProps: AppProps){
    // props가 변하면 가장 우선 동작
    console.log('App componentWillReceiveProps :', JSON.stringify(nextProps));
  }

  public shouldComponentUpdate(nextProps: AppProps, nextState: AppState): boolean{
    console.log('App shouldComponentUpdate :' , JSON.stringify(nextProps), ', ', JSON.stringify(nextState));

    // return이 true이면 rander가 동작 false이면 동작하지 않는다
    return true;
  }
  
  public componentWillUpdate(nextProps: AppProps, nextState: AppState){
    // 컴포넌트가 재 랜더링 되기 직전에 동작
    // setState와 비슷한 형태의 메소드 금지
    console.log('App componentWillUpdate :' , JSON.stringify(nextProps), ', ', JSON.stringify(nextState));
  }

  public componentDidUpdate(nextProps: AppProps, nextState: AppState){
    // 컴포넌트가 재 랜더링을 마치면 동작
    console.log('App componentDidUpdate :' , JSON.stringify(nextProps), ', ', JSON.stringify(nextState));
  }


  public renderDocument = () => {
    return <h3>Home</h3>
  }
  public renderDocument2 = () => {
    return <h3>Intro</h3>
  }

  public render() {
    console.log('render');
    return (
      <Router>
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React</h1>
          
          
        </header>
        <Statelesscomponent defaultName={this.props.defaultName} age={this.props.age} />
        <p className="App-intro">
          To get started, edit <code>src/App.tsx</code> and save to reload.
        </p>
          <h4>name: {this.state.name}</h4>
          <h4>company: {this.props.company}</h4>
          <h4>age: {this.state.age}</h4>
          <h4>level: {this.state.level}</h4>
          <h4>id: {this.state.objectUser.id}</h4>
          <h4>password: {this.state.objectUser.password}</h4>
          <button onClick={this._plusHundred}>초고속 레벨업</button>  
          <nav>
            <ul>
              <li><NavLink exact={true} activeStyle= {{ fontSize: 24 }} to="/" >Home</NavLink></li>
              <li><NavLink activeStyle= {{ fontSize: 24 }} to="/intro" >INTRO</NavLink></li>
              <li><NavLink activeStyle= {{ fontSize: 24 }} to="/admin" >Admin</NavLink></li>
            </ul>
          </nav>
          <Switch>
            <Route exact={true} path="/" component={ComponentHome} />
            <Route path="/intro" render={this.renderDocument2} />
            <Redirect from="/about" to="/intro" />
            <Route path="/posts" component={PostList} />
            <Route path="/admin" component={Admin} />
            <Route component={NotFound} />
          </Switch>
      </div>
      </Router>
    );
    
  }

  private _plusHundred(): void {
    this.setState({
      level: this.state.level + 100
    });
  }

  
}


const Statelesscomponent: React.SFC<AppProps> = ({defaultName, age, company}) => {
  return (
    <h2>{defaultName} - {age} / {company}</h2>
  );
};

Statelesscomponent.defaultProps = {
  company: 'naver'
};

export default App;
