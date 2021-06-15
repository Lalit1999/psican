import React from 'react';

import Title from '../../title/Title.js' ;
import DisplayDetailed from '../../display/DisplayDetailed.js' ;

const data_collect = [
'We collect the Name, Age & Gender of any user who registers with us.',
'Email ID and Contact Number of person is also collected during registration.',
'All the answers/responses to any assessment tests on our website are collected.',
'htmlPSYMENT doesn&apos;t collect any data that is not entered by the user himself/herself',
'General browsing of PSYMENT website is anonymous and it does not collect the user personal information.'
] ;

const data_usage = [
'By signing up for various services offered by PSYMENT, the user explicitly authorizes us to collect the information, which he/she has entered. This information is used to enhance the user experience.',
'PSYMENT keeps the user information strictly confidential and this information is stored on a secure web server(based in India).',
'The responses which are given to assessment tests on PSYMENT website are stored in case of future counselling & consultation with Mr. Ashish Aggarwal',
'User can see his/her stored information on their profile page, if they wish to delete their information, it can be done by the using "Delete Profile" button. On Clicking the button, all stored data for the particular user will be removed from our server forever.',
'All information collected through Psyment website is handled and used only by internal officials and technical support team. It is never shared with any third-party individuals or organisations.',
'html<b>DISCLOSURE:</b>We may disclose your personal information if we are required by law to do so or if you violate our Terms & Conditions',
] ;

const cookies = [
'htmlCookies are pieces of electronic data which are sent by/to PSYMENT servers when a user registers on the website. These are placed in the hard disk of the user&apos;s computer and enables PSYMENT to recognise the user when he/she visits the website again.',
'User can configure his/her browser so that it responds to cookies the way he/she deems fit. For example, you may want to accept or reject all cookies. The users may check their browser settings to modify their individual cookie behaviour',
'If a user disables the use of cookies on the web browser, or removes/rejects specific cookies from PSYMENT website, then he/she may not be able to use the website as intended.'
] ;

const external_services = [
'PSYMENT uses a few external web services on its site to display content within its web pages. For example, to display video it uses YouTube, Google Map API for displaying maps.',
'These third-party providers used by us will only collect, use and disclose your information to the extent necessary to allow them to perform the services they provide to us.',
'However, certain third-party service providers, such as payment gateways have their own privacy policies in respect to the information we are required to provide them for your purchase-related transactions',
'For these providers, we recommend that you read their privacy policies so you can understand the manner in which your personal information will be handled by these providers.'
] ;

const changes = [
'As and when the need arises, PSYMENT may alter its privacy policy in accordance with the latest technology and trends. It will provide you with timely notice of these changes. The users may reach out to PSYMENT if they have any queries about any changes made to its practices',
'htmlIf you have any questions at all about PSYMENT&apos;s privacy policy, please write to us at: <b>info.psyment@gmail.com</b>'
] ;

const PrivacyPolicy = () => {
	return (
		<div>
			<Title name = 'Privacy Policy' items={["Home -","Privacy Policy"]}/>
			<DisplayDetailed title="What Data we collect" lidata={data_collect} />
			<DisplayDetailed title="How we Use your Data" lidata={data_usage} />
			<DisplayDetailed title="Cookies Policy" lidata={cookies} />
			<DisplayDetailed title="External Web Services" lidata={external_services} />
			<DisplayDetailed title="Changes to Privacy Policy" lidata={changes} />
		</div>
	);
}

export default PrivacyPolicy ;