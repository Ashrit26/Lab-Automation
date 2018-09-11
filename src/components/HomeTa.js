import React, { Component } from 'react'
import firebase from 'firebase'
import * as moment from 'moment'
import { auth } from '../firebase';
import * as routes from '../constants/routes';
import { withRouter } from 'react-router-dom';
import { Link } from 'react-router-dom';


const HomeTa =({ history }) =>
	<div>
		<HomeeTa history = {history} />
	</div>


class HomeeTa extends Component {

   constructor () {
     super()
     this.state = {
     datas: [],
     batas: [],
     options: [],
     start: "false",
     startt: "false"
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

       }student="";
 

  async componentDidMount(){
    /* Create reference to messages in Firebase Database */
    let dbRef = await firebase.database().ref("Approved");
    
    
    await dbRef.on('child_added', snap => {
    	var datas = this.state.datas.slice();
    	datas.push(snap.val());
    	this.setState({
    		datas
    	});
  });
    
   /* */


    console.log(this.state.datas);
    
    this.state.start = "true";
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
    }
console.log(this.options);
    // update the state with the new array of options
    this.setState({ options: this.options });
  }

async handleSubmit(event){
  		
      const dbRef3 = await firebase.database().ref("Issued");
      console.log(this.state.options);
      const NewDate = moment().format('L');
      const returndate = moment().add(15, 'days').calendar(); 
      for(var i=0;i<this.state.datas.length;i++)
      {




          if(this.state.options.includes(this.state.datas[i].uniqueid) === true)
            {
		        const comp = {
               student:  this.state.datas[i].student,
               issueddate: NewDate,
               components: this.state.datas[i].components,
               returnby: returndate,
               uniqueid: this.state.datas[i].uniqueid
             }
                dbRef3.push(comp);
                const query = await firebase.database().ref("Approved").orderByChild("uniqueid").equalTo(this.state.datas[i].uniqueid);
query.once("child_added", function(snapshot) {
  snapshot.ref.remove();
});


            } 
        }
 
      window.location.reload();

       /*   const {
      history,
    } = this.props;

    auth.doSignOut()
      .then(() => {
        history.push(routes.HOMETA);
      })*/
}


 render() {
 	
    return (<div><div>
      {this.state.start === "true" &&
 <div>
    	<table className="w3-table-all w3-centered">
    		<tr>
    			<th>Student Name</th>
    			<th>DateOf Request </th>
    			<th>Components Requested</th>
    			<th>Issue</th>
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

    <Link to='/issued'>Issues</Link>
    </div>


    );
  }

}

export default withRouter(HomeTa);

export {
  HomeeTa,
};
