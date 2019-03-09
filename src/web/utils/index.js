
export function backend(backendObject){
    return new Promise(function(resolve,reject){
        fetch("/api/open/login", {
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