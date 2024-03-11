import { useUser } from "@clerk/nextjs"

export const getUser = () => {
    const {user,isLoaded} = useUser()
    if(isLoaded){
        return {
            username:user.username,
            id_user:user.id
        }
    }else{
        return {}
    }
}