import React, { Component } from 'react';
import Input from '../../components/UI/Input/Input';
import Button from '../../components/UI/Button/Button';
import classes from './Auth.css';
import * as actions from '../../store/actions/index';
import {connect} from  'react-redux';
import Spinner from '../../components/UI/Spinner/Spinner';
class Auth extends Component {
        state={
            controls:{
                email: {
                    elementType: 'input',
                    elementConfig: {
                        type: 'email',
                        placeholder: 'Your E-Mail'
                    },
                    value: '',
                    validation: {
                        required: true,
                        isEmail: true
                    },
                    valid: false,
                    touched: false
                },
                password:{
                    elementType:'input',
                    elementConfig:{
                        type:'password',
                        placeholder:'Your Password'
                    },
                    value:'',
                    validation:{
                        required:true,
                        minLength: 5,
                        maxLength: 20,
                    },
                    valid:false,
                    touched:false
                }
            },
            formIsValid:false,
            isSignUp:true
        }
        checkValidity(value, rules) {
            let isValid = true;
            if (!rules) {
                return true;
            }           
            if (rules.required) {
                isValid = value.trim() !== '' && isValid;
            }
            if (rules.minLength) {
                isValid = value.length >= rules.minLength && isValid
            }
            if (rules.maxLength) {
                isValid = value.length <= rules.maxLength && isValid
            }
            if (rules.isEmail) {
                const pattern = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;
                isValid = pattern.test(value) && isValid
            }
            return isValid;
        }
        inputChangedHandler = (event, inputIdentifier) => {
            const updatedOrderForm = {
                ...this.state.controls
            };
            const updatedFormElement = { 
                ...updatedOrderForm[inputIdentifier]
            };
            updatedFormElement.value = event.target.value;
            updatedFormElement.valid = this.checkValidity(updatedFormElement.value, updatedFormElement.validation);
            updatedFormElement.touched = true;
            updatedOrderForm[inputIdentifier] = updatedFormElement;
            
            let formIsValid = true;
            for (let inputIdentifier in updatedOrderForm) {
                formIsValid = updatedOrderForm[inputIdentifier].valid && formIsValid;
            }
            this.setState({controls: updatedOrderForm, formIsValid: formIsValid});
        }
submitHandler=(e)=>{
e.preventDefault();
this.props.onAuth(this.state.controls.email.value,this.state.controls.password.value,this.state.isSignUp)
}
switch=()=>{
    this.setState(prevState=>{
       return{ isSignUp:!prevState.isSignUp}
    })
}
    render() {
        const formElementsArray = [];
        for (let key in this.state.controls) {
            formElementsArray.push({
                id: key,
                config: this.state.controls[key]
            });
        }
        let form = (
            <form onSubmit={this.submitHandler}>
                {formElementsArray.map(formElement => (
                    <Input 
                        key={formElement.id}
                        elementType={formElement.config.elementType}
                        elementConfig={formElement.config.elementConfig}
                        value={formElement.config.value}
                        invalid={!formElement.config.valid}
                        shouldValidate={formElement.config.validation}
                        touched={formElement.config.touched}
                        changed={(event) => this.inputChangedHandler(event, formElement.id)} />
                ))}
                <Button btnType="Success"  >Submit</Button>
                </form>)
                if(this.props.loading){
                    form=<Spinner/>
                }
let errorMsg=null;
if(this.props.error){
    errorMsg=(<p>{this.props.error.message}</p>)
}
        return (
            <div className={classes.Auth}>
                {errorMsg}
               {form}
               <Button btnType="Danger"  clicked={this.switch} >{this.state.isSignUp?'SIGN IN':'SIGN UP'}</Button>

            </div>
        );
    }
}
const mapStateToProps=state=>{
    return{
        loading:state.authReducer.loading,
        error:state.authReducer.error
    }
}
const mapDispatchToProps=dispatch=>{
    return{
        onAuth:(email,password,signOption)=>{dispatch(actions.auth(email,password,signOption))}
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(Auth);