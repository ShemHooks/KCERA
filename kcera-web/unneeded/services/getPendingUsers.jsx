const getPendingUsers = async () => {
    try {
        const response = await fetch('http://127.0.0.1:8000/api/getPendingUsers');
        const data = await response.json();
            
        if(response.ok){
            return {
                users: data.data
            }
        } else {
            return {
                error: 'Unable to fetch data.'    
            }
        }        
    } catch(e){
        return {
            error: 'Unable to fetch data.'    
        }
    }
}
export default getPendingUsers;
