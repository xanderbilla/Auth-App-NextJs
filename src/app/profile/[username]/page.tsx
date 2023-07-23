export default function UserProfile({params}: any) {
    return (
        <div className="flex flex-col items-center justify-center min-h-screen py-2">
            <h1 className='m-8 text-4xl font-light'>Hey! {params.username}</h1>
            <div className='flex flex-col m-2'>
                <p className='text-xl'></p>
            </div>
        </div>
    )
}