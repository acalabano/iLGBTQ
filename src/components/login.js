'use strict';
import React, {
  AppRegistry,
  Component,
  Text,
  TextInput,
  View,
  Button
} from 'react-native';

import Header from '../components/header';

import Login from './login';

import Firebase from 'firebase';

let app = new Firebase("YOUR-FIREBASE-APP-URL");

import styles from '../styles/common-styles.js';

export default class signup extends Component {

	constructor(props){
		super(props);

		this.state = {
      loaded: true,
			email: '',
			password: ''
		};
	}

  signup(){

    this.setState({
      loaded: false
    });

    app.createUser({
      'email': this.state.email,
      'password': this.state.password
    }, (error, userData) => {

      if(error){
        switch(error.code){

          case "EMAIL_TAKEN":
            alert("The new user account cannot be created because the email is already in use.");
          break;

          case "INVALID_EMAIL":
            alert("The specified email is not a valid email.");
          break;

          default:
            alert("Error creating user:");
        }

      }else{
        alert('Your account was created!');
      }

      this.setState({
        email: '',
        password: '',
        loaded: true
      });

    });

  }

  goToLogin(){
    this.props.navigator.push({
      component: Login
    });
  }

  render() {
    return (
      <View style={styles.container}>
        <Header text="Signup" loaded={this.state.loaded} />
        <View style={styles.body}>

  		    <TextInput
    		    style={styles.textinput}
    		    onChangeText={(text) => this.setState({email: text})}
    		    value={this.state.email}
            placeholder={"Email Address"}
  		    />
          <TextInput
            style={styles.textinput}
            onChangeText={(text) => this.setState({password: text})}
            value={this.state.password}
            secureTextEntry={true}
            placeholder={"Password"}
          />
          <Button
            text="Signup"
            onPress={this.signup.bind(this)}
          />

          <Button
            text="Got an Account?"
            onPress={this.goToLogin.bind(this)}
          />
        </View>
      </View>
    );
  }
}
