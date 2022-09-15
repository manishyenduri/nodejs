import React, { Component, useState } from 'react';
import HorizontalBarLogin from '../Components/HorizontalBarForLogin';
import VerticalBar from '../Components/VerticalBar';
import {FiHome} from 'react-icons/fi';
import {CgFormatSlash} from 'react-icons/cg';
// import { useHistory } from 'react-router';
import dashboardIcon from '../../Assests/icon/Group 450.svg';
import cmpProfileIcon from '../../Assests/icon/Icon metro-profile.svg';
import leadsIcon from '../../Assests/icon/Icon awesome-wpforms.svg';
import ordersIcon from '../../Assests/icon/Icon awesome-book-reader.svg';
import mastersIcon from '../../Assests/icon/Group 507.svg';
import insCompanyIcon from '../../Assests/icon/Group 459.svg';
import settingIcon from '../../Assests/icon/Group 460.svg';
import orderInfoIcon from '../../Assests/icon/Icon awesome-id-badge.svg';
import termsheetIcon from '../../Assests/icon/Group 517.svg';
import docIcon from '../../Assests/icon/Group 518.svg';
import vendorIcon from '../../Assests/icon/noun_person_2388246.svg'
import orderModuleIcon from '../../Assests/icon/noun_module_2409451.svg';
import marginMoneyIcon from '../../Assests/icon/Path 129.svg';
import loadingTransitIcon from '../../Assests/icon/noun_transit_2952749.svg';
import agreemenLcIcon from '../../Assests/icon2/loan_agreement.svg';
import clearanceIcon from '../../Assests/icon/noun_Customs Clearance_3263508.svg';
import credit_queue_icon from '../../Assests/icon2/credit_queue.svg';
import review_queue_icon from '../../Assests/icon2/review_queue_icon.svg';
import qualityIcon from '../../Assests/icon2/Quality queue.svg';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { setRoutingName } from '../../store/Admin/action';

class LoginLayout extends Component{
    // const history = useHistory();

    componentDidUpdate=(prev)=>{
        if(prev.route_title!=this.props.route_title)
        {
            if(this.props.route_title!=""){
                this.handleRoutingTitleRoot(this.props.route_title);
            }
        }
    }

    highlightedIconColor="invert(61%) sepia(68%) saturate(6219%) hue-rotate(192deg) brightness(96%) contrast(81%)";
    unhighlightedIcon="none";

