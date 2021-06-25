import React, { useState } from 'react'
import Hourly from './Hourly';
import 'bootstrap/dist/css/bootstrap.min.css';
import FormControl from '@material-ui/core/FormControl';
import Info from './Info'
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Radio from '@material-ui/core/Radio';
import axios from 'axios'
import { TiDeleteOutline } from "react-icons/ti";
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import "swiper/components/pagination/pagination.min.css"
import "swiper/components/navigation/navigation.min.css"
import './Dashboard.css'
import './Info.css'
require('dotenv').config()

const Dashboard = ({ search, setSearch }) => {
  const [buttonPopup, setbuttonPopup] = useState(false);
  const [value, setValue] = React.useState('Celsius');
  const [image, setImage] = useState('');
  const [values, setValues] = useState(2);
  const [items, setItems] = useState([])
  const [city, setCity] = useState('');

  let key = process.env.REACT_APP_IMAGES_API_KEY

  axios
    .get(`https://api.unsplash.com/search/photos?query=${search}&client_id=${key}`)
    .then(res => {

      setImage(res.data.results[0].urls.small)
    })
    .catch(err => {
      console.log(err)
    });




  const handleChange = (event) => {
    setValue(event.target.value);
  };
  const handleChanges = (event, newValue) => {
    setValues(newValue);
  };


  // items.push(citynames)
  const cityName = search;

  function deleteItem(id) {
    setItems(prevItems => {
      return prevItems.filter((item, index) => {
        return index !== id;
      });
    });
  }
  const addItem = (e) => {

    setItems(prevItems => {
      return [...prevItems, { image: image, search: search }];

    });
    addName();
    setImage("");

  }

  const addName = () => {
    setCity(prevItems => {
      return [...prevItems, search];
    });
  }

  return (
    <>


      <h3>Weather Report</h3>

      <div className="row">
        <button className="imgs" onClick={addItem}>
          <h6>+</h6>
          <h6>Add City</h6>

        </button>

        {items.map((image, key) => (

          <div className="column">

            <TiDeleteOutline className="imgbtn" size={25} onClick={() => deleteItem(key)}></TiDeleteOutline>
            <img className="img" src={image.image} alt="" />
            <h5 className="imgtag" onClick={() => setSearch(image.search)}>{image.search}</h5>
          </div>
        ))}

      </div>
      <Info search={search} image={image} />
      <h1 style={{ marginTop: '60px', marginLeft: '50px' }}>{cityName}</h1>
      <div className="degree-nav">

        <Tabs
          value={values}
          indicatorColor="primary"
          textColor="primary"
          onChange={handleChanges}
          aria-label="disabled tabs example"
        >
          <Tab label="weekly" onClick={() => setbuttonPopup(false)} />
          <Tab label="Hourly" onClick={() => setbuttonPopup(true)} />

        </Tabs>
        <FormControl component="fieldset">

          <RadioGroup style={{ margin: '-35px 0 0 900px' }} aria-label="gender" name="gender1" value={value} onChange={handleChange} row>
            <FormControlLabel value="Celsius" control={<Radio />} label="C" />
            <FormControlLabel value="Fahrenheit" control={<Radio />} label="F" />
          </RadioGroup>
        </FormControl>


        <Hourly
          search={search}
          trigger={buttonPopup}
          value={value}
        />


      </div>
    </>
  )
}

export default Dashboard
