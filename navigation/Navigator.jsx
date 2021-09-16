import React from 'react';
import {createStackNavigator} from 'react-navigation-stack';
import {createAppContainer} from 'react-navigation';
import Dashboard from '../screens/Dashboard';
import LoginScreen from '../screens/LoginScreen';
import MembersList from '../screens/MembersList';
import MemberRegisterScreen from '../screens/MemberRegisterScreen';
import UpdateMemberScreen from '../screens/UpdateMemberScreen';

const memberStack= createStackNavigator(
    {
        Login : LoginScreen,
        Register:MemberRegisterScreen,
        Dashboard : Dashboard,
        MembersList:MembersList,
        UpdateMember : UpdateMemberScreen,
     },
);



export default createAppContainer(memberStack);