    switchDrawerOn=(e)=>{
        e.preventDefault();
        console.log("Working fine..");
        // this.setState({...this.state, openDrawer:true});
        document.querySelector('verticalBarID').classList.remove='verticalBar';
        document.querySelector('verticalBarID').classList.className ='activeVerticalBar';
    }
 switchDrawerOff=(e)=>{
        e.preventDefault();
        console.log("Working fine..");
        // this.setState({...this.state, openDrawer:false});
        document.querySelector('verticalBarID').classList.remove='activeVerticalBar';
        document.querySelector('verticalBarID').classList.className ='verticalBar';
    }
    constructor(props){
        super(props);
        this.state= {
            menu:[
        {title:'DASHBOARD',id:'dash', showHighlight:true, routingName:'DASHBOARD', colorClass:'colorhover', highIconClass:this.highlightedIconColor,submenu:[], routeLink:'/', icon:dashboardIcon},
        // {title:'COMPANY PROFILE',id:'cp',routingName:'Company Profile',submenu:[], colorClass:'colorUnhover', routeLink:null, icon:cmpProfileIcon},
        {title:'LEADS',id:'leads', showHighlight:false, routingName:'LEADS', colorClass:'colorUnhover', highIconClass:this.unhighlightedIcon,submenu:[
            {title:'REVIEW QUEUE',id:'rw', showHighlight:false, routeLink:'/admin/reviewQueue', highIconClass:this.unhighlightedIcon, routingName:'LEADS  /  REVIEW QUEUE', colorClass:'colorUnhover',icon:review_queue_icon,submenu2:null},
            {title:'QUALITY QUEUE',id:'rw', showHighlight:false, routeLink:'/admin/reviewQueue', highIconClass:this.unhighlightedIcon, routingName:'LEADS  /  REVIEW QUEUE', colorClass:'colorUnhover',icon:qualityIcon,submenu2:null},
            {title:'CREDIT QUEUE',id:'cdq', showHighlight:false, routeLink:'/admin/creditQueue', highIconClass:this.unhighlightedIcon, routingName:'LEADS  /  CREDIT QUEUE', colorClass:'colorUnhover',icon:credit_queue_icon,submenu2:null}], routeLink:"/admin/leads", icon:leadsIcon},
        {title:'TERMSHEETS',id:'termst', showHighlight:false, routingName:'TERMSHEETS', colorClass:'colorhover', highIconClass:this.highlightedIconColor,submenu:[], routeLink:'/', icon:termsheetIcon},
       {title:'ORDERS',id:'ord',showHighlight:false,  highIconClass:this.unhighlightedIcon, submenu:[
            {title:"ORDER MODULE",id:'ordMod', showHighlight:false, highIconClass:this.unhighlightedIcon,
            submenu2:[
                {title:'ORDER INFO',id:'ordInfo',showHighlight:false,  highIconClass:this.unhighlightedIcon, routingName:'Order Info', routeLink:null, colorClass:'colorUnhover', icon:orderInfoIcon},
                {title:'TERMSHEET',id:'termst',showHighlight:false,  highIconClass:this.unhighlightedIcon, routingName:'Termsheet',routeLink:'', colorClass:'colorUnhover', icon:termsheetIcon},
                {title:'MARGIN MONEY',id:'mm',showHighlight:false,  highIconClass:this.unhighlightedIcon, routingName:'Margin Money',routeLink:'', colorClass:'colorUnhover', icon:marginMoneyIcon},
                {title:'DOCUMENT COLLECTION',id:'dc',showHighlight:false,  highIconClass:this.unhighlightedIcon, routingName:'Document Collection', routeLink:'', colorClass:'colorUnhover', icon:docIcon}
        ], icon:orderModuleIcon},
        {title:'AGREEMENT & LC MODULE',id:'a_lc', showHighlight:false,  highIconClass:this.unhighlightedIcon,routingName:'Agreement & LC Module', submenu:[], routeLink:'', colorClass:'colorUnhover', icon:agreemenLcIcon},
        {title:'LOADING ,TRANSIT & UNLOADING',id:'ltu',showHighlight:false,  highIconClass:this.unhighlightedIcon,submenu:[], routingName:'Loading, Transit & Unloading',routeLink:'', colorClass:'colorUnhover', icon:loadingTransitIcon},
        {title:'CUSTOMER, CLEARNCE & WAREHOUSE',id:'ccw',showHighlight:false,  highIconClass:this.unhighlightedIcon,submenu:[], routingName:'Customer, Clearnce & Warehouse',routeLink:'', colorClass:'colorUnhover', icon:clearanceIcon},
    ], icon:ordersIcon, routeLink:null},
        // {title:'AGREEMENT & LC MODULE',id:'a_lc', highIconClass:this.unhighlightedIcon,routingName:'Agreement & LC Module', submenu:[], routeLink:'', colorClass:'colorUnhover', icon:agreemenLcIcon},
        // {title:'LOADING ,TRANSIT & UNLOADING',id:'ltu', highIconClass:this.unhighlightedIcon,submenu:[], routingName:'Loading, Transit & Unloading',routeLink:'', colorClass:'colorUnhover', icon:loadingTransitIcon},
        // {title:'CUSTOMER, CLEARNCE & WAREHOUSE',id:'ccw', highIconClass:this.unhighlightedIcon,submenu:[], routingName:'Customer, Clearnce & Warehouse',routeLink:'', colorClass:'colorUnhover', icon:clearanceIcon},
        {title:'MASTERS',id:'ms',routingName:'MASTERS', showHighlight:false, highIconClass:this.unhighlightedIcon,submenu:[
            {title:'USERS',id:'us',showHighlight:false,  highIconClass:this.unhighlightedIcon, routeLink:'/admin/users', routingName:'MASTERS / USERS', colorClass:'colorUnhover',icon:mastersIcon,submenu2:null},
            {title:'USER ROLES',id:'ur',showHighlight:false,  highIconClass:this.unhighlightedIcon, routeLink:'/admin/user-roles-list', routingName:'MASTERS / USER ROLES', colorClass:'colorUnhover',icon:mastersIcon,submenu2:null},
            {title:'VENDORS',id:'ven', showHighlight:false, highIconClass:this.unhighlightedIcon, routeLink:'', routingName:'MASTERS / VENDORS', colorClass:'colorUnhover',icon:vendorIcon,submenu2:null},
            {title:'INSURANCE COMPANY',id:'ins', showHighlight:false, highIconClass:this.unhighlightedIcon, routingName:'MASTERS / INSURANCE COMPANY',routeLink:'', colorClass:'colorUnhover', icon:insCompanyIcon,submenu2:null}
        ], icon:mastersIcon, routeLink:null},
        {title:'SETTINGS',id:'settings', showHighlight:false, highIconClass:this.unhighlightedIcon,submenu:[], routingName:'Settings',routeLink:'', colorClass:'colorUnhover', icon:settingIcon}
    ],
    routeTitle:'Dashboard',
    currentRoute:[0],
    id:'',
    }
    }
    // const [routeTitle,setRouteTitle] = useState('');


    handleRoutingTitleRoot(name){
        this.setState({...this.state,routeTitle:name});
    }

