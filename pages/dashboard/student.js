import { useRouter } from 'next/router'
import { useCallback } from 'react'
import { useFormState } from 'react-hook-form';
import SideNav from "../../components/SideNav";
import Nav from "../../components/Nav";


function student_dashboard() {
    const router = useRouter()
    
    return (
        <div className='w-screen'>
            <div className="fixed">
                <SideNav/>
            </div>
            <div className="fixed">
                <Nav/>
            </div>
                <div className='flex'>
        
            <div className='flex-auto w-2/4 h-screen mx-10'>
                <div className="h-10">
                    <p>Welcome, Vivek Kumar</p>
                </div>
                <div className="card dashboard-card" role="listitem" data-region="course-content">
                    
                    <div className="card-body">
                    <img src="/home/vivek/security/react/student_resource_mgt/components/Ballnewypose.svg"/>
                        <h5 className="card-title d-inline">Data Engineering</h5> 
                        <div className="card-text">

                        </div>
                    </div>
                    
                </div>


            </div>

            <div className='flex-auto bg-comp2 w-2/4 h-screen '>
                
            </div>
        </div>
        </div>
        



    )
}

export default student_dashboard
