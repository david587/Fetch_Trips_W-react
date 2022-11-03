import { useState, useEffect, useRef } from "react"

export const useFetch =(url,_options) =>{
    const [data,setData] =useState(null)
    const [isPending, setIsPending] = useState(false)
    const [error, setError] = useState(null)

    //-use Useref to wrap an object/Array argument
    //-which is a useEffect dependency
    const options = useRef(_options).current

    useEffect(()=>{
        console.log(options);
        const controller = new AbortController()

        //because we create the method inside the hook, we dont have to useCallback
        const fetchData = async () =>{
            setIsPending(true)

            try{
                const res = await fetch(url, {signal: controller.signal})
                if(!res.ok){
                    //if there is not a network error
                    //we got the response.statustext error message in the catch object
                    throw new Error(res.statusText)
                }
                const json = await res.json()
    
                setIsPending(false)
                setData(json)
                setError(null)
            }
            catch(err){
            if(err.name === "AbortError"){
                console.log("the fetch was aborted");
            }
            else{
                setIsPending(false)
                setError("could not fetch the data")
                console.log(err.message);
            }  
            }
           
        }
        fetchData()

        //fires that, when use effect has unmounted event, we can se that in catch
        //abort the updating, wont update the state
        return ()=>{
            controller.abort()
        }
    },[url, options])

    return {data,isPending, error}

}
