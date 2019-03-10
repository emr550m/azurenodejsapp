import store from '../../store'

export function setUserInfo(name,surname,lastlogin){
    store.dispatch({
        type:'UPDATE_USERINFO',
        payload:{
            name,
            surname,
            lastlogin
        }
    });
}
 