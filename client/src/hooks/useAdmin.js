
const useAdmin = () => {
    const admin = localStorage.getItem("role")
    if (admin === "admin") {
        return true
    }
    else {
        return false
    }
}

export default useAdmin
