import {Link } from 'react-router-dom';
const Nav = ()=>{
    const navel = [{name : 'Hoem', path:'home'},{name : 'Favorites',path : "/avorites"},{name : "stars"}];
    return(
        <>
         <Nav>
            {navel.map((item, index) => (
                <li key={index}>
                    <Link to={item.path}>{item.name}</Link>
                </li>
            ))}
            </Nav>   
        </>
    )
}
export default Nav;