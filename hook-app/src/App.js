import React, { Component, useState, useEffect } from 'react';
import logo from './logo.svg';
import './App.css';

class App0 extends Component {
  state = {
    count: 0
  }
  render() {
    return (
      <button onClick={() => {
        let count = this.state.count + 1;
        this.setState({
          count
        })
      }}>
        click({this.state.count})
      </button>
    )

  }
}
/* 
  hook useState
  hook是2018年底出来的react新特性，主要是函数式组件，
  1.useSate()方法返回两个参数，一个变量，一个设置变量的方法,
    useState 会返回一对值：当前状态和一个让你更新它的函数，你可以在事件处理函数中或其他一些地方调用这个函数。它类似 class 组件的 this.setState，但是它不会把新的 state 和旧的 state 进行合并？——更新 state 变量总是替换它而不是合并它。
  2.useState(0)方法中可以传入数值为变量设置初始值,这个初始 state 参数只有在第一次渲染时会被用到。
  3.useState(()=>{return props.defaultCount || 0})方法也可以传入一个函数，以用来延迟设置初始变量，函数的返回值为初始变量，
    如下头的“App2系列”展示的例子
  4.只能在函数最外层调用 Hook。不要在循环、条件判断或者子函数中调用——因为useState()是按照第一次定义的顺序来返回固定顺序的state的，如果在循环、条件判断或者子函数中调用useState()就有可能造成顺序错乱、缺项少项和多项。
    如下头“App3”
  5.只能在 React 的函数组件中调用 Hook。不要在其他 JavaScript 函数中调用。（还有一个地方可以调用 Hook —— 就是自定义的 Hook 中，我们稍后会学习到。）
  Hook 是一种复用状态逻辑的方式，它不复用 state 本身。事实上 Hook 的每次调用都有一个完全独立的 state —— 因此你可以在单个组件中多次调用同一个自定义 Hook。
  因为 state 只在组件首次渲染的时候被创建。在下一次重新渲染时，useState 返回给我们当前的 state。
*/
function App1() {
  const [count, setCount] = useState(0);
  return (
    <button onClick={() => {
      setCount(count + 1);
    }}>
      click({count})
    </button>
  )
}
// --------------------App2系列——延迟设置初始值----------------------------
function App2(propps) {
  const [count, setCount] = useState(() => { console.log("initall App"); return propps.defaultCount || 0 });
  return (
    <button onClick={() => {
      setCount(count + 1);
    }}>
      click({count})
    </button>
  )
}

let id = 0;
// function App3(){
/* let count,setCount;
let name,setName;
// 在函数渲染前对id进行叠加判断
id +=1;
// 这里是当id为偶数时先调用count的useState,为奇数时先调用name的useState——react会报错“React Hook "useState" is called conditionally. React Hooks must be called in the exact same order in every component render  react-hooks/rules-of-hooks”
if( id&1 ){
  [count,setCount] = useState(0);
  [name,setName] = useState('Mojito');
}else{
  [name,setName] = useState('Mojito');
  [count,setCount] = useState(0);
} */
/* const [count,setCount] = useState(0);
const [name,setName] = useState('Mojito'); */
// 在函数渲染前对id进行叠加判断
/* id +=1;
console.log('-当前id:'+id); */
// 这里是测试少调一次useState,即只有当id为1时调用——会报错“React Hook "useState" is called conditionally. React Hooks must be called in the exact same order in every component render  react-hooks/rules-of-hooks Search for the keywords to learn more about each error”
// let test,setTest;
// if(id === 1){
//   useState('test')
// }
// 这里是测试多调几次useState,即只有当id大于1时调用——会报错“React Hook "useState" is called conditionally. React Hooks must be called in the exact same order in every component render  react-hooks/rules-of-hooks Search for the keywords to learn more about each error”
/* if(id > 2){
  useState('test')
}
return (
  <button onClick={() => {
    setCount(count+1);
  }}>
    click({count}),name({name})
  </button>
) */
// }
function App4() {
  const [count, setCount] = useState(0);
  const [name, setName] = useState('Mojito');
  // 在函数渲染前对id进行叠加判断
  id += 1;
  console.log('-当前id:' + id);
  console.log('-当前count:' + count);

  return (
    <button onClick={() => {
      setCount(1);
    }}>
      click({count}),name({name})
    </button>
  )
}

