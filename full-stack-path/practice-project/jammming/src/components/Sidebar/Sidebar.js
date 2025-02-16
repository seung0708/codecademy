import './Sidebar.css'

export default function Sidebar({open}) {
    return (
        <aside className="sidebar">
          <div className='sidebar-heading'>
            <div className="sidebar-heading_intro">
              <svg data-encore-id="icon" role="img" aria-hidden="true" viewBox="0 0 24 24" fill="#B3B3B3" height="24"><path d="M3 22a1 1 0 0 1-1-1V3a1 1 0 0 1 2 0v18a1 1 0 0 1-1 1zM15.5 2.134A1 1 0 0 0 14 3v18a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V6.464a1 1 0 0 0-.5-.866l-6-3.464zM9 2a1 1 0 0 0-1 1v18a1 1 0 1 0 2 0V3a1 1 0 0 0-1-1z"></path></svg>
              <h3>Your Library</h3>
            </div>
            <button type="button" className="sidebar-button" onClick={open}>
                <svg data-encore-id="icon" role="img" aria-hidden="true" viewBox="0 0 16 16" height="24" fill="#B3B3B3"><path d="M15.25 8a.75.75 0 0 1-.75.75H8.75v5.75a.75.75 0 0 1-1.5 0V8.75H1.5a.75.75 0 0 1 0-1.5h5.75V1.5a.75.75 0 0 1 1.5 0v5.75h5.75a.75.75 0 0 1 .75.75z"></path></svg>
            </button>
           
          </div>
          
        </aside>
    )
}