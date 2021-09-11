import {combineReducers, createStore} from 'redux';
import {connect} from 'react-redux';


// ------------------ initial state --------------------
const initialState = {user: localStorage.getItem('user') && localStorage.getItem('user') != 'undefined' ? JSON.parse(localStorage.getItem('user')) : null, lang: localStorage.getItem('lang') ? localStorage.getItem('lang') : 'en'}

// ------------------ action types --------------------

const SIGN_IN = 'SIGN_IN';
const SIGN_OUT = 'SIGN_OUT';
const TOGGLE_LANG = 'TOGGLE_LANG';

// ------------------ action creators --------------------

const signIn = user => {
    return {
        type: SIGN_IN,
        user: user
    }
}

const signOut = () => {
    return {
        type: SIGN_OUT
    }
}
const toggleLang = () => {
    return {
        type: TOGGLE_LANG
    }
}
// ------------------ reducers --------------------

const userReducer = (user, action) => {
    
    if(user === undefined){
        return null;
    }
    switch(action.type){
        case SIGN_IN:
            localStorage.setItem('user', JSON.stringify(action.user))
            return action.user;
        case SIGN_OUT:
            localStorage.setItem('user', null);
            return null;
        default:
            return user;
    }
}

const langReducer = (lang, action) => {
    if(lang === undefined){
        return initialState.lang;
    }
    switch(action.type){
        case TOGGLE_LANG:
            const html = document.getElementsByTagName('html')[0];
            html.dir = 'ltr';
            localStorage.setItem('lang', 'en');
            window.location.replace('/');
            return 'en';
        default:
            return lang;
    }
}

const reducers = combineReducers({
    user: userReducer,
    lang: langReducer,
});

// ------------------ store --------------------

const store = createStore(reducers, initialState, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__());

// ------------------ connect --------------------

const mapStateToProps = state => {
    return {
        user: state.user,
        lang: state.lang
    }
}

const mapDispatchToProps = dispatch => {
    return {
        signIn: user => dispatch(signIn(user)),
        signOut: () => dispatch(signOut()),
        toggleLang: () => dispatch(toggleLang())
    }
}

const withGlobalState = component => connect(mapStateToProps, mapDispatchToProps)(component);

// ------------------ export --------------------

export {store, withGlobalState}
