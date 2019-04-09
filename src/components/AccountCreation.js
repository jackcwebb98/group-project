import React, { Component } from 'react';
import axios from 'axios';
import { v4 as randomString } from 'uuid';
import Dropzone from 'react-dropzone';
import { BeatLoader } from 'react-spinners';

class AccountCreation extends Component {
  constructor() {
    super();
    this.state = {
      isUploading: false,
      url: 'http://via.placeholder.com/450x450',
      bio: ''
    };
  }

  getSignedRequest = ([file]) => {
    console.log(file)
    this.setState({ isUploading: true });
    const fileName = `${randomString()}-${file.name.replace(/\s/g, '-')}`;
    console.log('HELLO!!!!!!!!!!!!!!!!!');


    axios
      .get('/api/sign-s3', {
        params: {
          'file-name': fileName,
          'file-type': file.type,
        },
      })
      .then(response => {
        const { signedRequest, url } = response.data;
        this.uploadFile(file, signedRequest, url);
      })
      .catch(err => {
        console.log(err);
      });
  };

  uploadFile = (file, signedRequest, url) => {
    const options = {
      headers: {
        'Content-Type': file.type,
      },      
    };

    

    axios
      .put(signedRequest, file, options)
      .then(response => {
        this.setState({ isUploading: false, url });
      })
      .catch(err => {
        this.setState({
          isUploading: false,
        });
        if (err.response.status === 403) {
          alert(
            `Your request for a signed URL failed with a status 403. Double check the CORS configuration and bucket policy in the README. You also will want to double check your AWS_ACCESS_KEY_ID and AWS_SECRET_ACCESS_KEY in your .env and ensure that they are the same as the ones that you created in the IAM dashboard. You may need to generate new keys\n${
              err.stack
            }`
          );
        } else {
          alert(`ERROR: ${err.status}\n ${err.stack}`);
        }
      });
  };

  render() {
    const { url, isUploading } = this.state;
    return (
      <div className="AccountCreation">
        <h1>Upload</h1>
        <h1>{url}</h1>
        <img src={url} alt="" width="450px" />

        

        <Dropzone
          onDropAccepted={this.getSignedRequest}
          style={{
            position: 'relative',
            width: 200,
            height: 200,
            borderWidth: 7,
            marginTop: 100,
            borderColor: 'rgb(102, 102, 102)',
            borderStyle: 'dashed',
            borderRadius: 5,
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            fontSize: 28,
          }}
          accept="image/*"
          multiple={false}
        >
          {({getRootProps, getInputProps}) => (
            <section>
                <div>
                  {isUploading 
                  ? 
                  <BeatLoader style={{}}/> 
                  :
                  <p>Drag 'n' drop some files here, or click to select files</p>}
                </div>
            </section>
          )}
        </Dropzone>
        <textarea value="{bio}" onchange={e => this.handleChange('bio', e.target.value)} name="Bio" id="" cols="30" rows="10" placeholder="Enter your bio here." maxLength="140"></textarea>
        <button type='submit' id='submit'>Submit</button>
      </div>
    );
  }
}

export default AccountCreation;
