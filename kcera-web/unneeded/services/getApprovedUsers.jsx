const getApprovedUsers = async () => {  
    try {
        const response = await fetch('http://127.0.0.1:8000/api/getResidents');
        const data = await response.json();
        if(!response.ok){
            throw new Error('Failed to fetch data');
        }else {
            // console.log(data.data)
            return {
                resident: Array.isArray(data.data) ? data.data : [] 
                
            }
        }
        
    } catch (e) {
        console.log(e,'failed to fetch data,something wen wrong')
    }
 
    };


    export default getApprovedUsers;