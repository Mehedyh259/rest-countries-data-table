
import React from 'react';
import loadingImg from '../assets/loading.gif'
const Loading = () => {
    return (
        <div className='text-center'>
            <img src={loadingImg} height={300} width={300} alt="" />

        </div>
    );
};

export default Loading;