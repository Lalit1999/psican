import { useState, useEffect } from 'react' ;
import { useSearchParams } from 'react-router-dom';
import Image from 'react-bootstrap/Image' ;

import { decrypt } from './crypt.js' ;
import { addNotif } from '../notif.js';
import Heading from '../Heading/Heading.js' ;
// import Ustop from './Ustop.js' ;

import test from '../../images/mainImage.png' ;

// const fetchUrl = 'http://localhost:8000/' ;
const fetchUrl = 'https://api2.psyment.com/' ;

const encodeQueryData = data => {
    const keyValuePairs = [];
    for (const key in data) {
        if (Object.prototype.hasOwnProperty.call(data, key)) 
            keyValuePairs.push(`${encodeURIComponent(key)}=${encodeURIComponent(data[key])}`);
    }
    return keyValuePairs.join('&');
}

const get = async (endpoint, token, queryObj={}) => {

    let url = `${fetchUrl}${endpoint}`;

    const query = encodeQueryData(queryObj);
    if (query) 
        url += `?${query}`;

    try {
        const response = await fetch(url, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': token?`Bearer ${token}`:'',
            },
        });

        // Check if the request was successful
        const resp = await response.json() ;
        if(resp.data)
            return JSON.parse(decrypt(resp.data)) ;

        return resp ;

    } catch (error) {
        if (error.name === 'AbortError') {
            // Request was aborted
            console.error('Request aborted:', error.message);
        } else {
            console.error(error, 'error') ; 
            addNotif(error, 'error') ;
        }
    }
}

const isSameDay = (date1, date2) => {
    return (
      date1.getDate() === date2.getDate() &&
      date1.getMonth() === date2.getMonth() &&
      date1.getFullYear() === date2.getFullYear()
    );
}

const formatDate = (str) => {
    const date = new Date(str);
    const today = new Date();
    const yesterday = new Date();
    yesterday.setDate(today.getDate() - 1);
    const tomorrow = new Date();
    tomorrow.setDate(today.getDate() + 1);
  
    const options = {
      year: "numeric",
      month: "short",
      day: "numeric",
    };
  
    if (isSameDay(date, today))
      return 'Today';
    else if (isSameDay(date, yesterday))
      return 'Yesterday';
    else if (isSameDay(date, tomorrow))
      return 'Tomorrow';
    else {
      const formattedDate = date.toLocaleDateString("en-IN", options);
      return `${formattedDate}`;
    }
};

const PaymentPage = () => {
	const [data, setData] = useState({}) ;
    const [searchParams] = useSearchParams();
    
    useEffect(() => {
        const fn = async() => {
            const resp = await get(`booking/details?code=${searchParams.get('code')}`) ;
            
            if(resp?.error) {
                console.error(resp.error, 'error') ; 
                addNotif(resp.error, 'error') ;
            }
            else {
                if(resp?.code) {
                    console.log(resp) ;
                    setData(resp) ;  
                }
                else {
                    console.error(resp, 'Error In fetching Upcoming Sessions') ;
                    addNotif('Unexpected Error', 'error') ;
                }
            }
        }

        fn() ;
        //eslint-disable-next-line
    }, []) ;

    if(data && data.title) {
        return(
            <div className="test-inner-page"> 
                <div className="image-title">
                    <div className="it-image">
                        <div className="it-img-con" children={<Image src={test} />} />
                    </div>
                    <div className="it-left-top">
                        <h4>{data.title}</h4>
                    </div>
                </div>
                <div className="leta-text">
                    <div className="leta-left">
                        <Heading text={`${data.title.split(' ').reverse()[0]} Details`} />
                        <div className="intro-pay">
                            <p className="ip-left">No. of Sessions :</p> 
                            <p className="ip-right">{data.sessions}</p> 
                        </div>
                        <div className="intro-pay">
                            <p className="ip-left">Session Frequency :</p> 
                            <p className="ip-right">{data.session>1?data.frequency:'--'}</p> 
                        </div>
                        <div className="intro-pay">
                            <p className="ip-left">Session Duration :</p> 
                            <p className="ip-right">{data.duration}</p> 
                        </div>
                        <div className="intro-pay">
                            <p className="ip-left">Session Mode :</p> 
                            <p className="ip-right">{data.mode}</p> 
                        </div>
                    </div>
                    <div className="leta-left">
                        <Heading text="First Session Details" />
                        <div className="intro-pay">
                            <p className="ip-left">Session Date :</p> 
                            <p className="ip-right">{formatDate(data.sessionDate)}</p> 
                        </div>
                        <div className="intro-pay">
                            <p className="ip-left">Session Time :</p> 
                            <p className="ip-right">{data.slot}</p> 
                        </div>
                    </div>
                    <div className="leta-left">
                        <Heading text="Complete Payment" />
                        {
                            data.payMethod==='Offline'?(
                                <div className="intro-pay">
                                    <p className="ip-right gray">Payment Method is Offline for this booking</p> 
                                </div>
                            ):(
                                data.paymentComplete?(
                                    <div className="intro-pay">
                                        <p className="ip-right green">Payment Completed</p> 
                                    </div>
                                ):(
                                    <div className="intro-pay">
                                        <p className="ip-left">Amount Payable :</p> 
                                        <p className="ip-right">₹ {data.price}</p> 
                                    </div> 
                                )
                            )
                        }
                        {/* <Ustop /> */}
                    </div>
                </div>
            </div>
        ) ;
    }
    else 
        <p>Loading Payment Details...</p>
}

export default PaymentPage ;