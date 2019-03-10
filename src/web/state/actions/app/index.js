import store from '../../store'

export function setPageName(pagename){
    store.dispatch({
        type:'UPDATE_PAGE',
        payload:{
            page:pagename
        }
    });
}

export function setLoader(loader){
    store.dispatch({
        type:'UPDATE_LOADER',
        payload:{
            loading: loader
        }
    });
}

export function setDialog(dialog,dialogMessage){
    store.dispatch({
        type:'UPDATE_DIALOG',
        payload:{
            dialog,
            dialogMessage
        }
    });
}