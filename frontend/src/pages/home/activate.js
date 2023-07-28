import Header from "../../components/header";
import { useState, useRef, useEffect } from "react";
import useClickOutSide from "../../helpers/clickOutside";
import LeftHome from "../../components/home/left";
import { useDispatch, useSelector } from "react-redux";
import RightHome from "../../components/home/right";
import Stories from "../../components/home/stories";
import "./style.css";
import CreatePost from "../../components/createPost";
import ActivateForm from "./ActivateForm";
import axios from "axios";
import Cookie from "js-cookie";
import { useNavigate, useParams } from "react-router-dom";


export default function Activate() {
	// const [visible, setVisible] = useState(true);
	// const el = useRef(null);
	// useClickOutSide(el, () => {
	// 	setVisible(false);
	// });
	const dispatch = useDispatch();
    const navigate = useNavigate();
    const { user } = useSelector((user) => ({...user}));
    const {token} = useParams();
    const [success, setSuccess] = useState();
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(true);

    useEffect(()=>{
        activateAccount();
    }, []);
    
    if(user){
        console.log(user);
    }else{
        console.log("elese")
    }
    const activateAccount = async ()=>{
        try{
            setLoading(true);
            const {data} = await axios.post(`${process.env.REACT_APP_BACKEND_URL}/activate`,{token},{
                headers:{
                    Authorization: `Bearer ${user.token}`,
                }
            });

            setSuccess(data.message);
            Cookie.set('user', JSON.stringify({...user, verified: true}));
            dispatch({
                type:'VERIFY', 
                payload: true,
            })
            setTimeout(()=>{
                navigate("/")
            },3000);
            setLoading(false);
        }catch(error){
            console.log(error.response.data);
            setError(error.response.data.message);
            setTimeout(()=>{
                navigate("/")
            },3000);
        }
    }
    
	return (

		<div className="home">
            {
                success && (
                    <ActivateForm
                    type="success"
                    header="Account verification succeded"
                    text={success}
                    loading={loading}
                />
                )
            }
            {
                error && (<ActivateForm
                    type="error"
                    header="Account verification failed"
                    text={error}
                    loading={loading}
                />)
            }
			<Header />
			<LeftHome user={user} />
			<div className="home_middle">
				<Stories />
				<CreatePost user={user} />
			</div>
			{/* {visible && <div className="card" ref={el}></div>} */}
			<RightHome user={user} />
		</div>
	);
}
