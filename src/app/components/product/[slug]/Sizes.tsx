import React from 'react';
type Size = {
    id: string;
    name: string;
    productId: string;
};
const Sizes = ({ size }: { size: Size[]; }) => {
    return (
        <div className='flex gap-1 items-center justify-center'>{size.map((elem) => {
            return <div key={elem.id}>
                <button>{elem.name}</button>
            </div>;
        })}</div>
    );
};

export default Sizes;