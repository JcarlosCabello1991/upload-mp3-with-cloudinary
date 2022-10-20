import logo from './logo.svg';
import './App.css';
import {useState} from 'react'

function App() {

  const [metaData, setMetaData] = useState();
  let file;
  const change = (e) => {
    file = e.target.files[0];
    const reader = new FileReader();
    reader.onloadend = () => {
      // Use a regex to remove data url part
      const base64String = reader?.result
        ?.replace("data:", "")
        .replace(/^.+,/, "");

      setMetaData(base64String);
      // Logs wL2dvYWwgbW9yZ...
    };
    reader.readAsDataURL(file);
  }
  const submit = async(video) => {
    console.log(video);
    const response = await fetch('http://localhost:5000/audio/upload',{
      method:'POST',
      headers:{
        'Content-Type':'application/json; charset=utf-8'
      },
      body:JSON.stringify({audio:video})
    })
    const data = await response.json();
    console.log(data)
  }

  return (
    <div className="App">
      <header className="App-header">
          <input id="song" type="file" accept="raw/mp3" onChange={(e)=>change(e)}/>
          <button onClick={(e) => submit(metaData)}>save</button>        
      </header>
    </div>
  );
}

export default App;
