export const getTime=()=>{
    let message=''
    const hour=new Date().getHours()
    message=hour<=9?'早上':hour<=12?'上午':hour<=18?'下午':'晚上'
    return message
}