const App = React.createClass({
    getInitialState: function () {
        return {
            isEditor:true,
            elements:[]
        }
    },
    toggle:function () {
        this.setState({isEditor:!this.state.isEditor});
    },
    onAdd:function (element) {
        const elements = this.state.elements;
        elements.push(element);
        this.setState({elements});
    },
    onRemove:function (index) {
        const elements = this.state.elements;
        elements.splice(index,1);
        this.setState({elements});
    },

    render: function(){
        const isEditor = this.state.isEditor
        return (
            <div>
                <button onClick={this.toggle}>{isEditor?'Preview':'Editor'}</button>

                <div className={isEditor ? '' :'hidden'}>
                    <Editor onAdd={this.onAdd} elements={this.state.elements} onRemove={this.onRemove}/>
                </div>
                <div className={isEditor ? 'hidden' :''}>
                    <Preview elements={this.state.elements}/>
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
                    <Left elements={this.props.elements} onRemove={this.props.onRemove}/>
                </div>
                <div>
                    <Right onAdd={this.props.onAdd}/>
                </div>
            </div>
        )
    }
});

const Left = React.createClass({

    remove:function (index) {
      this.props.onRemove(index);
    },
    render: function(){
        const elements = this.props.elements.map((ele, index) => {
            return <div key={index}>
                <input type={ele}/>
                <button onClick={this.remove.bind(this,index)}>X</button>
            </div>
        })
        return (
            <div>
                {elements}
            </div>
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
                <input type="radio" name="element" value="text" />text
                <input type="radio" name="element" value="date"/>date
                <button onClick={this.add}>+</button>
            </div>
        )
    }
});

const Preview = React.createClass({

    render: function(){
        const elements = this.props.elements.map((ele,index) => {
            return <div key={index}>
                <input type={ele} />
            </div>
        })
        return (
            <div>{elements}</div>
        )
    }
});

ReactDOM.render(<App/>,document.getElementById('content'));
