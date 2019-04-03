export function PostData(type,userData){

    let url = 'https://localhost:44359/api/Users/';

    return new Promise((resolve,reject)=>{
        fetch(url+type,{
            method:'POST',
            headers : { 
                'Content-Type': 'application/json'
               },
            body: JSON.stringify(userData)
        })
        .then((response)=>response.json())
        .then((responseJson)=>{
            resolve(responseJson);
        })
        .catch((error)=>{
            reject(error);
        });
    });
}