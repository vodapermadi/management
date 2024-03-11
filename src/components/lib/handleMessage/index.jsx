const HandleMessage = ({color,message}) => {
    return(
        <>
            <div className={`w-full py-2 text-end ${color === 'danger' ? 'bg-red-100 border border-red-600' : 'bg-green-300 border border-green-600'} px-4 rounded-lg font-semibold text-gray-900`}>
                {message}
            </div>
        </>
    )
}

export default HandleMessage