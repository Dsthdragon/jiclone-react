import React from 'react';

import Header from './../components/Header/header';
import Footer from './../components/Footer/footer';


const Layout = (props) => {
    return (
        <div>
            <div>
                <Header {...props} />
                <div className="">
                    {props.children}
                </div>
                <Footer {...props} />
            </div>
        </div>
    )
}
export default Layout;