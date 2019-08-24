import React from 'react';
function Home() {

  function handleKeyDown(e) {
    if (e.key === 'Enter') {
      window.location.pathname = e.target.value;
    }
  }

  return(
    <div className={'containerCenter'}>
      <div style={{display: 'flex'}}>
        <h1 className={'text-white'} style={{fontWeight: 400}}>dontlist.tk/</h1>
        <input type="text" style={{width: 200, fontSize: 30, fontWeight: 600}} autoFocus={true}
               onKeyDown={e => handleKeyDown(e)}
        />
      </div>
    </div>
  )
}

export default Home;
