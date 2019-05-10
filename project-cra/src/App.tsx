import * as React from 'react';
import './App.css';

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


  

  public render() {
    console.log('render');
    return (
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
      </div>
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
