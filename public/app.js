var TodoList = React.createClass({
	render: function(){
		var todoList = this.props.allMyData.map(function(t){
			return (
			<div className="panel panel-default">	
				<div className="panel panel-header">
					{t.name}
				</div>
				<div className="panel panel-body">
					{t.due_date}
				</div>
				<div className="panel panel-footer">
					{t.description}
				</div>
			</div>
			)
		})

		return (
			<div>
			  <p> { todoList } </p>
			</div>
			)
	}
})

var App = React.createClass({					
	
	getInitialState: function() {
		return {
			todos: []
		}
	},
	
	loadTodosFromServer: function() {
		var self = this;
		$.ajax({
		  url: '/api/todo',
		  method: 'GET'
		}).done(function(data){
		  	self.setState({
		  	 todos: data
		  	})
		});
	},

	componentDidMount: function() {
		this.loadTodosFromServer();
	},
	
	render: function() {
		return (
			<div>
				<h3> Hello World! </h3>
				<TodoList allMyData={ this.state.todos }/>
			</div>
			)
	}
});

React.render(<App/>, document.getElementById('app'));