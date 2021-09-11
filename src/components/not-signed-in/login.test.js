import React from 'react';
import { shallow } from 'enzyme';
import '../../utils/testConfig';
import Login from './login';
describe('Test case for testing login',() =>{
let wrapper;
test('username check',()=>
{
wrapper = shallow(<Login/>);
wrapper.find('input[type="text"]').simulate('change', {target: {name: 'username', value: 'wasimAlmadhagi'}});
expect(wrapper.state('username')).toEqual('wasimAlmadhagi');
})
it('password check',()=>{
wrapper = shallow(<Login/>);
wrapper.find('input[type="password"]').simulate('change', {target: {name: 'password', value: 'admin@1234'}});
expect(wrapper.state('password')).toEqual('admin@1234');
})
it('login check with right data',()=>{
wrapper = shallow(<Login/>);
wrapper.find('input[type="text"]').simulate('change', {target: {name: 'username', value: 'wasimAlmadhagi'}});
wrapper.find('input[type="password"]').simulate('change', {target: {name: 'password', value: 'admin@1234'}});
wrapper.find('button').simulate('click');
expect(wrapper.state('isLogined')).toBe(true);
})
it('login check with wrong data',()=>{
wrapper = shallow(<Login/>);
wrapper.find('input[type="text"]').simulate('change', {target: {name: 'username', value: 'wasimAlmadhagi'}});
wrapper.find('input[type="password"]').simulate('change', {target: {name: 'password', value: 'admin@12344'}});
wrapper.find('button').simulate('click');
expect(wrapper.state('isLogined')).toBe(false);
})
})