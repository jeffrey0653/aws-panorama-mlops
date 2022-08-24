import FrameLayout from '../components/FrameLayout'

import React  from 'react';
import { connect } from 'react-redux' 

// import cognitoUtils from '../lib/cognitoUtils'

import {withTranslation} from 'react-i18next'
import axios from 'axios'

const mapStateToProps = state => {
  return { session: state.session ,language: state.lang.language, languageList: state.lang.languageList}
}

const MapDispatchTpProps = (dispatch) => {
  return {
      changeLang: (key)=>dispatch({type: 'change_language',data: key})
  }
}

class  Summary2 extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      iFrameHeight: '0px',
      url: null
    }
  }

  componentWillMount(){
    document.documentElement.style.overflow = "auto";
    document.documentElement.style.height = "auto";
    document.body.style.overflow = "auto";
    document.body.style.height = "auto";
    document.getElementById("root").style.height = "auto";
    // console.log(document.getElementById("root"))
    // console.log(document.getElementsByClassName("MuiBox-root"))

    // const HEADERS = {'Content-Type': 'application/json'};
    // axios({ method: 'GET', url: '/env_kb' , headers: HEADERS}).then(response => {
    //   console.log(response);
    //   if (response.status === 200) {
    //       this.setState({
    //         url:response.data.ESKibana2,
    //       },()=>{
    //         // console.log(this.state)
    //       })
    //   } else {
    //       const result = "Request dashboard error !"
    //       alert(result)
    //   }
    //   // console.log(result)
    // })
    

  }

  componentDidMount(){
    document.documentElement.style.overflow = "hidden";
    document.documentElement.style.height = "100%";
    document.body.style.overflow = "hidden";
    document.body.style.height = "100%";
    document.getElementById("root").style.height = "100%";
    // console.log(document.getElementById("root"))
    // console.log(document.getElementsByClassName("MuiBox-root"))

    // /dashboard

    const url = `/dashboard`
    axios.get(url, {dataType: 'json'}).then(res => {
            if (res.data){
              this.setState({url:res.data.event})
            }
    })


  }

  
  componentWillUnmount(){
  }


  renderComponent(){
    return <div id="father" width="100%">
            <iframe 
              title="kibana01"
              id = "kibana_iframe"
              src={this.state.url}

              style={{width:'100%', height:this.state.iFrameHeight, overflow:'visible'}}
              onLoad={() => {
                  // const obj = ReactDOM.findDOMNode(this);
                  this.setState({
                      "iFrameHeight":  window.innerHeight*0.9 + 'px'
                  });
              }} 
              ref="iframe" 
              width="100%" 
              height={this.state.iFrameHeight} 
              scrolling="yes" 
              frameBorder="0"
            >
            </iframe>
           </div>
  }

  render(){
    const _iframe = this.renderComponent()
    return  <FrameLayout breadcrumb="Summary2" component={_iframe} />
  }
}

export default connect(mapStateToProps,MapDispatchTpProps)(withTranslation()(Summary2));

