import React, { useState } from 'react';
import Button from '@material-ui/core/Button';

const FileUpload = () => {
  const [file, setFile] = useState('');
  const [filename, setFilename] = useState('Choose File');
  const [uploadedFile, setUploadedFile] = useState({});

  const onChange = e => {
    setFile(e.target.files[0]);
    setFilename(e.target.files[0].name);
  };

  const onSubmit = async e => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('file', file);
    console.log('UPLOADEDD');

    // try {
    //   const res = await axios.post('/upload', formData, {
    //     headers: {
    //       'Content-Type': 'multipart/form-data'
    //     },
    //   });

    //   const { fileName, filePath } = res.data;

    //   setUploadedFile({ fileName, filePath });

    //   setMessage('File Uploaded');
    // } catch (err) {
    //   if (err.response.status === 500) {
    //     setMessage('There was a problem with the server');
    //   } else {
    //     setMessage(err.response.data.msg);
    //   }
    // }
  };

  return (
    <form onSubmit={onSubmit}>
      <input
        accept='image/*'
        style={{ display: 'none' }}
        id='raised-button-file'
        multiple
        type='file'
      />
      <label htmlFor='raised-button-file'>
        <Button variant='contained' color='primary' component='span'>
          Upload
        </Button>
      </label>
    </form>
  );
};

export default FileUpload;
