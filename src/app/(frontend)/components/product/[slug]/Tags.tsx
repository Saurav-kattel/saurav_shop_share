import React from 'react';

const Tags = ({ tags }: { tags: string[]; }) => {
    if (tags) {
        return (
            <div className='flex flex-col gap-3 items-start text-xl text-zinc-700'>
                <div className='flex flex-wrap gap-1'>
                    {
                        tags.map((tag) => {
                            return <span className='m-1 text-rose-700 rounded-lg' key={tag}>#{tag}</span>;
                        })}
                </div>

            </div>
        );
    }
    return null;
};

export default Tags;;