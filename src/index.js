import React, { useState } from 'react';
import ReactDOM from 'react-dom/client';
import './index.css'

function App(){
    const [data, setData] = useState([])

    function HandleData(Item){
        return
    }
  return <div>
      <Logo />
      <Form />
      <PackingList />
      <Footer />
  </div>
}
function Logo(){
    return <h1>🌴 FAR AWAY 🧳</h1>
}
function Form(){
    const[quantity, setQuantity] = useState(1)
    
    return <div className='add-form'>
    <h3>What do you need for your 😍 trip?</h3>

    <select>
    {Array.from({ length: 20 }, (_, index) => index + 1). map(v => {
        return <option value={v} key={v}>{v}</option>
    })}
    </select>

    <input placeholder='Item...'></input>

    <button type='submit'>ADD</button>
    

    </div>
}
function PackingList(){
    return <div className='list'>

        <ul>

        </ul>

        <div className='actions'>

            <select>
                <option >SORT BY INPUT NUMBER</option>
                <option>SORT BY PACKED STATUS</option>
                <option>SORT BY DESCRIPTION</option>
            </select>

            <button>CLEAR LIST</button>

        </div>
    </div>
}

// function Footer(){
//     if(){
//     return <div className='stats'>
//         <h3>Start adding something to your packing list 🚀</h3>
//     </div>
//     }
//     else if(){
//           return <div className='stats'>
//             <h3>You have <span>{wrtie something here a variable that relates to the number}</span>, and you already packed <span>{wrtie something here a variable that relates to the number} {`${}%`}</span></h3>
//         </div>
//     }else{
//         return <h3>You got everything, Ready to go ✈</h3>
//     }
// }

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <App />  
);