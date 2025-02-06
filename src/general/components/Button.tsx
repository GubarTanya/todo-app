import {MouseEventHandler} from 'react';

type ButtonProps = {
    children: string;
    onClick?: MouseEventHandler<HTMLButtonElement>;
};

const Button = ({children, onClick}: ButtonProps) => {
    return (
        <button
            className={`text-gray-100 bg-gray-100 hover:bg-gray-200 focus:ring-4 focus:outline-none focus:ring-gray-100 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:bg-gray-700 dark:hover:bg-gray-600 dark:focus:ring-gray-500 me-2 mb-2`}
            onClick={onClick}
        >
            {children}
        </button>
    );
};

export default Button;