    navigator1=(url,title,i1,id)=>{
        if(url==null)
            return;
        if(url=="")
            return;
        var temp = this.state;
        if(temp.currentRoute.length==1)
          {  temp.menu[temp.currentRoute[0]].showHighlight=false;
            // temp.menu[temp.currentRoute[0]].highIconClass=this.unhighlightedIcon;
    }
        if(temp.currentRoute.length==2)
  {          temp.menu[temp.currentRoute[0]].submenu[temp.currentRoute[1]].showHighlight=false;
            // temp.menu[temp.currentRoute[0]].submenu[temp.currentRoute[1]].highIconClass=this.unhighlightedIcon;
} 
        if(temp.currentRoute.length==3)
       {     temp.menu[temp.currentRoute[0]].submenu[temp.currentRoute[1]].submenu2[temp.currentRoute[2]].showHighlight=false;
            // temp.menu[temp.currentRoute[0]].submenu[temp.currentRoute[1]].submenu2[temp.currentRoute[2]].highIconClass=this.unhighlightedIcon;
}
        temp.menu[i1].showHighlight=true; 
        // temp.menu[i1].highIconClass=this.highlightedIconColor;
        temp.routeTitle=title;
        this.props.setRoutingName(title);
        
        temp.id=id;
        // document.getElementById(id).style.fill="red";
        // console.log("-- ", document.getElementById(id))
        temp.currentRoute=[i1];
        this.setState(temp)
        this.props.history.push(url);
    }

    navigator2=(url,title,i1,i2,id)=>{
        if(url==null)
            return;
            if(url=="")
                return;

        var temp = this.state;
        if(temp.currentRoute.length==1)
        {    temp.menu[temp.currentRoute[0]].showHighlight=false;
            // temp.menu[temp.currentRoute[0]].highIconClass=this.unhighlightedIcon;
    }
        if(temp.currentRoute.length==2)
         {   temp.menu[temp.currentRoute[0]].submenu[temp.currentRoute[1]].showHighlight=false;
            // temp.menu[temp.currentRoute[0]].submenu[temp.currentRoute[1]].highIconClass=this.unhighlightedIcon;
}  
        if(temp.currentRoute.length==3)
         {   temp.menu[temp.currentRoute[0]].submenu[temp.currentRoute[1]].submenu2[temp.currentRoute[2]].showHighlight=false;
            // temp.menu[temp.currentRoute[0]].submenu[temp.currentRoute[1]].submenu2[temp.currentRoute[2]].highIconClass=this.unhighlightedIcon;
}
        temp.menu[i1].submenu[i2].showHighlight=true;
        // temp.menu[i1].submenu[i2].highIconClass=this.highlightedIconColor;
        temp.routeTitle=title;
        this.props.setRoutingName(title);
        temp.currentRoute=[i1,i2];
        this.setState(temp)
        this.props.history.push(url);
    }

    navigator3=(url,title,i1,i2,i3,id)=>{
        if(url==null)
            return;
            if(url=="")
                return;

        var temp = this.state;
        // temp

        if(temp.currentRoute.length==1)
          {  temp.menu[temp.currentRoute[0]].showHighlight=false;
            // temp.menu[temp.currentRoute[0]].highIconClass=this.unhighlightedIcon;
    }
        if(temp.currentRoute.length==2)
         {   temp.menu[temp.currentRoute[0]].submenu[temp.currentRoute[1]].showHighlight=false;
            // temp.menu[temp.currentRoute[0]].submenu[temp.currentRoute[1]].highIconClass=this.unhighlightedIcon;
}  
        if(temp.currentRoute.length==3)
         {   temp.menu[temp.currentRoute[0]].submenu[temp.currentRoute[1]].submenu2[temp.currentRoute[2]].showHighlight=false;
            // temp.menu[temp.currentRoute[0]].submenu[temp.currentRoute[1]].submenu2[temp.currentRoute[2]].highIconClass=this.unhighlightedIcon;
}
        temp.menu[i1].submenu[i2].submenu2[i3].showHighlight=true;
        // temp.menu[i1].submenu[i2].submenu2[i3].highIconClass=this.highlightedIconColor;
        temp.routeTitle=title;
        this.props.setRoutingName(title);
        temp.currentRoute=[i1,i2,i3];
        this.setState(temp)
        this.props.history.push(url);
    }

 
   render() {
   
    return <div className="rootAdmin">
               <HorizontalBarLogin history={this.props.history} switchDrawerOn={this.switchDrawerOn} switchDrawerOff={this.switchDrawerOff} />
                <div className="bodyArea">
                   
                    <div className="mainBody">
                        <div className="childrenRoutes">
                            {this.props.children}
                        </div>
                       
                    </div>
                </div>
            </div>
   }
} 

const mapStateToProps = (state) =>{
    return {
        route_title:state.admin.route_title
    }
}

const mapDispatchToProps = (dispatch) =>{
    return bindActionCreators({
        setRoutingName
    },dispatch)
}

export default connect(mapStateToProps,mapDispatchToProps)(LoginLayout);