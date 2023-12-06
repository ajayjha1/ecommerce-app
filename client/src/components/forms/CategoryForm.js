import React from 'react'
import { Button } from 'react-bootstrap'

export const CategoryForm = ({name, handleSubmit, setName}) => {
  return (
             <form onSubmit={handleSubmit}>
                <div className='form-group' >
                    <label>Name</label>
                    <input 
                        type='text' 
                        className='form-control' 
                        onChange={(e)=>setName(e.target.value)} 
                        value={name} 
                        autoFocus 
                        required
                    />
                    <Button onClick={handleSubmit} className='btn btn-outlined-primary mt-2' >Save</Button>
                </div>
            </form>
  )
}
