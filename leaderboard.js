
var ListRow = React.createClass({
  render: function() {
   	var image = <img className="imgUser" src= {this.props.list.img} widht= "50" height = "50"/>;
	var ref = 	"https://www.freecodecamp.com/" + this.props.list.username;

    return (
      <tr>
		  <td>{this.props.pos}</td>
		  <td><a  alt="" href= {ref} >{image}{this.props.list.username}</a></td>
         <td>{this.props.list.alltime}</td>
		 <td>{this.props.list.recent}</td>
		
      </tr>
    );
  }
});

var ListTable = React.createClass({

 handleClick: function(event) {

	  this.props.listTo(event.currentTarget.getAttribute('id')) ;
  },	
	
 render: function() {
   	var rows = [];
    var i = 0;
	var listToDsp =  this.props.CollSelect;	 	
		
	this.props.data.forEach(function(row) {
  		 var item = <ListRow list={row} pos ={i +1} key={i} />;
		rows.push(item);
		i++
    });  
		  	 
    return (		
	
      <table className = "col-md-offset-2" width= "980">
        <thead>
         <tr>
			<th width ="30" >#</th>
			<th width ="350">User Name</th>
            <th width ="300">
				<a  id="ALL" onClick={this.handleClick}>
					All Time Points
				</a>
				{(listToDsp === 'ALL')? '↓' : ''}
			</th>
			<th  width ="300">
				<a id="LAST30" onClick={this.handleClick}>
					Points last 30 days			  
				</a>
				 {(listToDsp === 'LAST30')? '↓' : ''}				  
			</th> 
			
          </tr>
        </thead>
        <tbody>{rows}</tbody>
      </table>
	
    );
 }

});

var Controler = React.createClass ({
	
	getInitialState: function() {
		return {
			listTo: 'ALL',
		    url:"https://fcctop100.herokuapp.com/api/fccusers/top/alltime",
			CollSelect:'ALL',
			data: []
		};
	},
	
 	componentDidMount: function() {
		 this.serverRequest = $.get(this.state.url, function (result) {
			
      		this.setState({
        		data:result
      		});
    	}.bind(this));
			
  	},	
	
	componentWillUnmount: function() {
    	this.serverRequest.abort();
  	},
		 		
	handleChange: function(CollSelection){
			
			if (CollSelection === 'ALL') {
				
				var urlInt  = "https://fcctop100.herokuapp.com/api/fccusers/top/alltime";
				
			} else {

			  	var urlInt  = "https://fcctop100.herokuapp.com/api/fccusers/top/recent"
			}
		
			 this.serverRequest = $.get(urlInt, function (result) {
			
      			this.setState({
				listTo: CollSelection,
				url: urlInt,
				CollSelect: CollSelection,
				data: result
			});
    		}.bind(this));
			

	},
	
	render: function () {
		return (
			<ListTable data={this.state.data} listTo={this.handleChange} CollSelect={this.state.CollSelect} />
		
		);
	}		
});

var LIST = [
	{"username":"Chrono79","img":"https://avatars.githubusercontent.com/u/9571508v=3","alltime":1042,"recent":431,"lastUpdate":"2016-06-28T20:17:57.321Z"},
	{"username":"Masd925","img":"https://avatars.githubusercontent.com/u/9335367?v=3","alltime":1687,"recent":343,"lastUpdate":"2016-06-28T20:16:41.799Z"},
	{"username":"BKinahan","img":"https://avatars.githubusercontent.com/u/15965601?v=3","alltime":1521,"recent":309,"lastUpdate":"2016-06-28T20:16:56.869Z"},
	{"username":"moigithub","img":"https://avatars.githubusercontent.com/u/7305974?v=3","alltime":1203,"recent":282,"lastUpdate":"2016-06-28T20:16:26.739Z"},
	{"username":"anthonygallina1","img":"https://avatars.githubusercontent.com/u/11003055?v=3","alltime":1735,"recent":272,"lastUpdate":"2016-06-28T20:17:11.984Z"},
	{"username":"coymeetsworld","img":"https://avatars.githubusercontent.com/u/7891989?v=3","alltime":877,"recent":244,"lastUpdate":"2016-06-24T18:49:45.428Z"},
	{"username":"dhcodes","img":"https://avatars.githubusercontent.com/u/7917512?v=3","alltime":776,"recent":222,"lastUpdate":"2016-06-24T18:50:14.759Z"},
	{"username":"Krish2704","img":"https://avatars.githubusercontent.com/u/16540354?v=3","alltime":227,"recent":212,"lastUpdate":"2016-06-28T20:29:49.762Z"}
];

var LIST2 = [
	{"username":"Masd925","img":"https://avatars.githubusercontent.com/u/9335367?v=3","alltime":1687,"recent":343,"lastUpdate":"2016-06-28T20:16:41.799Z"},
	{"username":"BKinahan","img":"https://avatars.githubusercontent.com/u/15965601?v=3","alltime":1521,"recent":309,"lastUpdate":"2016-06-28T20:16:56.869Z"},
	{"username":"moigithub","img":"https://avatars.githubusercontent.com/u/7305974?v=3","alltime":1203,"recent":282,"lastUpdate":"2016-06-28T20:16:26.739Z"},
	{"username":"anthonygallina1","img":"https://avatars.githubusercontent.com/u/11003055?v=3","alltime":1735,"recent":272,"lastUpdate":"2016-06-28T20:17:11.984Z"},
	{"username":"coymeetsworld","img":"https://avatars.githubusercontent.com/u/7891989?v=3","alltime":877,"recent":244,"lastUpdate":"2016-06-24T18:49:45.428Z"},
	{"username":"dhcodes","img":"https://avatars.githubusercontent.com/u/7917512?v=3","alltime":776,"recent":222,"lastUpdate":"2016-06-24T18:50:14.759Z"},
	{"username":"Krish2704","img":"https://avatars.githubusercontent.com/u/16540354?v=3","alltime":227,"recent":212,"lastUpdate":"2016-06-28T20:29:49.762Z"}
];
 
ReactDOM.render(
  <Controler/>,
  document.getElementById('container')
);