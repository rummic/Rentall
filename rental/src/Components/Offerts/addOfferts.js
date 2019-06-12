import React, { Component } from 'react';
import './addOfferts.css';
import { Breadcrumb } from 'react-bootstrap';
import { Redirect } from 'react-router-dom';
import axios from 'axios';
import NavbarIndex from '../Navbar/indexNav';
import swal from 'sweetalert';

const token = sessionStorage.getItem("token");

const areaEr = RegExp(/^[0-9]*$/);
const levelEr = RegExp(/^[0-9]*$/);
const zipCodeEr = RegExp(/^[0-9]{2}(?:-[0-9]{3})?$/)
const roomCountEr = RegExp(/^[0-9]*$/);
const priceEr = RegExp(/^(\d*([,](?=\d{0,3}))?\d+)+((?!\2)[,]\d\d)?$/)

class addOfferts extends Component {
  constructor(props) {
    super(props);

    this.state = {
      title: "",
      description: "",
      price: "",
      area: 0,
      mapLink: "",
      level: 0,
      roomCount: 0,
      city: "",
      street: "",
      zipCode: "",
      categoryId: 1,
      offerTypeId: 1,
      userLogin: sessionStorage.getItem('login'),
      files: [],
      category: [],
      offerType: [],
      formErrors: {
        titleEr: "",
        descriptionEr: "",
        numberEr: "",
        zipCodeEr: "",
        levelEr: "",
        areaEr: "",
        roomCountEr: "",
        cityEr: "",
        streetEr: "",
        cityStreetEr: "",
        priceEr: ""
      }
    }
    this.onChange = this.onChange.bind(this);
  };

  componentDidMount() {
    fetch('https://localhost:44359/api/Categories')
      .then(response => response.json())
      .then(parseJSON => {
        this.setState({
          category: parseJSON.value
        })
      })

    fetch('https://localhost:44359/api/OfferTypes')
      .then(response => response.json())
      .then(parseJSON => {
        this.setState({
          offerType: parseJSON.value
        })
      })
  }
  onChange(e) {
    this.setState({ [e.target.name]: e.target.value })

    const { name, value } = e.target;
    let formErrors = this.state.formErrors;

    switch (name) {
      case 'title':
        formErrors.titleEr = value.length < 3 && value.length > 0 ? 'Wymagane minimum 3 znaki' : value.length > 50 ? "Tytuł nie może zawierać więcej niż 50 znaków." : "";
        break;
      case 'description':
        formErrors.descriptionEr = value.length < 3 && value.length > 0 ? 'Wymagane minimum 3 znaki' : value.length > 1200 ? "Opis nie może zawierać więcej niż 1200 znaków." : "";
        break;
      case 'zipCode':
        formErrors.zipCodeEr = zipCodeEr.test(value) ? "" : "Błędny kod pocztowy. Format kodu __-___";
        break;
      case 'level':
        formErrors.levelEr = levelEr.test(value) ? "" : "Pole może zawierać tylko cyfry."
        break;
      case 'area':
        formErrors.areaEr = areaEr.test(value) ? "" : "Pole może zawierać tylko cyfry."
        break;
      case 'roomCount':
        formErrors.roomCountEr = roomCountEr.test(value) ? "" : "Pole może zawierać tylko cyfry."
        break;
      case 'city':
        formErrors.cityEr = value.length < 3 && value.length > 0 ? "Pole musi zawierać conajmniej 3 znaki." : ""
        break;
      case 'street':
        formErrors.streetEr = value.length < 3 && value.length > 0 ? "Pole musi zawierać conajmniej 3 znaki." : ""
        break;
      case 'price':
        formErrors.priceEr = priceEr.test(value) ? "" : "Błąd."
        break;
      default:
        break;
    }
    this.setState({ formErrors, [name]: value })
  }

  addFile() {
    const imageCount = 5;
    if (this.state.files.length < imageCount) {
      this.setState({ files: [...this.state.files, ''] });
    }
    if (this.state.files.length === imageCount - 1) {
      document.getElementById("add").style.display = "none";
    }
  }

  handleChange(e, index) {

    this.state.files[index] = e.target.files[0];
    this.setState({ files: this.state.files });

    var preview = document.querySelector(`.image${index}`);
    var file = document.querySelector(`#inputImage${index}`).files[0];
    var reader = new FileReader();

    reader.addEventListener("load", function () {
      preview.src = reader.result;
    }, false);

    if (file) {
      reader.readAsDataURL(file);
    }
  }

