    import React from "react";
    import './Sidenav.css';
    import HomeIcon from '@mui/icons-material/Home';
    import AddCircleIcon from '@mui/icons-material/AddCircle';
    import PersonIcon from '@mui/icons-material/Person';



    function Sidenav() {

    function navigatePost(){
        window.location.href = '/post'; 
    }

    function navigateProfile(){
        window.location.href = '/profile';
    }

    function navigateHome(){
        window.location.href = '/feed'
    }



        return (
            <div>
                <div className="sidenav">
                
                    <div class="container">
                    <div className="logo">Recipees</div>
                    <div className="gg-bowl"></div>
                    </div>

                        <button className="sidenav-buttons" onClick={navigateHome}>
                            <HomeIcon />
                        </button>
                
                    <button className="sidenav-buttons" onClick={navigatePost}>
                        <AddCircleIcon/>
                    </button>
                    <button className="sidenav-buttons" onClick={navigateProfile}>
                        <PersonIcon/>
                    </button>
                </div>    
                    
                
            </div>
        )
    }



    export default Sidenav;