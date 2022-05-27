import {forwardRef} from 'react' ;
import './heading.css' ;

const Heading = ({text}, ref) => <div className="title-con" ref={ref}><h2 className="left-title" children={text}/></div>

export default forwardRef(Heading) ;