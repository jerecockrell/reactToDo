var TodoList = React.createClass({
  render: function() {
    var self = this;
	
	var todoList = this.props.allMyData.map(function(t){
	  return (
		<div className="panel panel-default">	
		  <div className="panel-header">
		    { t.name }
		  </div>
		  <div className="panel-body">
			{ t.description }
		  </div>
		  <div className="panel-footer">
			{ t.dueDate }
			  <button className="btn btn-warning" 
			   onClick={self.props.handleDelete.bind(this, t._id)}> 
			   delete 
			  </button>
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
});

var TodoForm = React.createClass({
  getInitialState: function() {
    return {
	  name: '',
	  description: '',
	  dueDate: ''
	}
  },
	handleNameChange: function(e) {
	  this.setState({
	    name: e.target.value
	})
  },
	handleDescriptionChange: function(e) {
	  this.setState({
	    description: e.target.value
		})
	},
	handleDueDateChange: function(e) {
	  this.setState({
	    dueDate: e.target.value
		})
	},
	handleForm: function(e){
		e.preventDefault();
		var name = this.state.name;
		var description = this.state.description;
		var dueDate = this.state.dueDate;
		this.props.handleSubmit({
			name: name, description: description, dueDate: dueDate
		})
	}
	render: function() {
		return (
		  <div>
		    <form onSubmit={this.handleForm} method="" role="form">
			  <legend>Add New Todo</legend>
			  
			  <div className="form-group">
				<input onChange={this.handleNameChange} value={this.state.name} type="text" className="form-control" placeholder="name">
			  </div>

			  <div className="form-group">
			    <input onChange={this.handleDescriptionChange} value={this.state.description} type="text" className="form-control" placeholder="description">
			  </div>
			  
			  <div className="form-group">
			    <input onChange={this.handleDueDateChange} value={this.state.dueDate} type="text" className="form-control" placeholder="due date">
			  </div>

			  <button type="submit" className="btn btn-primary">Submit</button>
		    </form>
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

	handleSubmit: function() {
		var self = this;
		$.ajax({
		  url: '/api/todo/',
		  method: 'POST',
		  data: todo
		}).done(function(){
		  self.loadTodosFromServer();
		  console.log('posted todo to server!')
	    })
	}

	handleDelete: function(id) {
		var id = id;
		var self = this;
		$.ajax({
		  url: '/api/todo/' + id,
		  method: 'DELETE'
		}).done(function(){
		  console.log('deleted todo');
		  self.loadTodosFromServer();
		})
	},

	componentDidMount: function() {
		this.loadTodosFromServer();
	},
	
	render: function() {
		return (
			<div>
				<h3> Hello World! </h3>
				<TodoList handleDelete={ this.handleDelete } 
				          allMyData={ this.state.todos }/>
				<TodoForm />
			</div>
			)
	}
});

React.render(<App/>, document.getElementById('app'));