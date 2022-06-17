import {Outlet} from "react-router-dom";
import Footer from "../../components/Footer/Footer";

const User = () => {
    return (
        <div>
            <Outlet/>
            <Footer/>
        </div>
    )

}

export default User
