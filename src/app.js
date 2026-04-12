import { useState } from "react"

function App(){

    const[data, setData] = useState([])

    function handleData(item){
        setData((previous) => [...previous, item])
    }

    return <div className="app">

      <Logo />
      <Form handleData = {handleData} />
      <PackingList />
      <Status />
      
    </div>
}
export default App
function Logo(){
    return <h1>🌴 FAR AWAY 🧳</h1>
}
function Form({ handleData }){

    // HERE I FACE A PROBLEM AND THAT IS WHY SHOULD I DESTRUCTURE IT ? LOOK AT THE LINE 24
    
    const [description, setDescription] = useState("")
    const [qunatity, setQuantity] = useState(1)



    function handleSubmit(e){
        e.preventDefault();

        let item = {
            id: Date.now(),
            packed: false,
            description,
            qunatity
        }

        

        
        handleData(item)
        setDescription("")
        setQuantity(1)
        
    }

    function handleDescription(e){
        setDescription(e.target.value);
        
    }
    function handleQuantity(e){
        setQuantity(+e.target.value);
        
    }


    return <div className='add-form'>

    <h3>What do you need for your 😍 trip?</h3>
    
    <select onChange={handleQuantity} value={qunatity}>
        
    {Array.from({ length: 20 }, (_, index) => index + 1). map(v => {
        return <option value={v} key={v}>{v}</option>
    })}

    </select>

    <form onSubmit={handleSubmit}>
        <input placeholder='Item...' onChange={handleDescription} value={description}></input>
        <button type='submit'>ADD</button>
    </form>
    

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

function Status(){
    // if(){
    return <footer className='stats'>
                <p>Start adding something to your packing list 🚀</p>
         </footer>
    // }
    // else if(){
    //       return <div className='stats'>
    //         <h3>You have <span>{wrtie something here a variable that relates to the number}</span>, and you already packed <span>{wrtie something here a variable that relates to the number} {`${}%`}</span></h3>
    //     </div>
    // }else{
    //     return <h3>You got everything, Ready to go ✈</h3>
    // }
}
