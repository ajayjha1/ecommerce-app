import React from 'react'
import Resizer from 'react-image-file-resizer'
import axios from 'axios'
import { useSelector } from 'react-redux'


export const FileUpload = ({values, setValues, setLoading}) => {
  const {user} = useSelector((state) =>({...state}));
    const fileUploadAndResize = (e) =>{
        console.log(e.target.value)
        // resize
        let files = e.target.files;
        let alluploadedFiles = values.images;
        if(files) {
          setLoading(true);
          for(let i = 0; i < files.length; i++){
            Resizer.imageFileResizer(
              files[i], 
              720, 
              720, 
              'JPEG', 
              100, 
              0, 
              (uri) =>{
              // console.log(uri)
              axios.post(`${process.env.REACT_APP_API}/uploadimages`, {image: uri},{
                headers: {
                  authtoken: user ? user.token : "",
                }
              })
              .then((res)=>{
                console.log('IMAGE UPLOAD RESPONSE DATA', res)
                setLoading(false)
                alluploadedFiles.push(res.data)
                setValues({...values, images: alluploadedFiles});
              })
              .catch((err) => {
                console.log('CLOUDINARY UPLOAD ERR', err.message)
              })
            }, 'base64');
            
          }
        }
        // send back to server to upload to cloudinary
        // set url to images in the parent component- ProductCreate
    }

    const handleImageRemove = (public_id) =>{
      setLoading(true)
      console.log("remove image", public_id);
      axios.post(`${process.env.REACT_APP_API}/removeimage`, {public_id}, {
        headers : {
          authtoken: user ? user.token : "",
        }
      })
      .then((res) =>{
        setLoading(false)
        const {images} = values
        let filteredImages = images.filter((item) =>{
          return item.public_id !==public_id
        })
        setValues({...values, images: filteredImages});
      })
      .catch((err) =>{
        console.log(err.message);
        setLoading(false);
      })
    }
  return (
    <>
    <div className="row mb-3">
  {values.images &&
    values.images.map((image) => (
      <div className="col-auto" key={image.public_id}>
        <div
          className="rounded-circle overflow-hidden"
          style={{ width: "64px", height: "64px" }}
        >
          <img
            className="img-fluid "
            src={image.url}
            alt={image.public_id}
          />
          <button 
          onClick={()=>handleImageRemove(image.public_id)}
  style={{
    position: "absolute",
    top: "0",
    right: "0",
    border: "none",
    background: "red",
    fontSize: "10px",
    cursor: 'pointer'
  }}
>
  X
</button>
        </div>
      </div>
    ))}
</div>
    <div className='row' >
      <label>Choose File</label>
      <input type='file' multiple accept='images/*' onChange={fileUploadAndResize} />
    </div>
    </>
  )
}
