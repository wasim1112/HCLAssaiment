import React from 'react';
export default class Login extends React.Component{
constructor() {
  super()
  this.state = {
  username: '',
  password: '',
  isLogined: false
 }
}
handleInputChange = (event) => {
this.setState({
    [event.target.name]: event.target.value
  })
}
submitClick=() =>
{
if((this.state.username=="Annabel_Morissette") &&   (this.state.password=="_Ssi74oq8p7BPVr"))
{
   this.setState({isLogined:true});
}
}
render() {
return (
<div>
 <input type="text" name="username" hint="username" onChange=    {this.handleInputChange} />
<input type="password" name="password" hint="password" onChange={this.handleInputChange} />
<button  name="submit" onClick={this.submitClick}> Submit</button></div>);
}
}