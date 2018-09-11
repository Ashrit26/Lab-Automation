import React, { Component } from 'react'
import firebase from 'firebase'
import * as moment from 'moment'
import { auth } from '../firebase';
import * as routes from '../constants/routes';
import { withRouter } from 'react-router-dom';


const Issued =({ history }) =>
	<div>
		<Issuedd history={history} />
	</div>

class Issuedd extends Component {

	constructor(){
		super()
		this.state = {
		datas: [],
		batas:[],
		options: [],
		start: "false"
}
}

options = []

  onChange(e) {
    // current array of options
    this.options = this.state.options
    let index

    // check if the check box is checked or unchecked
    if (e.target.checked) {
      // add the numerical value of the checkbox to options array
      this.options.push(e.target.value)
    } else {
      // or remove the value from the unchecked checkbox from the array
      index = this.options.indexOf(e.target.value)
      this.options.splice(index, 1)
    }
console.log(this.options);
    // update the state with the new array of options
    this.setState({ options: this.options });
  }


  async componentDidMount(){
    /* Create reference to messages in Firebase Database */
    let dbRef = await firebase.database().ref("Issued");
    
    
  	dbRef.on('child_added', snap => {
    	var datas = this.state.datas.slice();
    	datas.push(snap.val());
	this.state.batas.push(snap.val().components);
	console.log(snap.val().components);
this.setState({
  datas
});

});
    console.log(this.state.datas);
    
this.setState({start:"true"});

}

async handleSubmit(event){


 for(var i=0;i<this.state.datas.length;i++)
      {
          if(this.state.options.includes(this.state.datas[i].uniqueid) === true)
            {

for(var j=0;j<this.state.datas[i].components.length;j++){const quan = this.state.datas[i].components[j].quantity;
const query = await firebase.database().ref("Available").orderByChild("name").equalTo(this.state.datas[i].components[j].name);
query.once("child_added", function(snapshot) {
  snapshot.ref.update({ quantity: snapshot.val().quantity + quan })
});
}
                const query1 = await firebase.database().ref("Issued").orderByChild("uniqueid").equalTo(this.state.datas[i].uniqueid);
query1.once("child_added", function(snapshot) {
  snapshot.ref.remove();
});

}
}

          const {
      history,
    } = this.props;

    auth.doSignOut()
      .then(() => {
        history.push(routes.LANDING);
      })

}

render(){
return(<div>{this.state.start === "true" &&
<div>
<table  className="w3-table-all w3-centered">
        <tr>
          <td>Student Name</td>
          <td>DateOf issue </td>
          <td>Components</td>
          <td>Return By</td>
	<td>Accept Return</td>
        </tr>
        {this.state.datas.map((data, index) => (
        <tr>
          <td>{data.student}</td>
          <td>{data.issueddate}</td>
          <td>{data.components.map((component, index) => (<div className="w3-row"><div className="w3-col s9 w3-center">{component.name}</div><div className="w3-col s3 w3-center">{component.quantity}</div></div>))}</td>
          <td>{data.returnby}</td>
	<td><input type="checkbox" value={data.uniqueid} onChange={this.onChange.bind(this)} /></td>
        </tr>
    ))}
      </table>
<div className="w3-center sub"><button type="submit" onClick={this.handleSubmit.bind(this)}>Submit</button></div>
</div>
}</div>
);
}}

export default withRouter(Issued);

export {
  Issuedd,
};
