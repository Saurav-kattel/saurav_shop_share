import React from 'react';

const Tags = ({ tags }: { tags: string[]; }) => {
    return (
        <div className='flex flex-wrap'>{
            tags.map((tag) => {
                return <span className='p-1 bg-white rounded-lg' key={tag}>#{tag}</span>;
            })}</div>
    );
};

export default Tags;