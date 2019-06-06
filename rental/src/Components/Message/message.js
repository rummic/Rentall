import React, { Component } from 'react';
import './messages.css';
import NavbarIndex from '../Navbar/indexNav';
import { Breadcrumb } from 'react-bootstrap';
import swal from 'sweetalert';

class message extends Component {
  constructor(props) {
    super(props);
    this.state = {
      messages: [],
      answer: ""
    }
    this.onChange = this.onChange.bind(this);
  }
  onChange(e) {
    this.setState({ [e.target.name]: e.target.value })
  }
  componentWillMount() {
    const token = sessionStorage.getItem("token");
    fetch('https://localhost:44359/api/Messages/' + this.props.match.params.login, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        "Authorization": `bearer ${token}`
      }
    })
      .then(response => response.json())
      .then(responseJSON => {
        if (!responseJSON.hasErrors) {
          this.setState({
            messages: responseJSON.value || []
          })
        }
      })


  }
  sendMessage() {
    const token = sessionStorage.getItem("token");
    fetch('https://localhost:44359/api/Messages', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        "Authorization": `bearer ${token}`
      },
      body: JSON.stringify({
        "recipientLogin": this.props.match.params.login,
        "messageText": this.state.answer
      })
    }).then(response => response.json())
      .then(parseJSON => {
        if (!parseJSON.hasErrors) {
          swal({
            title: "Dobra robota!", text: "Poprawnie wysłano wiadomość!", type:
              "success", icon: "success"
          }).then(function () {
            window.location.reload();
          }
          );
        }
      })
  }

  person(e) {
    const login = sessionStorage.getItem("login");
    if (e.senderLogin === login) {
      return "dialogbox2"
    } else {
      return "dialogbox1"
    }
  }

  nick(e) {
    const login = sessionStorage.getItem("login");
    if (e.senderLogin === login) {
      return "nickname1"
    } else {
      return "nickname"
    }
  }
  componentDidUpdate(){
    this.scrollToBottom();
  }
  
  scrollToBottom() {
    const {scrollBottom} = this.refs;
    scrollBottom.scrollTop = scrollBottom.scrollHeight - scrollBottom.clientHeight;
  }
  render() {
    return (
      <div className="box">
        <NavbarIndex history={this.props.history} />
        <div className="box1">
          <Breadcrumb>
            <Breadcrumb.Item href="/index">RentAll</Breadcrumb.Item>
            <Breadcrumb.Item href="/messages">Wiadomości</Breadcrumb.Item>
            <Breadcrumb.Item active>Konwersacja</Breadcrumb.Item>
          </Breadcrumb>
          <div className="messages" ref={`scrollBottom`}>
            {
              this.state.messages.map((item, i) => (
                <div key={i}>
                  <div className={this.nick(item)}>{
                    item.senderLogin

                  }</div>
                  <div className={this.person(item)}>
                    {item.messageText}
                  </div>

                </div>
              ))
            }
          </div>
          <div className="odpowiedz">
            <input type="text" name="answer" onChange={this.onChange} />
            <button onClick={() => this.sendMessage()}>Wyslij</button>
          </div>
        </div>
      </div>
    );
  }
}


export default message;