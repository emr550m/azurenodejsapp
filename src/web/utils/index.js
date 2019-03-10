
export function backend(url, backendObject){
    return new Promise(function(resolve,reject){
        fetch(url, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify( backendObject ),
        }).then(response => response.json()).then((result) => {
            resolve(result)
        }).catch((err) => {
            reject(err);
        })
    }); 
}