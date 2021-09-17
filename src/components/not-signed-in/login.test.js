import React from 'react';
import { shallow } from 'enzyme';
import '../../utils/testConfig';
import Login from './login';
describe('Test case for testing login',() =>{
let wrapper;
test('username check',()=>
{
wrapper = shallow(<Login/>);
wrapper.find('input[type="text"]').simulate('change', {target: {name: 'username', value: 'Annabel_Morissette'}});
expect(wrapper.state('username')).toEqual('Annabel_Morissette');
})
it('password check',()=>{
wrapper = shallow(<Login/>);
wrapper.find('input[type="password"]').simulate('change', {target: {name: 'password', value: '_Ssi74oq8p7BPVr'}});
expect(wrapper.state('password')).toEqual('_Ssi74oq8p7BPVr');
})
it('login check with right data',()=>{
wrapper = shallow(<Login/>);
wrapper.find('input[type="text"]').simulate('change', {target: {name: 'username', value: 'Annabel_Morissette'}});
wrapper.find('input[type="password"]').simulate('change', {target: {name: 'password', value: '_Ssi74oq8p7BPVr'}});
wrapper.find('button').simulate('click');
expect(wrapper.state('isLogined')).toBe(true);
})
it('login check with wrong data',()=>{
wrapper = shallow(<Login/>);
wrapper.find('input[type="text"]').simulate('change', {target: {name: 'username', value: 'Annabel_Morissette'}});
wrapper.find('input[type="password"]').simulate('change', {target: {name: 'password', value: '_Ssi74oq8p7BPVr4'}});
wrapper.find('button').simulate('click');
expect(wrapper.state('isLogined')).toBe(false);
})
})