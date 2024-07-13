export const catchAsyncErrors = async(fn: Function)=>{
    try{
        return await fn()
    }catch(err){
        if(err.code == 11000){
            return `${Object.keys(err.keyValue)[0]} is taken`
        }
    
        if(err.message?.toLowerCase().includes("validation")){
            return Object.keys(err.errors).map(field=>err.errors[field].properties?.message)
        }
    }
}