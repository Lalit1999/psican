import Title from '../../title/Title.js' ;
import DisplayDetailed from '../../display/DisplayDetailed.js' ;

const data_collect = [
'We ask for the Name, Email ID and Contact Number of person during registration.',
'After registration, user may also submit their city, state, age & gender.',
'All the responses including preferences with respect to frequency, duration and period of counseling while booking any appointment through psyment app are collected.',
'htmlPsyment : Psychology & Mentoring App doesn&apos;t collect any data that is not entered by the user themselves',
'General downloading & browsing of Psyment : Psychology & Mentoring App is anonymous and it does not collect the user personal information.'
] ;

const data_usage = [
'By signing up for services offered by Psyment : Psychology & Mentoring App, the user explicitly authorizes us to collect the information, which they have entered themselves. This information is used to enhance the user experience.',
'Psyment : Psychology & Mentoring App keeps the user information strictly confidential and this information is stored on a secure web server based in India.',
'htmlUser can see their stored information on their profile page, if they wish to delete their information, they can write to us at <a href="mailto:info.psyment@gmail.com"><strong>info.psyment@gmail.com</strong></a>. On Clicking the button, all stored data for the particular user will be removed from our server forever.',
'If the request sent by user for data deletion is approved, all stored data for the particular user will be removed from our server forever.',
'All information collected through Psyment : Psychology & Mentoring App is handled and used only by internal officials and technical support team. It is never shared with any third-party individuals or organisations.',
'html<b>DISCLOSURE:</b>We may disclose your personal information if we are required by law to do so or if you violate our Terms & Conditions',
] ;

const changes = [
'As and when the need arises, Psyment : Psychology & Mentoring App may alter its privacy policy in accordance with the latest technology and trends. It will provide you with timely notice of these changes. The users may reach out to us if they have any queries about any changes made to its practices',
'htmlIf you have any questions at all about Psyment : Psychology & Mentoring App&apos;s privacy policy, please write to us at: <a href="mailto:info.psyment@gmail.com"><strong>info.psyment@gmail.com</strong></a>'
] ;

const PrivacyPolicy = () => {
	return (
		<div className="policy-page">
			<Title name = 'Privacy Policy for Psyment App' items={["Home","App Privacy Policy"]}/>
			<DisplayDetailed title="What Data we collect" lidata={data_collect} />
			<DisplayDetailed title="How we Use your Data" lidata={data_usage} />
			<DisplayDetailed title="Changes to Privacy Policy" lidata={changes} />
		</div>
	);
}

export default PrivacyPolicy ;