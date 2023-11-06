import React from 'react';

const Tags = ({ tags }: { tags: string[]; }) => {
    if (tags) {
        return (
            <div className='flex flex-col gap-1 items-start text-xl text-zinc-700'>
                <span className='text-2xl text-zinc-900'>Tags:</span>
                <div className='flex flex-wrap'>
                    {
                        tags.map((tag) => {
                            return <span className='p-1 bg-white rounded-lg' key={tag}>#{tag}</span>;
                        })}
                </div>

            </div>
        );
    }
    return null;
};

export default Tags;;