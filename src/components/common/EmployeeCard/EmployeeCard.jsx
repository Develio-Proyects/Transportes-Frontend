import './employeeCard.scss'

const EmployeeCard = ({info}) => {
    const getInitials = () => {
        return info.name.charAt(0) + info.lastname.charAt(0)
    }

    return (
        <article className="employee-card">
            <span className="initials">{getInitials()}</span>
            <span className="name">{info.name}</span>
            <span className="lastname">{info.lastname}</span>
        </article>
    )
}

export default EmployeeCard