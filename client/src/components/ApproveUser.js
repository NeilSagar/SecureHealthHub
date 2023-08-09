import Temp from '../Temp';
import UnapprovedList from './UnapprovedList';


export default function ApproveUser() {

    const usertype=JSON.parse(localStorage.getItem("profile_role"));
    const role="Admin";
    const inAccessibleMessage="only accessible to admin";
  return (
    <>
        <br/>
        {usertype===role?
        <>
        <Temp />
        <div className='flex flex-col w-[80%]'>
            <UnapprovedList></UnapprovedList>
        </div>
        </>:
        inAccessibleMessage}
    </>
  )
}
