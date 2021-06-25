import React, { useState, useEffect } from 'react'
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
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/swiper.min.css";
import "swiper/components/pagination/pagination.min.css"
import "swiper/components/navigation/navigation.min.css"
import './Dashboard.css'
import './Info.css'

const Dashboard = ({ search, setSearch }) => {
  const [buttonPopup, setbuttonPopup] = useState(false);
  const [value, setValue] = React.useState('Celsius');
  const [image, setImage] = useState('');
  const [values, setValues] = useState(2);
  const [items, setItems] = useState([])
  const [city, setCity] = useState('');



  axios
    .get(`https://api.unsplash.com/search/photos?query=${search}&client_id=IOTOlanQknRvAqEQmNFq_GEBa2C-FiBVnFMgYd1sWVM`)
    .then(res => {

      setImage(res.data.results[0].urls.small)
    })
    .catch(err => {
      console.log(err)
    });


  const handleClick = () => {
    setbuttonPopup(true);
  }


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
        {/* <img className="imgs" src="https://images.unsplash.com/photo-1582510003544-4d00b7f74220?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwyMzY5MTR8MHwxfHNlYXJjaHwxfHxDaGVubmFpfGVufDB8fHx8MTYyNDAyMDk0Mg&ixlib=rb-1.2.1&q=80&w=400" alt="" /> */}
        {/* <h5 className="imgtag">{image.search}</h5>  */}
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
