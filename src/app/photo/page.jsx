const EmployeeAvatar = ({ avatar }) => {
    // The avatar URL will be the path provided from the backend
    const imageUrl = 'http://localhost:5000/uploads/1725533862390-342053794.png';
  
    return (
      <div>
        <h3>Employee Avatar</h3>
        {/* Display the image using the URL */}
        <img src={imageUrl} alt="Employee Avatar" style={{ width: '150px', height: '150px' }} />
      </div>
    );
  };
  
  export default EmployeeAvatar;
  