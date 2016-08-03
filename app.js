const App = React.createClass({
    getInitialState:function () {
      return {
          isEditor:true,
          elements:[]
      }
    },
    toogle:function () {
      this.setState({isEditor:!this.state.isEditor});
    },
    onAdd:function (element) {
        const elements = this.state.elements;
        console.log(element)
        elements.push(element);
        this.setState(elements);
        console.log(elements)
    },
    render: function(){
        const isEditor = this.state.isEditor;

        return (
            <div>
                <button onClick={this.toogle}>{isEditor?'preview':'edit'}</button>
                <div className={isEditor?'':'hidden'}>
                    <Editor onAdd={this.onAdd}/>
                </div>
                <div className={isEditor?'hidden':''}>
                    <Preview/>
                </div>
            </div>
        )
    }   
});

const Editor = React.createClass({
   
    render: function(){
        return (
            <div>
                <div>
                    <Left />
                </div>
                <div>
                    <Right onAdd={this.props.onAdd}/>
                </div>
            </div>
        )
    }   
});

const Left = React.createClass({

    render: function(){
        return (
            <div>Left</div>
        )
    }
});

const Right = React.createClass({

    add:function () {
      const element = $("input[name='element']:checked").val();
        this.props.onAdd(element);
    },

    render: function(){
        return (
            <div>
                <input type="radio" name="element" value="text"/>text
                <input type="radio" name="element" value="data"/>data
                <button onClick={this.add}>+</button>
            </div>
        )
    }
});

const Preview = React.createClass({
   
    render: function(){
        return (
            <div>Preview</div>
        )
    }   
});

ReactDOM.render(<App/>,document.getElementById('content'));