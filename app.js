const App = React.createClass({
    getInitialState: function () {
        return {
            isEditor: true,
            elements: []
        }
    },
    toogle: function () {
        this.setState({
            isEditor: !this.state.isEditor
        })
    },
    addElement: function (element) {
        const elements = this.state.elements;
        elements.push(element);

        this.setState({elements})
    },
    removeElement: function (i) {
        const elements = this.state.elements;
        elements.splice(i, 1);

        this.setState({elements})
    },
    render: function () {
        var isEditor = this.state.isEditor;
        return (
            <div>
                <ReactRouter.Link onClick={this.toogle} to={isEditor ? "/preview" : "/edit"}>
                    {isEditor ? 'Preview' : 'Editor'}</ReactRouter.Link>

                {this.props.children && React.cloneElement(this.props.children, {
                    elements:this.state.elements,
                    onAdd:this.addElement,
                    onRemove:this.removeElement
                })}
            </div>
        )
    }
});

const Editor = React.createClass({

    render: function () {
        return (
            <div>
                <Left elements={this.props.elements} onRemove={this.props.onRemove}/>

                <Right onAdd={this.props.onAdd}/>
            </div>
        )
    }
});

const Left = React.createClass({

    remove: function (i) {
        this.props.onRemove(i)
    },
    render: function () {
        const elements = this.props.elements.map((ele, i) => {
            return <div key={i}>
                <input type={ele}/>
                <button onClick={this.remove.bind(this.i)}>x</button>
            </div>
        })
        return (
            <div>{elements}</div>
        )
    }
});

const Right = React.createClass({

    add: function () {
        const element = $("input[name='element']:checked").val();
        this.props.onAdd(element);
    },
    render: function () {
        return (
            <div>
                <input type="radio" name="element" value="text"/>text
                <input type="radio" name="element" value="date"/>date
                <button onClick={this.add}>+</button>
            </div>
        )
    }
});

const Preview = React.createClass({

    render: function () {
        const elements = this.props.elements.map((ele, i) => {
            return <div key={i}>
                <input type={ele}/>
            </div>
        })
        return (
            <div>{elements}</div>
        )
    }
});

ReactDOM.render(
    <ReactRouter.Router>
        <ReactRouter.Route path="/" component={App}>
            <ReactRouter.IndexRoute path="/edit" component={Editor}/>
            <ReactRouter.Route path="/preview" component={Preview}/>
            <ReactRouter.Route path="/edit" component={Editor}/>
        </ReactRouter.Route>
    </ReactRouter.Router>
    , document.getElementById('content'));