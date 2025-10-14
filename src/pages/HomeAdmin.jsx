import React from 'react'
import NavBarAdmin from '../components/NavBarAdmin/NavBarAdmin'

function HomeAdmin() {
  return (
    <>
        <div className="d-flex" style={{ height: '100vh' }}>
            <NavBarAdmin />
            <div className="flex-grow-1 p-4 bg-light">
                <h2>Panel Principal</h2>
                <p>Aquí va el contenido de tu página.</p>
            </div>
        </div>
    </>
  )
}

export default HomeAdmin