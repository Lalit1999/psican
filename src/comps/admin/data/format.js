const formatSize = (size) => {
	if(size < 1000)
		return size + ' Bytes' ;
	else if (size >= 1000 && size < 1000000 )
		return (size/1000).toFixed(3) + ' KB' ;
	else if (size >= 1000000 && size < 1000000000 )
		return (size/1000000).toFixed(3) + ' MB' ;
	else if (size >= 1000000000 && size < 10000000000 )
		return (size/1000000000).toFixed(3) + ' GB' ;
	else 
		throw new Error('Value too big') ; 
}

const formatDate = (value) => new Date(value).toLocaleString("en-GB", {timeZone: "Asia/Kolkata"})

const formatLink = (value) => <a href={value} target="_blank" rel="noreferrer">[Click]</a>

const formatLinks = (value) => {
	return (
		<p className="admin-panel-links">
			{value.map( (link, i) => <a key={i} href={link} target="_blank" rel="noreferrer">[{i+1}]</a>)}
		</p>
	) ;
}

const formatAddress = (value) => value.replaceAll(' && ', ', ') ;

export {formatSize, formatDate, formatLink, formatLinks, formatAddress} ;