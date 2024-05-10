import { useAuth } from "../store/auth"

export const Profile = () => {
    const { user, isLoading } = useAuth();
    if (isLoading) {
        return <h1>Loading ...</h1>
    }
    return <>
        <section className="profile-section">
            <div className="profile-title">
                <h1>Account Info</h1>
            </div>
            <div className="container">
                <p>Username: {user.name}</p>
                <p>Email: {user.email}</p>
                <p>Doctor: {user.isDoctor?"Yes":"No"}</p>
            </div>
        </section>
    </>
}