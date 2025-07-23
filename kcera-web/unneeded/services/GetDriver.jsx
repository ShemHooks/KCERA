const GetDrivers = async () => {
    try{
        const response = await fetch('http://127.0.0.1:8000/api/retrieveDriver');

        const data = await response.json();

        if(!response.ok){
            throw new error('system encountered a problem while fetching the data')
        }

        return{
            drivers: Array.isArray(data.data) ? data.data : []
        }
       
    }catch(e){
        console.log(e)
    }
}

export default GetDrivers;