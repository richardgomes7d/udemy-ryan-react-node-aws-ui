import Link from 'next/link'

const NavTab = (props) => (
    <li className="nav-item">
        <Link href={props.href || ''}>
            <a className="nav-link">
                {props.content}
            </a>
        </Link>
    </li>
)

export default NavTab