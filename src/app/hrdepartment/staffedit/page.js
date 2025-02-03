"use client"

import React, { useState, useEffect } from "react"
import axios from "axios"
import { FaEdit, FaEye } from "react-icons/fa"
import Layout from "../components/layout/Layout"
import BasicDetailsEdit from "./staffeditComp/BasicDetailsEdit"
import PersonalComp from "./staffeditComp/PersonalComp" // Import other components as needed
import EmploymentComp from "./staffeditComp/EmploymentComp" // Example for Employment
import SalaryDetailsComp from "./staffeditComp/SalaryDetailsComp" // Example for Salary Details
import LoginDetailsComp from "./staffeditComp/LoginDetailsComp" // Example for Login Details


const EmployeeTable = () => {
  const [employees, setEmployees] = useState([])
  const [currentPage, setCurrentPage] = useState(1)
  const [searchQuery, setSearchQuery] = useState("")
  const [modalData, setModalData] = useState(null)
  const itemsPerPage = 10

  useEffect(() => {
    const fetchEmployees = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/hrms/basicemployees`)
        setEmployees(response.data)
      } catch (error) {
      }
    }

    fetchEmployees()
  }, [])

  const handleEdit = (loginId, section) => {
    setModalData({ action: "Edit", id: loginId, section })
  }

  const handleView = (loginId, section) => {
    setModalData({ action: "View", id: loginId, section })
  }

  const handleSearch = (event) => {
    setSearchQuery(event.target.value)
  }

  const closeModal = () => {
    setModalData(null)
  }

  const paginate = (array, pageNumber, itemsPerPage) => {
    return array.slice((pageNumber - 1) * itemsPerPage, pageNumber * itemsPerPage)
  }

  const filteredEmployees = employees.filter((employee) => {
    const codeMatch = employee.nextEmployeeCode?.toLowerCase().includes(searchQuery.toLowerCase()) || false
    const nameMatch = `${employee.firstName ?? ""} ${employee.lastName ?? ""}`
      .toLowerCase()
      .includes(searchQuery.toLowerCase())
    return codeMatch || nameMatch
  })

  const paginatedEmployees = paginate(filteredEmployees, currentPage, itemsPerPage)
  const totalPages = Math.ceil(filteredEmployees.length / itemsPerPage)

  // Function to render the appropriate component based on section and action
  const renderModalContent = () => {
    const { action, section, id } = modalData

    switch (section) {
      case "Basic Details":
        return action === "Edit" ? (
          <BasicDetailsEdit setModalData={setModalData} id={id} />
        ) : (""
          // <BasicDetailsEdit setModalData={setModalData}  />
        )
      case "Personal":
        return action === "Edit" ? (
          <PersonalComp setModalData={setModalData} id={id} />
        ) : ( ""
          // <PersonalView setModalData={setModalData} id={id} />
        )
      case "Employment":
        return action === "Edit" ? (
          <EmploymentComp setModalData={setModalData} id={id} />
        ) : (""
          // <EmploymentView setModalData={setModalData} id={id} />
        )
      case "Salary Details":
        return action === "Edit" ? (
          <SalaryDetailsComp setModalData={setModalData} id={id} />
        ) : (""
          // <SalaryDetailsView setModalData={setModalData} id={id} />
        )
      case "Login Details":
        return action === "Edit" ? (
          <LoginDetailsComp setModalData={setModalData} id={id} />
        ) : (""
          // <LoginDetailsView setModalData={setModalData} id={id} />
        )
      case "User Documents":
        return action === "Edit" ? (
          <UserDocumentsComp setModalData={setModalData} id={id} />
        ) : (""
          // <UserDocumentsView setModalData={setModalData} id={id} />
        )
      default:
        return null
    }


  }

  return (
    <Layout>
      <div className="container mx-auto px-2 py-3">
        {/* Search Bar */}
        <div className="mb-2">
          <input
            type="text"
            placeholder="Search by Employee Code or Name"
            value={searchQuery}
            onChange={handleSearch}
            className="w-full p-1.5 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-transparent text-sm"
          />
        </div>

        {/* Table */}
        <div className="overflow-x-auto bg-white rounded-md shadow-sm">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                {[
                  "Emp.Code(Name)",
                  "Basic Details",
                  "Employment",
                  "Personal",
                  "Salary Details"
                ].map((header) => (
                  <th
                    key={header}
                    className="px-2 py-1.5 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    {header}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {paginatedEmployees.map((employee) => (
                <tr key={employee.loginId || employee.login_id} className="hover:bg-gray-50">
                  <td className="px-2 py-1.5 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900">{employee.employeeCode}</div>
                    <div className="text-xs text-gray-500">{employee.firstName}</div>
                  </td>
                  {["Basic Details", "Employment", "Personal", "Salary Details"].map(
                    (section) => (
                      <td key={section} className="px-2 py-1.5 whitespace-nowrap">
                        <div className="flex space-x-1">
                          <button
                            className="inline-flex items-center px-1.5 py-0.5 border border-transparent rounded-md text-xs font-medium text-white bg-orange-500 hover:bg-orange-600 focus:outline-none focus:ring-1 focus:ring-offset-1 focus:ring-orange-500"
                            onClick={() => handleEdit(employee.login_id, section)}
                          >
                            <FaEdit className="mr-1" size={12} />
                            Edit
                          </button>
                          {/* <button
                            className="inline-flex items-center px-1.5 py-0.5 border border-transparent rounded-md text-xs font-medium text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-1 focus:ring-offset-1 focus:ring-green-500"
                            onClick={() => handleView(employee.login_id, section)}
                          >
                            <FaEye className="mr-1" size={12} />
                            View
                          </button> */}
                        </div>
                      </td>
                    )
                  )}
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="mt-2 flex justify-center items-center space-x-2">
          <button
            className="px-2 py-1 border border-gray-300 rounded-md text-xs font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-1 focus:ring-offset-1 focus:ring-blue-500"
            disabled={currentPage === 1}
            onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
          >
            Previous
          </button>
          <span className="text-xs text-gray-700">
            Page {currentPage} of {totalPages}
          </span>
          <button
            className="px-2 py-1 border border-gray-300 rounded-md text-xs font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-1 focus:ring-offset-1 focus:ring-blue-500"
            disabled={currentPage === totalPages}
            onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
          >
            Next
          </button>
        </div>

        {/* Modal */}
        {modalData && (
          <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
            {renderModalContent()}
          </div>
        )}
      </div>
    </Layout>
  )
}

export default EmployeeTable