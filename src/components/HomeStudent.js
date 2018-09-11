import React, { Component } from 'react'
import firebase from 'firebase'
import * as moment from 'moment'
import { auth } from '../firebase';
import * as routes from '../constants/routes';
import { withRouter } from 'react-router-dom';
import randomstring from 'randomstring';

const HomeStudent =({ history }) =>
	<div>
		<HomeeStudent history={history} />
	</div>


class HomeeStudent extends Component {

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

       }student = "";
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
    let dbRef = await firebase.database().ref("Available");
   
    dbRef.on('child_added', snap => {
    	var datas = this.state.datas.slice();
    	datas.push(snap.val());
    	this.setState({
    		datas
    	});
      /* Update React state when message is added at Firebase Database */
      /*let message = { text: snapshot.val(), id: snapshot.key };
      this.setState({ messages: [message].concat(this.state.messages) });*/
    // });console.log(this.state.datas);this.setState({start:"true"});
  });console.log(this.state.datas);this.setState({start:"true"});
}

  onChange(e) {
    // current array of options
console.log(e.target.value);
  }

  async handleSubmit(event){
  		console.log(this.comp);
  		this.state.options = this.comp;
  		console.log(this.state.options);
const yourDate = new Date();
const NewDate = moment().format('LLL');
console.log(NewDate);
const dbRef2 = await firebase.database().ref("Request");
const ran = randomstring.generate();
const rand = "r" + ran;
console.log(rand);
const a = {
	student: this.student,
	requestdate: NewDate,
	components: this.state.options,
  uniqueid: rand
}



dbRef2.push(a);

const fun = this;
for(var i=0;i<this.state.options.length;i++){
  const query = await firebase.database().ref("Available").orderByChild("name").equalTo(this.state.options[i].name);
query.once("child_added", function(snapshot) {
  snapshot.ref.update({ quantity: snapshot.val().quantity - fun.state.options[i].quantity })
});
}



    const {
      history,
    } = this.props;

    auth.doSignOut()
    	.then(() => {
    		history.push(routes.LANDING);
    	})
  }

  comp=[];

  handlequant(e){

    const options = this.state.options;
    let index
    console.log(e.target.name);
          const comps = {"name": e.target.name , "quantity": Number(e.target.value)}
      this.comp.push(comps);
    // check if the check box is checked or unchecked

  }

 render() {
 	
    return (<div>
      {this.state.start === "true" &&
 (<div>
    	<table  className="w3-table-all w3-centered stu">
    		<tr>
    			<td>Name</td>
    			<td>id</td>
    			<td>quantity</td>
    			<td>place</td>
    			<td>quantity req</td>
    		</tr>
    		{this.state.datas.map((data, index) => (
        <tr><td>{data.name}</td><td>{data.id}</td><td>{data.quantity}</td><td>{data.place}</td> 
        <input type="text"  onBlur={this.handlequant.bind(this)} name={data.name} ></input>
</tr>
    ))}</table><div className="w3-center sub"><button type="submit" onClick={this.handleSubmit.bind(this)}>Submit</button></div></div>)

    	
    }</div>


    );
  }

}

export default withRouter(HomeStudent);

export {
  HomeeStudent,
};
