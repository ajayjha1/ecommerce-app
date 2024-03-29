import React from 'react'
import { Button } from 'react-bootstrap'

export const ProductUpdateForm = ({handleSubmit, handleChange, values, setValues, handleCategoryChange, categories, showSub, subOptions, arrayofSubs, setArrayOfSubs }) => {
    const {title, description, price, category, subs, shipping, quantity, images, colors, brands, color, brand} = values
  return (
    <form onSubmit={handleSubmit} >
        {/* {JSON.stringify(values)} */}
                    <div className='form-group' >
                        <label>Title</label>
                        <input type='text' name='title' className='form-control' value={title} onChange={handleChange} />
                    </div>
                    <div className='form-group' >
                        <label>Description</label>
                        <input type='text' name='description' className='form-control' value={description} onChange={handleChange} />
                    </div>
                    <div className='form-group' >
                        <label>Price</label>
                        <input type='number' name='price' className='form-control' value={price} onChange={handleChange} />
                    </div>
                    <div className='form-group' >
                        <label>Quantity</label>
                        <input type='number' name='quantity' className='form-control' value={quantity} onChange={handleChange} />
                    </div>
                    <div className='form-group' >
                        <label>Shipping</label>
                        <select value={shipping==="Yes" ?"Yes" : "No"} name='shipping' className='form-control' onChange={handleChange}>
                            <option value={'No'} >No</option>
                            <option value={'Yes'} >Yes</option>
                        </select>
                    </div>
                    {/* <div className='form-group' >
                        <label>Price</label>
                        <input type='number' name='quantity' className='form-control' value={price} onChange={handleChange} />
                    </div> */}
                    <div className='form-group' >
                        <label>Color</label>
                        <select value={color} name='color' className='form-control' onChange={handleChange}>
                            
                            {colors.map((c)=>(
                                <option key={c} value={c} >{c}</option>
                            ))}
                        </select>
                    </div>
                    <div className='form-group' >
                        <label>Brand</label>
                        <select value={brand} name='brand' className='form-control' onChange={handleChange}>
                            
                            {brands.map((b)=>(
                                <option key={b} value={b} >{b}</option>
                            ))}
                        </select>
                    </div>
                    <div className='form-group' >
                    <label>Category</label>
                    <select value={category} name='category' className="form-control" onChange={(e) => handleCategoryChange(e)} >
                    {category?.name ? <option>{category.name}</option> : <option>Please Select</option>}
                        {
                            
                            categories?.length>0 && categories.map((c) =>(<option key={c._id} value={c._id} >{c.name}</option>))
                        }
                    </select>
                </div>
                { <div className='form-group' >
                    <label>Sub Category</label>
                    <select inputMode='multiple' value={arrayofSubs} name='subs' className="form-control" onChange={(value) => setArrayOfSubs(value)} >
                    
                        {
                            subOptions.length>0 && subOptions.map((s) =>(<option key={s._id} value={s._id} >{s.name}</option>))
                        }
                    </select>
                </div>}
                    <Button onClick={handleSubmit} >Save</Button>
                    
                </form>
  )
}
