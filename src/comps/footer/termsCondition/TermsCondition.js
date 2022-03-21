import Title from '../../title/Title.js' ;
import DisplayDetailed from '../../display/DisplayDetailed.js' ;

const tc = [
'htmlThis site and the information, names, images, pictures, logos regarding or relating to PSYMENT are provided &quot;as is&quot; without any representation or endorsement made and without warranty of any kind whether express or implied.',
'You agree to use this site only for lawful purposes, and in a manner which does not infringe the rights, or restrict, or inhibit the use and enjoyment of the site by any third party.',
'You agree not to reproduce, duplicate, copy, sell, resell or exploit any portion, service or access of the website through which these services are provided, without explicit written permission by us',
'You may not use our products for any illegal or unauthorized purpose nor may you, in the use of the Service, violate any laws in your jurisdiction (including but not limited to copyright laws).',
'A breach or violation of any of the Terms will may result in suitable legal action, in accordance with the violation.',
'PSYMENT reserves the rights to change these terms and conditions at any time by posting changes online. Your continued use of this site after changes are posted constitutes your acceptance of the modifications.',
] ;

const TermsCondition = () => {
	return (
		<div className="policy-page">
			<Title name = 'Terms and Conditions' items={["Home","Terms & Conditions"]}/>
			<DisplayDetailed title="PSYMENT Website Terms & Conditions" lidata={tc} />
		</div>
	);
}

export default TermsCondition ;