import React,{useState} from 'react'
import Layout from '../../components/Layout/Layout'
import toast from 'react-hot-toast';
import {useNavigate} from 'react-router-dom'
import axios from 'axios'

const Register = () => {
  const[name,setName]=useState('');
  const [email,setEmail] = useState('');
  const [password,setPassword] = useState('');
  const [phone,setPhone] = useState('');
  const navigate=useNavigate();

  const handleSubmit=async (e) =>{
    e.preventDefault();
    try {
        const res=await axios.post(`${process.env.REACT_APP_API}/api/v1/auth/register`,{name,email,password,phone});
        if(res && res.data.success){
            toast.success(res.data.message);
            navigate('/login')
        }
        else{
            toast.error(res.data.message);
        }
    } catch (error) {
        console.log(error)
        toast.error('something went wrong')
    }
  }


  return (
    <Layout title={'Register Now!'}>
        <div className='register'>
            <h1>Register Now!</h1>
            <form onSubmit={handleSubmit}>
  <div className="mb-3">
    <input type="text" value={name} onChange={(e)=> setName(e.target.value)}className="form-control" id="exampleInputName" placeholder='Enter Your Name'required  />
  </div>
  <div className="mb-3">
    
    <input type="email" value={email} onChange={(e)=> setEmail(e.target.value)} className="form-control" id="exampleInputEmail1" placeholder='Enter Your Email' required/>
  </div>
  <div className="mb-3">
    <input type="password" value={password} onChange={(e)=> setPassword(e.target.value)} className="form-control" id="exampleInputPassword1" placeholder='Enter Password' required />
  </div>
  <div className="mb-3">
    <input type="text" value={phone} onChange={(e)=> setPhone(e.target.value)} className="form-control" id="exampleInputNumber" placeholder='Enter Your Number' required/>
  </div>
  <button type="submit"  className="btn btn-primary">Register</button>
</form>

        </div>
        
      
    </Layout>
  );
};

export default Register; 