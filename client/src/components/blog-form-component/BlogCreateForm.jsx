import React, { useState } from 'react'
import ClassicEditor from '@ckeditor/ckeditor5-build-classic'
import { CKEditor } from '@ckeditor/ckeditor5-react'

function BlogCreateForm() {

    const [blogData, setBlogdata] = useState({
        title: '',
        author: '',
        content: ''
    })
 
    const hanldeChangeData = (e) => {
        setBlogdata({
            ...blogData,
            [e.target.name]: e.target.value
        })
    }

    const handleCkeditorState = (event, editor) => {
        const data = editor.getData()
        // console.log(data);

        setBlogdata({
            ...blogData,
            content: data
        })
    }

    return (
        <div className='app'>
            <div className="container">
                <h2 className='mt-3'>Create Blog</h2>

				<div className="wrapper">
					<form className="form-group mt-4">
						<div className="form-group mb-3">
							<label className="mb-2">Title</label>
							<input type="text" name="title" placeholder="Enter Title" className="form-control" value={blogData.title} onChange={hanldeChangeData} />
						</div>

						<div className="form-group mb-3">
							<label className="mb-2">Author</label>
							<input type="text" name="author" placeholder="Enter Author Name" className="form-control" value={blogData.author} onChange={hanldeChangeData} />
						</div>

						<div className="form-group mb-3">
							<label className="mb-2">Content</label>

                            <CKEditor
                                editor={ClassicEditor}
                                onReady={editor => {

                                }}
                                onChange={handleCkeditorState}
                                config={
                                    {
                                        ckfinder:{
                                            uploadUrl: 'http://localhost:8002/uploads'
                                        }
                                    }
                                }
                            />
						</div>

						<div className="form-group">
							<input type="submit" name="submit" className="btn btn-primary" />
						</div>
					</form>
				</div>
			</div>	
        </div>
    )
}

export default BlogCreateForm