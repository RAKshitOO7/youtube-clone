import React,{useState} from 'react';
import ReactDOM from 'react-dom';
import {faCog} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
const Panel=()=>{
    const [isOpen,setIsOpen]=useState(false);
    const [isRotated,setIsRotated]=useState(false);
    const toggleFunc=()=>{
        setIsOpen(!isOpen);
        setIsRotated(!isRotated);
    };
    return(
        <div className="relative">
            <button onClick={toggleFunc} className={`fixed top-4 right-4 bg-gray-800 text-slate-100 rounded-full transition-transform duration-300 ${isRotated ? 'rotate-90': ''} `}>
                {/*<svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLineCap="round" strokeLineJoin="round" d="M12 8c1.68 0 3 1.32 3 3s-1.32 3-3 3-3-1.32-3-3 1.32-3 3-3zm-5 7l.65-.63a4.978 4.978 0 01-1.24-2.62l-.86-.5.5-.87c.23-.41.52-.8.86-1.24L7 9m5-7h2v2h-2zm9 5h-2v2h2V7zm0 7h-2v2h2v-2zm-5 5h2v2h-2v-2zm-4-9V2h2v2H8zM4 20h2v2H4v-2zm0-5h2v2H4v-2z"/>
                </svg>*/} 
                <FontAwesomeIcon icon={faCog} className="text-xl"/>
            </button>
            <div className={`fixed top-0 right-0 bg-gray-700 w-64 h-full p-5 text-slate-100 transform transition-transform duration-300 ${isOpen? 'translate-x-0': 'translate-x-full'}`}>
             <button onClick={toggleFunc} className="absolute top-4 right-4"> &times;</button>
             <h2 className="mb-4 text-xl">Settings</h2>
             <div className="mb-4">
              <label className="block text-sm">Change Location:</label>
              <select className="mt-1 w-full bg-gray-700 text-white border border-gray-600 rounded">
              <option value="in">India</option>
              <option value="uk">United Kingdom</option>
              <option value="in">United States</option>
              {/* Add more options as needed */}
              </select>
            </div>
            </div>
        </div>
    );
};
export default Panel;