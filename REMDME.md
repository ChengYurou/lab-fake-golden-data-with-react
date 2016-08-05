# Use ReactRouter do golden data and pass props

------

## 要在react项目中使用**react router**首先要引入**ReactRouter.min.js**
[可点击此处引入或下载](https://cdnjs.com/libraries/react-router)
首先要做的就是写路径
原代码:
`ReactDOM.render(<App/>,document.getElementById('content'));`

修改后:
```javascript
ReactDOM.render(
<ReactRouter.Router>
    <ReactRouter.Route path="/" component={App}>
            <ReactRouter.IndexRoute path="/edit" component={Editor}/>
            <ReactRouter.Route path="/preview" component={Preview}/>
            <ReactRouter.Route path="/edit" component={Editor}/>
     </ReactRouter.Route>
    </ReactRouter.Router>
    , document.getElementById('content'));
```
你可能注意到我使用了嵌套,为什么要这么写呢?App是一个总的组件,也是唯一一个传递和处理数据的,另外两个组建中的数据由它而来也要传回给它作处理,因此应该嵌套在其内部.
##  既然有**数据的传入传出**,那么如何做到这一点呢
```javascript
{this.props.children && React.cloneElement(this.props.children, {
                    elements:this.state.elements,
                    onAdd:this.addElement,
                    onRemove:this.removeElement
                })}
```
上面这段代码就完美解释了如何向子组件传递数据,函数,和参数.