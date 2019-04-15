import React, { Component } from 'react';
import axios from 'axios';
import { v4 as randomString } from 'uuid';
import Dropzone from 'react-dropzone';
import { BeatLoader } from 'react-spinners';
import styled from 'styled-components';

const TextArea = styled.textarea`
background: rgb(247,247,247, 0.6);
border-radius: 10px;
border: none;
flexwrap: wrap;
width: 60vw;
margin: 10px
`
const Div = styled.div`
display:flex;
flex-direction: column;
justify-content: center;
align-items: center;
position:realative;
`
const Img = styled.img`
position: relative;
top: 15px;
margin-bottom: 15px;
`
const Button = styled.button`
background: #FC510B;
border-radius: 10px;
border: none;
width: 15vw;
height: 25px;
color: #f7f7f7 
`


class AccountCreation extends Component {
  constructor() {
    super();
    this.state = {
      isUploading: false,
      url: 'http://via.placeholder.com/450x450',
      bio: '',
      name: ''
    };
  }

  getSignedRequest = ([file]) => {
    console.log(file)
    this.setState({ isUploading: true });
    const fileName = `${randomString()}-${file.name.replace(/\s/g, '-')}`;


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
            `Your request for a signed url failed with a status 403. Double check the CORS configuration and bucket policy in the README. You also will want to double check your AWS_ACCESS_KEY_ID and AWS_SECRET_ACCESS_KEY in your .env and ensure that they are the same as the ones that you created in the IAM dashboard. You may need to generate new keys\n${
              err.stack
            }`
          );
        } else {
          alert(`ERROR: ${err.status}\n ${err.stack}`);
        }
      });
  };

  async handleChange(prop, val) {
    await this.setState({
      [prop]: val
    })
  }

  create = async () => {
    let userInfo = {
      bio: this.state.bio,
      profile_pic: this.state.url,
      name: this.state.name
    }
    try {
      let res = await axios.post('/accountcreation', userInfo )
      this.props.history.push('/landing')
    } catch(err) {
      console.log(err)
    }
  }

  render() {
    const { url, isUploading, bio, name } = this.state;
    console.table(this.state)
    return (
      <Div className="AccountCreation">
        <Img src={url} alt="Preview of profile"/>

        

        <Dropzone
          onDropAccepted={this.getSignedRequest}
          style={{
            position: 'relative',
            width: '60vw',
            height: '20vh',
            margin: 10,
            border: 'none',
            borderColor: 'rgb(102, 102, 102)',
            borderRadius: '10px',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            fontSize: 28,
            background: 'rgb(247,247,247, 0.6)',
            
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
        <TextArea placeholder="Please enter your bio here" value={bio} onChange={e => this.handleChange('bio', e.target.value)} ></TextArea>
        <input placeholder="Please enter your first and last name" value={name} onChange={e => this.handleChange('name', e.target.value)} ></input>
        <Button onClick={this.create}>Submit</Button>
      </Div>
    );
  }
}

export default AccountCreation;