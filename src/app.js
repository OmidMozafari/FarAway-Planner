import { clear } from "@testing-library/user-event/dist/clear"
import { useState } from "react"

function App(){
    
    const[data, setData] = useState([])
    
    const [sortBy, setSortBy] = useState("input")

    function handleData(item){
        setData((previous) => [...previous, item])
    }
    
    function handlePacked(id){
        setData(data.map((obj) => {
            if(obj.id===id){
                return {...obj, packed: !obj.packed}
            }else{
                return obj;
            }
        }))
    }
    
    function onDeleteItem(id){
        setData((prev) => prev.filter((object) => object.id !== id))
    }

    function onClearList(){
        let confirmMessage = window.confirm("do you want to delete all the list?")
        if (confirmMessage){
            setData([])
        }
    }

    function sortItems(items){
        if (sortBy === "input") {
            return items.slice().sort((a, b) => a.id - b.id)
        }

        if (sortBy === "packed") {
            return items.slice().sort((a, b) => Number(a.packed) - Number(b.packed))
        }

        if (sortBy === "description") {
            return items.slice().sort((a, b) =>
                a.description.localeCompare(b.description)
            )
        }

        return items
    }

    return <div className="app">

      <Logo />
      <Form handleData = {handleData} />
      <PackingList 
        data = {data} 
        handlePacked = {handlePacked} 
        onDeleteItem = {onDeleteItem} 
        onClearList = {onClearList} 
        sortItems = {sortItems}
        setSortBy = {setSortBy}
      />
      <Status data={data} />
      
    </div>
}
export default App

function Logo(){
    return <h1>🌴 FAR AWAY 🧳</h1>
}

function Form({ handleData }){

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

function PackingList( {data, handlePacked, onDeleteItem, onClearList, sortItems, setSortBy} ){

    const sortedData = sortItems(data)

    return <div className='list'>

        <ul>
            
          {sortedData.map((item) => {
            return <li key={item.id}>
                <input 
                type="checkbox"
                onClick={() => handlePacked(item.id)}
                />

                <span style={item.packed ? {textDecoration: "line-through"} : {}}>
                    {item.qunatity} {item.description}
                </span>
                <button onClick={()=> onDeleteItem(item.id)}>❌</button>
            </li>
          })}
             
        </ul>

        <div className='actions'>

            <select onChange={(e) => setSortBy(e.target.value)}>
                <option value="input">SORT BY INPUT NUMBER</option>
                <option value="packed">SORT BY PACKED STATUS</option>
                <option value="description">SORT BY DESCRIPTION</option>
            </select>

            <button onClick={onClearList}>CLEAR LIST</button>

        </div>
    </div>
}

function Status({ data }){
    const total = data.length
    const packed = data.filter(item => item.packed).length

    if (total === 0) {
        return <footer className='stats'>
            <p>Start adding something to your packing list 🚀</p>
        </footer>
    }

    if (packed < total) {
        return <footer className='stats'>
            <p>Good, add something more 😉</p>
        </footer>
    }

    return <footer className='stats'>
        <p>You are ready to go ✈️</p>
    </footer>
}