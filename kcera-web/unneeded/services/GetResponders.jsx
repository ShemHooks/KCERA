const GetResponders = async ()=>{

    try{
        const response = await fetch('http://127.0.0.1:8000/api/retrieveResponder');

        const data = await response.json();

        if(!response.ok){
           
             throw new Error('Failed to fetch responders data');
           
        }
        return {
            responders: Array.isArray(data.data) ? data.data : []
        }
    }catch(e){
        
         console.log(e, 'error');
    }
}

export default GetResponders;