  addOffer() {
    fetch('https://localhost:44359/api/Offers', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        "Authorization": `bearer ${token}`
      },
      body: JSON.stringify({
        "title": this.state.title,
        "description": this.state.description,
        "price": this.state.price,
        "area": this.state.area,
        "mapLink": this.state.mapLink,
        "level": this.state.level,
        "roomCount": this.state.roomCount,
        "city": this.state.city,
        "street": this.state.street,
        "zipCode": this.state.zipCode,
        "categoryId": this.state.categoryId,
        "offerTypeId": this.state.offerTypeId,
        "userLogin": sessionStorage.getItem('login')
      })
    }).then(res => res.json())
      .then(data => {
        if (!data.hasErrors) {
          var filesArray = this.state.files;
          for (let i = 0; i < this.state.files.length; i++) {
            let formData = new FormData();
            formData.append('photo', filesArray[i]);
            axios({
              url: 'https://localhost:44359/api/Photos/' + data.value,
              method: 'POST',
              headers: {
                'Content-Type': 'multipart/form-data',
                "Authorization": `bearer ${token}`
              },
              data: formData
            })
          }
          swal("Dobra robota!", "Poprawnie dodano ogłoszenie!", "success");
          this.props.history.push("/index");
        } else {
          alert("Uzupełnij dane")
        }
      })
  }

  render() {
    const { formErrors } = this.state;
    if (!sessionStorage.getItem("token")) {
      return (<Redirect to={'/home'} />)
    }
    return (
      <div className="box">
        <NavbarIndex history={this.props.history} />
        <div className="clearfix"></div>
        <div className="contentbox1">
          <div className="offerts1">
            <Breadcrumb>
              <Breadcrumb.Item href="/index">RentAll</Breadcrumb.Item>
              <Breadcrumb.Item active>Dodaj ofertę</Breadcrumb.Item>
            </Breadcrumb>
            <div className="title">RentAll - dodaj nowe ogłoszenie </div>
            <div className="section1">
              <label>Tytuł</label>
              <input type="text" placeholder="Podaj tytuł" required name="title" onChange={this.onChange} />
              {formErrors.titleEr.length > 0 && (
                <span className="errorMessage">{formErrors.titleEr}</span>
              )}
            </div>
            <div className="clearfix"></div>
            <div className="section1">
              <label>Kategoria</label>
              <select className="arrow" value={this.state.categoryId} name="categoryId" onChange={this.onChange} >
                {
                  this.state.category.map(item => (
                    <option key={item.name} value={item.id}>{item.name}</option>
                  ))
                }
              </select>
            </div>
            <div className="clearfix"></div>
          </div>
          <div className="offerts1">
            <div className="subtitle">Podstawowe informacje</div>
            <div className="subsection">
              <label>Rodzaj ogłoszenia</label>
              <div>
                <select name="offerTypeId" value={this.state.offerTypeId} onChange={this.onChange} >
                  {
                    this.state.offerType.map(item => (
                      <option key={item.type} value={item.id}>{item.type}</option>
                    ))
                  }
                </select>
              </div>
            </div>
            <div className="subsection">
              <label>Powierzchnia</label>
              <div>
                <input type="number" required name="area" onChange={this.onChange} />
                {formErrors.areaEr.length > 0 && (
                  <span className="errorMessage">{formErrors.areaEr}</span>
                )}
              </div>
            </div>
            <div className="subsection">
              <label>Piętro</label>
              <div>
                <input type="number" name="level" onChange={this.onChange} />
              </div>
              {formErrors.levelEr.length > 0 && (
                <span className="errorMessage">{formErrors.levelEr}</span>
              )}
            </div>
            <div className="clearfix"></div>
            <div className="subsection">
              <label>Liczba pokoi</label>
              <div>
                <input type="number" name="roomCount" onChange={this.onChange} />
              </div>
              {formErrors.roomCountEr.length > 0 && (
                <span className="errorMessage">{formErrors.roomCountEr}</span>
              )}
            </div>
            <div className="subsection">
              <label>Cena</label>
              <div>
                <input type="text" name="price" required onChange={this.onChange} />
              </div>
              {formErrors.priceEr.length > 0 && (
                <span className="errorMessage">{formErrors.priceEr}</span>
              )}
            </div>
            <div className="text">
              <label>Opis</label>
              <div>
                <textarea rows="8" name="description" required onChange={this.onChange} ></textarea>
              </div>
              {formErrors.descriptionEr.length > 0 && (
                <span className="errorMessage">{formErrors.descriptionEr}</span>
              )}
            </div>
            <div className="clearfix"></div>
          </div>
          <div className="offerts1">
            <div className="subtitle">Lokalizacja</div>
            <div className="subsection">
              <label>Miejscowosc</label>
              <div>
                <input type="text" name="city" required onChange={this.onChange} />
              </div>
              {formErrors.cityEr.length > 0 && (
                <span className="errorMessage">{formErrors.cityEr}</span>
              )}
            </div>
            <div className="subsection">
              <label>Ulica</label>
              <div>
                <input type="text" name="street" onChange={this.onChange} />
              </div>
              {formErrors.streetEr.length > 0 && (
                <span className="errorMessage">{formErrors.streetEr}</span>
              )}
            </div>
            <div className="subsection">
              <label>Kod pocztowy</label>
              <div>
                <input type="text" name="zipCode" required onChange={this.onChange} />
              </div>
              {formErrors.zipCodeEr.length > 0 && (
                <span className="errorMessage">{formErrors.zipCodeEr}</span>
              )}
            </div>
            <div className="clearfix"></div>
          </div>
          <div className="offerts1">
            <div className="subtitle">Dodaj zdjęcia</div>
            <div className="fotoofert">
              {
                this.state.files.map((file, index) => {
                  return (
                    <div key={index} className="addImage">
                      <label className="btn btn-primary butadd">Wybierz&hellip;
                      <input className="inputImage" id={"inputImage" + index} type="file" name="photo" onChange={(e) => this.handleChange(e, index)} value={this.state.file} />
                      </label>
                      <img src="https://screenshotlayer.com/images/assets/placeholder.png" className={"image" + index} id="imaddof" height="100"alt="foto" ></img>
                    </div>
                  )
                })
              }
              <div className="addButton">
                <button type="button" id="add" onClick={(e) => this.addFile(e)} className="btn btn-success btn-number plusbut" data-type="plus" data-field="quant[2]">
                  <span className="glyphicon glyphicon-plus"></span>
                </button>
              </div>
            </div>
            <div id="errors"></div>
            <div className="but"><button onClick={this.addOffer.bind(this)}>Dodaj</button></div>
            <div className="clearfix"></div>
          </div>
        </div>
      </div>

    );
  }
}
export default addOfferts;