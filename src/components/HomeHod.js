import React, { Component } from 'react'
import firebase from 'firebase'
import * as moment from 'moment'
import { auth } from '../firebase';
import * as routes from '../constants/routes';
import { withRouter } from 'react-router-dom';

const HomeHod =({ history }) =>
	<div>
		<HomeeHod history={history} />
	</div>


class HomeeHod extends Component {

   constructor () {
     super()
     this.state = {
     datas: [],
     options: [],
     start: "false"
          }


var fun = this;
     firebase.auth().onAuthStateChanged(function(user) {
    if (user) {
        console.log('This is the user: ', user.email);
        fun.student = user.email;
    } else {
        // No user is signed in.
        console.log('There is no logged in user');
    }
});

       }
 /* async componentDidMount(){
    /* Create reference to messages in Firebase Database
    const dbRef = await firebase.database().ref("Available");
    const dbData = dbRef.val();
    const dbRef2 = await firebase.database().ref("Available/a1/price");
    const a=2400;
    await dbRef2.set(a);
  }*/

  async componentDidMount(){
    /* Create reference to messages in Firebase Database */
    let dbRef = await firebase.database().ref("Request");
   
    dbRef.on('child_added', snap => {
    	var datas = this.state.datas.slice();
    	datas.push(snap.val());
      	this.setState({
      		datas
      	});
  });console.log(this.state.datas);this.setState({start: "true"});
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

async handleSubmit(event){
  		
      const dbRef3 = await firebase.database().ref("Approved");
      console.log(this.state.options);
      for(var i=0;i<this.state.datas.length;i++)
      {
          if(this.state.options.includes(this.state.datas[i].uniqueid) === true)
            {
                dbRef3.push(this.state.datas[i]);
            }
          else{var fun = this;
            for(var j=0;j<this.state.datas[i].components.length;j++){
              const query = await firebase.database().ref("Available").orderByChild("name").equalTo(this.state.datas[i].components[j].name);
query.once("child_added", function(snapshot) {
  snapshot.ref.update({ quantity: snapshot.val().quantity + fun.state.datas[i].components[j].quantity })
});
          }}
  const query = await firebase.database().ref("Request");
  query.set({});
      }

          const {
      history,
    } = this.props;

    auth.doSignOut()
      .then(() => {
        history.push(routes.LANDING);
      })
}


 render() {
 	
    return (<div>
      {this.state.start === "true" &&
 <div>
    	<table  className="w3-table-all w3-centered">
    		<tr>
    			<td>Student Name</td>
    			<td>DateOf Request </td>
    			<td>Components Requested</td>
    			<td>Approve</td>
    		</tr>
    		{this.state.datas.map((data, index) => (
        <tr>
          <td>{data.student}</td>
          <td>{data.requestdate}</td>
          <td>{data.components.map((component, index) => (<div className="w3-row"><div className="w3-col s9 w3-center">{component.name}</div><div className="w3-col s3 w3-center">{component.quantity}</div></div>))}</td>
          <td><input type="checkbox" value={data.uniqueid} onChange={this.onChange.bind(this)} /></td>
        </tr>
    ))}
      </table>
      <div className="w3-center sub"><button type="submit" onClick={this.handleSubmit.bind(this)}>Submit</button></div>
  </div>

    	
    }</div>


    );
  }

}

export default withRouter(HomeHod);

export {
  HomeeHod,
};
