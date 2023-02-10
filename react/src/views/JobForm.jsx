import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { useEffect, useState } from "react";
import axiosClient from "../axios-client.js";


function JobForm() {

  const [provincias, setProvincias] = useState([])
  const [cantones, setCantones] = useState([])
  const [distritos, setDistritos] = useState([])
  const [cantonesDisabled, setCantonesDisabled] = useState(true)
  const [distritosDisabled, setDistritoDisabled] = useState(true)
  const [loading, setLoading] = useState(false)

  const getCantones  = (provincia) => {
    axiosClient.get(`/cantones/${provincia}`)
        .then(({data}) => {
          setLoading(false)
          setCantones(data)
          setCantonesDisabled(false)
        })
        .catch(() => {
          setLoading(false)
        })
  }

  const getDistrito  = (canton) => {
    axiosClient.get(`/distritos/${canton}`)
        .then(({data}) => {
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
    <div className="job-form animated fadeInDown">
      <div className="form">
        <Form>
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

          <Form.Group className="mb-3" controlId="formCanton">
            <Form.Label>Distrito</Form.Label>
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
            <Form.Control type="text" placeholder="Address:" />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formPhoto">
            <Form.Label>Photo</Form.Label>
            <Form.Control type="photo" placeholder="Upload a photo of yourself" />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formVideo">
            <Form.Label>Video</Form.Label>
            <Form.Control type="video" placeholder="Upload a short video about yourself" />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formAudio">
            <Form.Label>Audio</Form.Label>
            <Form.Control type="audio" placeholder="Upload an audio about yourself" />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formEngOral">
            <Form.Label>English Speaking Level</Form.Label>
            <Form.Control type="text" placeholder="What is your english speaking level?" />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formEngWrite">
            <Form.Label>English Writing Level</Form.Label>
            <Form.Control type="text" placeholder="What is your english writing level?" />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formEngWrite">
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
            <Form.Check type="checkbox" label="Check me out" />
          </Form.Group>
          <Button variant="primary" type="submit">
            Submit
          </Button>
        </Form>
      </div>
    </div>
  );
}

export default JobForm;
