
const UserProfile = ({params}: {params : {id: string}}) => {
      const {id} = params;
  return (
    <div className="flex justify-center min-h-screen items-center">
      <h1 className="text-4xl">user id: {id}</h1>
    </div>
  )
}

export default UserProfile
