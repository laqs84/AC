import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { useEffect, useState } from "react";
import axiosClient from "../axios-client.js";
import Modal from 'react-bootstrap/Modal';
import { VideoRecordie } from 'react-video-recordie';
import { AudioRecorder, useAudioRecorder } from 'react-audio-voice-recorder';
function JobForm() {

  const [provincias, setProvincias] = useState([])
  const [cantones, setCantones] = useState([])
  const [distritos, setDistritos] = useState([])
  const [cantonesDisabled, setCantonesDisabled] = useState(true)
  const [distritosDisabled, setDistritoDisabled] = useState(true)
  const [loading, setLoading] = useState(false)
  const [show, setShow] = useState(false);
  const [audio, setAudio] = useState()
  const [validated, setValidated] = useState(false);
  const recorderControls = useAudioRecorder()
  const addAudioElement = (blob) => {
    const url = URL.createObjectURL(blob);
    const audio = document.createElement("audio");
    audio.src = url;
    audio.controls = true;
    setAudio(audio)
  };

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const handleSubmit = (event) => {
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
    }

    setValidated(true);
  };

  const getCantones = (provincia) => {
    axiosClient.get(`/cantones/${provincia}`)
      .then(({ data }) => {
        setLoading(false)
        setCantones(data)
        setCantonesDisabled(false)
      })
      .catch(() => {
        setLoading(false)
      })
  }

  const getDistrito = (canton) => {
    axiosClient.get(`/distritos/${canton}`)
      .then(({ data }) => {
        setLoading(false)
        setDistritos(data)
        setDistritoDisabled(false)
      })
      .catch(() => {
        setLoading(false)
      })
  }


  useEffect(() => {
    setLoading(true)
    axiosClient.get(`/localjobform`)
      .then(({ data }) => {
        setLoading(false)
        setProvincias(data)
      })
      .catch(() => {
        setLoading(false)
      })
  }, [])
  return (
    <><Modal fullscreen show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Modal heading</Modal.Title>
      </Modal.Header>
      <Modal.Body> <VideoRecordie /></Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Close
        </Button>

      </Modal.Footer>
    </Modal>
      <div className="job-form animated fadeInDown">
        <div className="form">
          <Form noValidate validated={validated} onSubmit={handleSubmit}>
            <Form.Group className="mb-3" controlId="formFullName">
              <Form.Label>Name</Form.Label>
              <Form.Control type="text" placeholder="Enter your name" />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formGender">
              <Form.Label>Gender</Form.Label>
              <Form.Control type="text" placeholder="Gender:" />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formMarStatus">
              <Form.Label>Marital Status</Form.Label>
              <Form.Control type="text" placeholder="Marital Status:" />
            </Form.Group>


            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Email address</Form.Label>
              <Form.Control type="email" placeholder="Enter email" />
              <Form.Text className="text-muted">
                We'll never share your email with anyone else.
              </Form.Text>
            </Form.Group>

            <Form.Group className="mb-3" controlId="formPhone">
              <Form.Label>Phone number</Form.Label>
              <Form.Control type="phone" placeholder="Enter phone number" />
              <Form.Text className="text-muted">
                We'll never share your phone number with anyone else.
              </Form.Text>
            </Form.Group>

            <Form.Group className="mb-3" controlId="formProvince">
              <Form.Label>Province</Form.Label>
              <Form.Control as="select" onChange={e => {
                getCantones(e.target.value);
              }}>
                <option>Open this select menu</option>
                {provincias.map((option) => {
                  return (
                    <option key={option.codigo_provincia} value={option.codigo_provincia}>
                      {option.nombre_provincia}
                    </option>
                  );
                })}
              </Form.Control>
            </Form.Group>

            <Form.Group className="mb-3" controlId="formCanton">
              <Form.Label>Canton</Form.Label>
              <Form.Control as="select" onChange={e => {
                getDistrito(e.target.value);
              }} disabled={cantonesDisabled}>
                <option>Open this select menu</option>
                {cantones.map((option) => {
                  return (
                    <option key={option.codigo_canton} value={option.codigo_canton}>
                      {option.nombre_canton}
                    </option>
                  );
                })}
              </Form.Control>
            </Form.Group>

            <Form.Group className="mb-3" controlId="formDistrict">
              <Form.Label>District</Form.Label>
              <Form.Control as="select" disabled={distritosDisabled}>
                <option>Open this select menu</option>
                {distritos.map((option) => {
                  return (
                    <option key={option.codigo_distrito} value={option.codigo_distrito}>
                      {option.nombre_distrito}
                    </option>
                  );
                })}
              </Form.Control>
            </Form.Group>

            <Form.Group className="mb-3" controlId="formAddress">
              <Form.Label>Address</Form.Label>
              <Form.Control as="textarea"
          placeholder=""
          style={{ height: '100px' }} />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formPhoto">
              <Form.Label>Photo</Form.Label>
              <Form.Control type="photo" placeholder="Upload a photo of yourself" />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formVideo">
              <Form.Label>Video</Form.Label>
              <Button variant="primary" onClick={handleShow}>
                Upload a short video about yourself
              </Button>
            </Form.Group>

            <Form.Group className="mb-3" controlId="formAudio">
              <Form.Label>Audio</Form.Label>
              <AudioRecorder 
        onRecordingComplete={(blob) => addAudioElement(blob)}
        recorderControls={recorderControls}
      />
      <br></br>
      <Button variant="primary" type='button' onClick={recorderControls.stopRecording}>Stop recording</Button>
            </Form.Group>

            <Form.Group className="mb-3" controlId="formEngOral">
              <Form.Label>English Speaking Level</Form.Label>
              <Form.Control type="text" placeholder="What is your english speaking level?" />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formEngWrite">
              <Form.Label>English Writing Level</Form.Label>
              <Form.Control type="text" placeholder="What is your english writing level?" />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formknowledgeLevel">
              <Form.Label>Computer Knowledge</Form.Label>
              <Form.Control type="text" placeholder="What is your computer knowledge level?" />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formCompKnowledge">
              <Form.Label>Computer Knowledge</Form.Label>
              <Form.Control type="text" placeholder="What is your computer knowledge level?" />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formAptCourses">
              <Form.Label>Aptitudes and Courses</Form.Label>
              <Form.Control type="text" placeholder="Tell us a little about your current aptitudes and courses taken" />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formPrevExp">
              <Form.Label>Previous Experience</Form.Label>
              <Form.Control type="text" placeholder="Tell us about your previous experience" />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formPosition">
              <Form.Label>Position</Form.Label>
              <Form.Control type="text" placeholder="What position are you applying for?" />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formRelExp">
              <Form.Label>Related Experience</Form.Label>
              <Form.Control type="text" placeholder="What experience do you have related to the position?" />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formSalPret">
              <Form.Label>Salary Pretension</Form.Label>
              <Form.Control type="text" placeholder="What is your salary pretension?" />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicPassword">
              <Form.Label>Password</Form.Label>
              <Form.Control type="password" placeholder="Password" />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicCheckbox">
              <Form.Check
                required
                label="Agree to terms and conditions"
                feedback="You must agree before submitting."
                feedbackType="invalid"
              />
            </Form.Group>
            <Button variant="primary" type="submit">
              Submit
            </Button>
          </Form>
        </div>

      </div></>

  );
}

export default JobForm;