/*
   useEffect()执行函数方法副作用,每次渲染完会执行useEffect()方法
   清除工作是非常重要的，可以防止引起内存泄露！
   如果你的 effect 返回一个函数，React 将会在执行清除操作时调用它 
   如果某些特定值在两次重渲染之间没有发生变化，你可以通知 React 跳过对 effect 的调用，只要传递数组作为 useEffect 的第二个可选参数即可
   useEffect(() => {
  document.title = `You clicked ${count} times`;
}, [count]); // 仅在 count 更改时更新
    如果想执行只运行一次的 effect（仅在组件挂载和卸载时执行），可以传递一个空数组（[]）作为第二个参数。这就告诉 React 你的 effect 不依赖于 props 或 state 中的任何值，所以它永远都不需要重复执行。这并不属于特殊情况 —— 它依然遵循依赖数组的工作方式。
 */
/*
    
 */
class App5 extends Component {
  state = {
    count: 0,
    size: {
      height: document.documentElement.clientHeight,
      width: document.documentElement.clientWidth,
    }
  }
  onResize = () => {
    this.setState({
      size: {
        height: document.documentElement.clientHeight,
        width: document.documentElement.clientWidth,
      }
    })
  }
  componentDidMount() {
    window.addEventListener('resize', this.onResize, false);
  }
  componentDidUpdate() {
    document.title = this.state.count;
  }
  componentWillUnmount() {
    window.removeEventListener('resize', this.onResize, false);
  }
  render() {
    return (
      <button onClick={() => {
        let count = this.state.count + 1;
        this.setState({
          count
        })
      }}>
        click({this.state.count}),width({this.state.size.width})*height({this.state.size.height})
      </button>
    )

  }
}
function App6() {
  const [count, setCount] = useState(0);
  const [name, setName] = useState('Mojito');
  useEffect(() => {
    document.title = `${name}(${count})`;
  }, [count, name])
  const onResize = () => {
    setName(`${document.documentElement.clientHeight}Mojito`)
    setSize(
      {
        height: document.documentElement.clientHeight,
        width: document.documentElement.clientWidth,
      })
  }
  const [size, setSize] = useState({
    height: document.documentElement.clientHeight,
    width: document.documentElement.clientWidth,
  })
  useEffect(() => {
    window.addEventListener('resize', onResize, false);
    return () => {
      window.removeEventListener('resize', onResize, false)
    }
  }, [])
  return (
    <button onClick={() => {
      setCount(count + 1);
      setName(`${count + 1}Mojito`);
    }}>
      click({count}),width({size.width})*height({size.height})
    </button>

  )
}
function App() {
  const [count, setCount] = useState(0);
  const [name, setName] = useState('Mojito');
  useEffect(() => {
    document.title = `${name}(${count})`;
  }, [count, name])
  const onResize = () => {
    setName(`${document.documentElement.clientHeight}Mojito`)
    setSize(
      {
        height: document.documentElement.clientHeight,
        width: document.documentElement.clientWidth,
      })
  }
  const [size, setSize] = useState({
    height: document.documentElement.clientHeight,
    width: document.documentElement.clientWidth,
  })
  useEffect(() => {
    window.addEventListener('resize', onResize, false);
    return () => {
      window.removeEventListener('resize', onResize, false)
    }
  }, [])
  const onClick = () => {
    console.log('click');
  }
  useEffect(() => {
    document.querySelector('#size').addEventListener('click',onClick,false);
    return () => {
      document.querySelector('#size').removeEventListener('click',onClick,false);
    }
  })
  return (
    <div>
      <button onClick={() => {
        setCount(count + 1);
        setName(`${count + 1}Mojito`);
      }}>
        click({count})
      </button>
      {
        count % 2 ?
          <span id='size'>
            width({size.width})*height({size.height})
          </span> :
          <p id='size'>
            width({size.width})*height({size.height})
          </p>
      }

    </div>

  )
}


export default App;
