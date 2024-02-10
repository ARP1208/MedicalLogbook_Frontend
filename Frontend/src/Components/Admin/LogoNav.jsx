import React from 'react'

const LogoNav = () => {
    return (
        <section className='bg-blue-900 h-15'>
            <div className="w-100 flex bg-blue-950 relative justify-between">
                <div className="flex items-center p-2">
                    <i class="fa-solid fa-user-doctor fa-2xl p-2" style={{ color: "#ffffff" }}></i>
                    <div className="text-lg font-medium p-3 text-white">Medical Log</div>
                </div>

                <div className="flex items-center p-2">
                    <i className="fa-solid fa-bell fa-xl p-2" style={{ color: "#ffffff" }}></i>
                    <button className='bg-blue-500 text-sm font-medium rounded-md w-auto'>Logout</button>
                </div>
            </div>
        </section>

    )
}

export default LogoNav
