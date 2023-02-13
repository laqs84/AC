import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { useEffect, useState } from "react";
import axiosClient from "../axios-client.js";
import Modal from 'react-bootstrap/Modal';
import { VideoRecordie } from 'react-video-recordie';
import { AudioRecorder, useAudioRecorder } from 'react-audio-voice-recorder';
import DatePicker from "react-datepicker";
import Webcam from 'react-webcam'
import "react-datepicker/dist/react-datepicker.css";
function JobForm() {

  const [provincias, setProvincias] = useState([])
  const [cantones, setCantones] = useState([])
  const [distritos, setDistritos] = useState([])
  const [cantonesDisabled, setCantonesDisabled] = useState(true)
  const [distritosDisabled, setDistritoDisabled] = useState(true)
  const [loading, setLoading] = useState(false)
  const [show, setShow] = useState(false);
  const [showPic, setShowPic] = useState(false);
  const [audio, setAudio] = useState()
  const [validated, setValidated] = useState(false);
  const [startDate, setStartDate] = useState(new Date());
  const [email, setEmail] = useState('');
  const [errorEmail, setErrorEmail] = useState(null);
  const videoConstraints = {
    facingMode: "user"
  };

  const [item, setItem] = useState({ oralLevel: "", another: "another" });

  const { oralLevel } = item;

  

  const handleChange = e => {
    e.persist();
    console.log(e.target.value);

    setItem(prevState => ({
      ...prevState,
      oralLevel: e.target.value
    }));
  };

  function isValidEmail(email) {
    return /\S+@\S+\.\S+/.test(email);
  }

  const handleChangeEmail = event => {
    if (!isValidEmail(event.target.value)) {
      setErrorEmail('Email is invalid');
    } else {
      setErrorEmail(null);
    }

    setEmail(event.target.value);
  };

  const recorderControls = useAudioRecorder()

  const addAudioElement = (blob) => {
    console.log(blob)
    const url = URL.createObjectURL(blob);
    const audio = document.createElement("audio");
    audio.src = url;
    audio.controls = true;
    setAudio(audio)
  };

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);


  const handleClosePic = () => setShowPic(false);
  const handleShowPic = () => setShowPic(true);

  const handleSubmit = (event) => {
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
    }

    setValidated(true);
  };

  const getCantones = (provincia) => {
    setCantonesDisabled(true)
    setDistritoDisabled(true)
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
    setDistritoDisabled(true)
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

    <Modal fullscreen show={showPic} onHide={handleClosePic}>
      <Modal.Header closeButton>
        <Modal.Title>Modal heading</Modal.Title>
      </Modal.Header>
      <Modal.Body> 
      <Webcam
    audio={false}
    height={720}
    screenshotFormat="image/jpeg"
    width={1280}
    videoConstraints={videoConstraints}
  >
    {({ getScreenshot }) => (
      <Button
        onClick={() => {
          const imageSrc = getScreenshot()
        }}
      >
        Capture photo
      </Button>
    )}
  </Webcam>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClosePic}>
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

            <Form.Group className="mb-3" controlId="formID">
              <Form.Label>ID</Form.Label>
              <Form.Control type="text" />
            </Form.Group>


            <Form.Group className="mb-3" controlId="formDOB">
              <Form.Label>DOB</Form.Label>
              <DatePicker selected={startDate} onChange={(date) => setStartDate(date)} />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formGender">
              <Form.Label>Gender</Form.Label>
              <Form.Control as="select">
                <option>Select an option</option>
                <option value="1">Male</option>
                <option value="2">Female</option>
              </Form.Control>
            </Form.Group>

            <Form.Group className="mb-3" controlId="formMarStatus">
              <Form.Label>Marital Status</Form.Label>
              <Form.Control as="select">
                <option>Select an option</option>
                <option value="Single">Single</option>
                <option value="Married">Married</option>
                <option value="Cohabitation">Cohabitation</option>
                <option value="Divorced">Divorced</option>
              </Form.Control>
            </Form.Group>


            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Email address</Form.Label>
              <Form.Control value={email} onChange={handleChangeEmail} type="email" placeholder="Enter email" />
              {errorEmail && <h2 style={{color: 'red'}}>{errorEmail}</h2>}
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
                <option>Select an option</option>
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
                <option>Select an option</option>
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
                <option>Select an option</option>
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
              <Button variant="primary" onClick={handleShowPic}>
              Take a photo of yourself
              </Button>
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
              <Form.Check
                value="greater than 60"
                type="radio"
                aria-label="radio oralLevel 1"
                label=" < 60%"
                onChange={handleChange}
                className="checkJobForm"
                checked={oralLevel === "< 60%"}
              />
              <Form.Check
                value="70"
                type="radio"
                aria-label="radio oralLevel 2"
                label=" 70%"
                onChange={handleChange}
                className="checkJobForm"
                checked={oralLevel === "70%"}
              />
              <Form.Check
                value="80"
                type="radio"
                aria-label="radio oralLevel 3"
                label=" 80%"
                onChange={handleChange}
                className="checkJobForm"
                checked={oralLevel === "80%"}
              />
              <Form.Check
                value="90"
                type="radio"
                aria-label="radio oralLevel 4"
                label=" 90%"
                onChange={handleChange}
                className="checkJobForm"
                checked={oralLevel === "90%"}
              />
              <Form.Check
                value="greater than 90"
                type="radio"
                aria-label="radio oralLevel 5"
                label=" < 90%"
                onChange={handleChange}
                className="checkJobForm"
                checked={oralLevel === "< 90%"}
              />

            </Form.Group>

            <Form.Group className="mb-3" controlId="formEngWrite">
              <Form.Label>English Writing Level</Form.Label>
              <Form.Check
                value="greater than 60"
                type="radio"
                aria-label="radio oralLevel 1"
                label=" < 60%"
                onChange={handleChange}
                className="checkJobForm"
                checked={oralLevel === "< 60%"}
              />
              <Form.Check
                value="70"
                type="radio"
                aria-label="radio oralLevel 2"
                label=" 70%"
                onChange={handleChange}
                className="checkJobForm"
                checked={oralLevel === "70%"}
              />
              <Form.Check
                value="80"
                type="radio"
                aria-label="radio oralLevel 3"
                label=" 80%"
                onChange={handleChange}
                className="checkJobForm"
                checked={oralLevel === "80%"}
              />
              <Form.Check
                value="90"
                type="radio"
                aria-label="radio oralLevel 4"
                label=" 90%"
                onChange={handleChange}
                className="checkJobForm"
                checked={oralLevel === "90%"}
              />
              <Form.Check
                value="greater than 90"
                type="radio"
                aria-label="radio oralLevel 5"
                label=" < 90%"
                onChange={handleChange}
                className="checkJobForm"
                checked={oralLevel === "< 90%"}
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formknowledgeLevel">
              <Form.Label>Computer Knowledge</Form.Label>
              <Form.Check
                value="Low"
                type="radio"
                aria-label="radio Knowledge 1"
                label=" Low"
                onChange={handleChange}
                className="checkJobForm"
              />
              <Form.Check
                value="Medium"
                type="radio"
                aria-label="radio Knowledge 2"
                label=" Medium"
                onChange={handleChange}
                className="checkJobForm"

              />
              <Form.Check
                value="High"
                type="radio"
                aria-label="radio Knowledge 3"
                label=" High"
                onChange={handleChange}
                className="checkJobForm"

              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formAptCourses">
              <Form.Label>Aptitudes and Courses</Form.Label>
              <Form.Control as="textarea"
                placeholder=""
                style={{ height: '100px' }} />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formPrevExp">
              <Form.Label>Previous Experience</Form.Label>
              <Form.Check
                label="Customer Service"
                name="experience"
                type="checkbox"
                id="Experience-1"
                className="checkJobForm"
              />
              <Form.Check
                label="Tech Support"
                name="experience"
                type="checkbox"
                id="Experience-2"
                className="checkJobForm"
              />
              <Form.Check
                label="Quality Asurance"
                name="experience"
                type="checkbox"
                id="Experience-3"
                className="checkJobForm"
              />
              <Form.Check
                label="Sales"
                name="experience"
                type="checkbox"
                id="Experience-4"
                className="checkJobForm"
              />
              <Form.Check
                label="Back Office tasks"
                name="experience"
                type="checkbox"
                id="Experience-5"
                className="checkJobForm"
              />
              <Form.Check
                label="None"
                name="experience"
                type="checkbox"
                id="Experience-6"
                className="checkJobForm"
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formPosition">
              <Form.Label>Position</Form.Label>
              <Form.Control as="select">
                <option>Select an option</option>
            <option value="Customer Service">Customer Service</option>
            <option value="Tech Support">Tech Support</option>
            <option value="Sales">Sales</option>
            <option value="QA">QA</option>
            <option value="Virtual Assitant">Virtual Assitant</option>
            <option value="Back Office">Back Office</option>
            <option value="Any">Any</option>
            <option value="None">None</option>
            </Form.Control>
            </Form.Group>

            <Form.Group className="mb-3" controlId="formRelExp">
              <Form.Label>Related Experience</Form.Label>
              <Form.Check
                value="None"
                type="radio"
                aria-label="radio Related Experience 1"
                label=" None"
                onChange={handleChange}
                className="checkJobForm"
              />
              <Form.Check
                value="1-2 years"
                type="radio"
                aria-label="radio Related Experience 2"
                label=" 1-2 years"
                onChange={handleChange}
                className="checkJobForm"

              />
              <Form.Check
                value="3-5 years"
                type="radio"
                aria-label="radio Related Experience 3"
                label=" 3-5 years"
                onChange={handleChange}
                className="checkJobForm"

              />
              <Form.Check
                value="+6 years"
                type="radio"
                aria-label="radio Related Experience 3"
                label=" +6 years"
                onChange={handleChange}
                className="checkJobForm"

              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formSalPret">
              <Form.Label>Salary Pretension</Form.Label>
              <Form.Control type="text" placeholder="What is your salary pretension?" />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicCheckbox">
              <Form.Check
                required
                label="Agree to terms and conditions"
                feedback="You must agree before submitting."
                feedbackType="invalid"
                className="checkJobForm"
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
