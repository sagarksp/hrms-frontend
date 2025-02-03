import React from "react";
import { Modal, Form, Row, Col, Input, Checkbox } from "antd";
// import AntButton from "@/app/hrdepartment/common/Button";
import AntButton from "../../../app/hrdepartment/common/Button";

const ResourcesModal = ({
  visible,
  onCancel,
  onSubmit,
  form,
  employeeName,
  resources,
}) => {
  return (
    <Modal
      title="Resources"
      open={visible} // Updated to use `open` instead of `visible`
      onCancel={onCancel}
      footer={null}
    >
      <Form
        form={form}
        layout="vertical"
        onFinish={onSubmit}
        initialValues={{
          employeeName: `${employeeName?.firstName || ""} ${employeeName?.lastName || ""}`,
          department: employeeName?.department || "",
        }}
      >
        <Row gutter={[16, 16]}>
          <Col span={12}>
            <Form.Item
              label="Employee Name"
              name="employeeName"
              rules={[{ required: true, message: "Employee Name is required" }]}
            >
              <Input disabled aria-label="Employee Name" />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              label="Department"
              name="department"
              rules={[{ required: true, message: "Department is required" }]}
            >
              <Input disabled aria-label="Department" />
            </Form.Item>
          </Col>
          <Col span={24}>
            <Form.Item
              label="Select Resources"
              name="resources"
              rules={[
                { required: true, message: "At least one resource is required" },
              ]}
            >
              <Checkbox.Group style={{ width: "100%" }}>
                <Row gutter={[8, 8]}>
                  {resources.map((resource) => (
                    <Col span={12} key={resource._id}>
                      <Checkbox value={resource.name}>{resource.name}</Checkbox>
                    </Col>
                  ))}
                </Row>
              </Checkbox.Group>
            </Form.Item>
          </Col>
        </Row>
        <Row justify="end">
          <Col>
            <AntButton type="default" onClick={onCancel}>
              Cancel
            </AntButton>
            <AntButton type="primary" htmlType="submit" style={{ marginLeft: 10 }}>
              Submit
            </AntButton>
          </Col>
        </Row>
      </Form>
    </Modal>
  );
};

export default ResourcesModal;








// import React from "react";
// import { Modal, Form, Row, Col, Input, Checkbox } from "antd";
// import AntButton from "@/app/hrdepartment/common/Button";

// const ResourcesModal = ({
//   visible,
//   onCancel,
//   onSubmit,
//   form,
//   employeeName,
//   resources,
// }) => {
//   return (
//     <Modal
//       title="Resources"
//       visible={visible}
//       onCancel={onCancel}
//       footer={null}
//     >
//       <Form form={form} layout="vertical" onFinish={onSubmit}>
//         <Row gutter={16}>
//           <Col span={12}>
//             <Form.Item
//               label="Employee Name"
//               name="employeeName"
//               initialValue={employeeName?.firstName + " " + employeeName?.lastName}
//               rules={[{ required: true, message: "Employee Name is required" }]}
//             >
//               <Input disabled />
//             </Form.Item>
//           </Col>
//           <Col span={12}>
//             <Form.Item
//               label="Department"
//               name="department"
//               initialValue={employeeName?.department}
//               rules={[{ required: true, message: "Department is required" }]}
//             >
//               <Input disabled />
//             </Form.Item>
//           </Col>
//           <Col span={24}>
//             <Form.Item
//               label="Select Resources"
//               name="resources"
//               rules={[
//                 { required: true, message: "At least one resource is required" },
//               ]}
//             >
//               <Checkbox.Group style={{ width: "100%" }}>
//                 {resources.map((resource) => (
//                   <Checkbox key={resource._id} value={resource.name}>
//                     {resource.name}
//                   </Checkbox>
//                 ))}
//               </Checkbox.Group>
//             </Form.Item>
//           </Col>
//         </Row>
//         <Row>
//           <Col span={24} style={{ textAlign: "right" }}>
//             <AntButton type="default" onClick={onCancel}>
//               Cancel
//             </AntButton>
//             <AntButton type="primary" htmlType="submit" style={{ marginLeft: 10 }}>
//               Submit
//             </AntButton>
//           </Col>
//         </Row>
//       </Form>
//     </Modal>
//   );
// };

// export default ResourcesModal;
