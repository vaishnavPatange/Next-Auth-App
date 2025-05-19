type userProfile = {
  params: {
    id: String
  }
}

const UserProfile = async ({params}: userProfile) => {
      const {id} = await params;
  return (
    <div className="flex justify-center min-h-screen items-center">
      <h1 className="text-4xl">user id: {id}</h1>
    </div>
  )
}

export default UserProfile
